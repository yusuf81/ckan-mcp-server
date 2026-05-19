/**
 * Indonesia-specific CKAN Tools
 * 
 * Provides:
 * 1. ckan_indo_portals — List Indonesian CKAN portals with live status
 * 2. ckan_indo_cari — Composite search: query across portal, return datasets + sample data
 * 
 * Design follows MCP best practices:
 * - Outcome-based (not 1:1 API mapping)
 * - Actionable error messages
 * - Token budget aware (pagination enforced)
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import axios from "axios";
import {
  INDONESIA_PORTALS,
  fetchPortalStatuses,
  formatPortalTable,
  quickHealthCheck,
  type IndonesiaPortal,
  type PortalStatus
} from "../utils/indonesia-portals.js";

// ---- Helper: get portal by key or URL ----

function findPortal(identifier: string): IndonesiaPortal | undefined {
  // Try by key first
  const byKey = INDONESIA_PORTALS.find(
    p => p.key === identifier.toLowerCase()
  );
  if (byKey) return byKey;
  
  // Try by URL match
  const byUrl = INDONESIA_PORTALS.find(
    p => p.baseUrl.includes(identifier) || identifier.includes(
      new URL(p.baseUrl).hostname
    )
  );
  return byUrl;
}

// ---- Helper: CKAN request wrapper with geo-blocking detection ----

async function ckanGet(baseUrl: string, action: string, params: Record<string, any> = {}) {
  const url = `${baseUrl.replace(/\/$/, "")}/api/3/action/${action}`;
  try {
    const resp = await axios.get(url, {
      params,
      timeout: 15000,
      headers: { "User-Agent": "CKAN-Indonesia-MCP/1.0" },
      validateStatus: () => true
    });
    
    // Geo-blocking detection
    if (resp.status === 403) {
      const body = typeof resp.data === "string" ? resp.data.toLowerCase() : "";
      if (body.includes("cloudflare") || body.includes("captcha") || body.includes("attention required")) {
        throw new Error(
          `GEO_BLOCKED: Portal ini menggunakan Cloudflare geo-blocking. ` +
          `Hanya bisa diakses dari IP Indonesia. Gunakan VPN/proxy Indonesia.\n` +
          `URL: ${baseUrl}`
        );
      }
      throw new Error(`HTTP 403 Forbidden: ${baseUrl}`);
    }
    
    if (resp.status === 404) {
      throw new Error(
        `API_NOT_FOUND: Endpoint CKAN tidak ditemukan di ${baseUrl}. ` +
        `Portal ini mungkin bukan CKAN atau API-nya sudah dinonaktifkan. ` +
        `Coba portal lain — gunakan ckan_indo_portals untuk lihat daftar portal yang tersedia.`
      );
    }
    
    if (resp.status >= 500) {
      throw new Error(`Server error (${resp.status}) dari ${baseUrl}. Portal sedang bermasalah.`);
    }
    
    return resp.data;
  } catch (err: any) {
    if (err.message?.startsWith("GEO_BLOCKED") || err.message?.startsWith("API_NOT_FOUND")) {
      throw err; // Re-throw our actionable errors
    }
    if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
      throw new Error(
        `KONEKSI_GAGAL: Tidak bisa terhubung ke ${baseUrl}. ` +
        `Portal mungkin sedang down. Coba lagi nanti atau gunakan portal lain.`
      );
    }
    throw err;
  }
}

// ---- Tool registration ----

export function registerIndonesiaTools(server: McpServer) {
  
  /**
   * ckan_indo_portals — List Indonesian CKAN portals with live status
   */
  server.registerTool(
    "ckan_indo_portals",
    {
      title: "Daftar Portal Open Data Indonesia",
      description: `Menampilkan daftar portal CKAN open data di Indonesia lengkap dengan status live.

Portal yang sudah terverifikasi dan di-test:
- Surabaya (1.512 dataset, full DataStore) ✅
- Malang (82.005 dataset, tanpa DataStore) ✅
- Aceh (4.177 dataset, full DataStore) ✅
- Palembang (40 dataset, full DataStore) ✅

Portal lain dalam daftar masih perlu verifikasi API.

Status diambil dari pemantauan harian repositori suryast/indonesia-gov-apis.
🟢 = UP | 🟡 = Geo-blocked (perlu IP Indonesia) | 🔴 = DOWN | ⚪ = Belum dicek

Gunakan tool ini SEBELUM mencari data — untuk memastikan portal yang dituju masih hidup.

Args:
  - region (string, optional): Filter berdasarkan provinsi. Contoh: "Jawa Timur"
  - level (string, optional): Filter "national", "province", atau "city"
  - has_datastore (boolean, optional): Hanya tampilkan yang punya DataStore
  - refresh (boolean): Paksa refresh status (default: false, pakai cache 5 menit)
  - response_format ("markdown" | "json"): Format output

Returns:
  Tabel portal dengan: nama, region, jumlah dataset, DataStore, status, URL.`,
      inputSchema: z.object({
        region: z.string()
          .optional()
          .describe("Filter berdasarkan provinsi. Contoh: 'Jawa Timur'"),
        level: z.enum(["national", "province", "city"])
          .optional()
          .describe("Filter berdasarkan level"),
        has_datastore: z.boolean()
          .optional()
          .describe("Hanya tampilkan portal dengan DataStore"),
        refresh: z.boolean()
          .optional()
          .default(false)
          .describe("Paksa refresh status (lewati cache)"),
        response_format: z.enum(["markdown", "json"])
          .optional()
          .default("markdown")
          .describe("Format output")
      }),
    },
    async (params) => {
      try {
        // Get statuses
        const statuses = params.refresh 
          ? []  // Force re-fetch below
          : await fetchPortalStatuses();
        
        if (params.refresh || statuses.length === 0) {
          const fresh = await fetchPortalStatuses();
          statuses.length = 0;
          statuses.push(...fresh);
        }

        // Filter portals
        let portals = INDONESIA_PORTALS.filter(p => {
          if (params.region && !p.region.toLowerCase().includes(params.region.toLowerCase())) 
            return false;
          if (params.level && p.level !== params.level) 
            return false;
          if (params.has_datastore && !p.hasDatastore) 
            return false;
          return true;
        });

        if (params.response_format === "json") {
          const result = portals.map(p => {
            const st = statuses.find(s => s.key === p.key);
            return {
              key: p.key,
              name: p.name,
              base_url: p.baseUrl,
              region: p.region,
              level: p.level,
              dataset_count: p.datasetCount,
              has_datastore: p.hasDatastore,
              status: st?.status ?? "unknown",
              http_code: st?.httpCode,
              latency_ms: st?.latencyMs,
              notes: p.notes
            };
          });
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ total: result.length, portals: result }, null, 2) 
            }]
          };
        }

        // Markdown format
        let md = `# Portal Open Data Indonesia\n\n`;
        md += `**Total**: ${portals.length} portal CKAN di Indonesia\n`;
        md += `**Status source**: [suryast/indonesia-gov-apis](https://github.com/suryast/indonesia-gov-apis) (daily check)\n\n`;
        md += `| Status | Portal | Key | Region | Level | Dataset | DataStore | URL |\n`;
        md += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;

        for (const p of portals) {
          const st = statuses.find(s => s.key === p.key);
          md += formatPortalTable(p, st) + "\n";
        }

        md += `\n---\n`;
        md += `**Cara pakai**: Gunakan \`ckan_indo_cari\` untuk mencari data di portal tertentu.\n`;
        md += `Contoh: \`ckan_indo_cari(portal="surabaya", topik="penduduk")\`\n`;

        return { content: [{ type: "text", text: md }] };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Gagal mengambil status portal: ${err.message}` }]
        };
      }
    }
  );

  /**
   * ckan_indo_cari — Composite search: datasets + sample data in one call
   */
  server.registerTool(
    "ckan_indo_cari",
    {
      title: "Cari Data di Portal Open Data Indonesia",
      description: `Mencari dataset di portal CKAN Indonesia dan langsung mengembalikan hasil lengkap:
metadata dataset + daftar resource + sample data (jika DataStore tersedia).

Ini adalah composite tool — menggabungkan package_search + package_show + datastore_search
dalam satu panggilan. Tidak perlu chain 3-4 tool.

ALUR KERJA YANG DISARANKAN:
1. Gunakan ckan_indo_portals dulu — pastikan portal hidup
2. Gunakan ckan_indo_cari — cari data yang diinginkan
3. Jika perlu data lengkap, gunakan ckan_datastore_search dengan resource_id dari hasil

PORTAL YANG TERSEDIA (key):
- surabaya (1.512 dataset, DataStore ✅)
- malang (82.005 dataset, DataStore ❌ — data dalam file XLSX/CSV)
- aceh (4.177 dataset, DataStore ✅)
- palembang (40 dataset, DataStore ✅)

Args:
  - portal (string): Key portal (lihat daftar dari ckan_indo_portals). Contoh: "surabaya"
  - topik (string): Kata kunci pencarian. Contoh: "penduduk", "puskesmas", "kemiskinan"
  - jumlah (number): Jumlah hasil maksimal (default: 5, max: 20)
  - ambil_data (boolean): Ambil sample data dari DataStore? (default: true, abaikan jika tidak ada)
  - response_format ("markdown" | "json"): Format output

Returns:
  Hasil pencarian dengan: judul, organisasi, deskripsi, resource list, sample data (jika tersedia).`,
      inputSchema: z.object({
        portal: z.string()
          .describe("Key portal Indonesia. Gunakan ckan_indo_portals untuk lihat daftar. Contoh: 'surabaya', 'malang', 'aceh'"),
        topik: z.string()
          .min(1)
          .describe("Kata kunci pencarian. Contoh: 'penduduk', 'kemiskinan', 'puskesmas'"),
        jumlah: z.number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .default(5)
          .describe("Jumlah hasil maksimal (1-20, default 5)"),
        ambil_data: z.boolean()
          .optional()
          .default(true)
          .describe("Ambil sample data dari DataStore jika tersedia?"),
        response_format: z.enum(["markdown", "json"])
          .optional()
          .default("markdown")
          .describe("Format output")
      }),
    },
    async (params) => {
      try {
        const portal = findPortal(params.portal);
        if (!portal) {
          const availableKeys = INDONESIA_PORTALS.map(p => p.key).join(", ");
          throw new Error(
            `Portal "${params.portal}" tidak ditemukan di registry. ` +
            `Portal yang tersedia: ${availableKeys}. ` +
            `Gunakan ckan_indo_portals untuk lihat daftar lengkap.`
          );
        }

        const baseUrl = portal.baseUrl;

        // Step 1: Search datasets
        const searchResult = await ckanGet(baseUrl, "package_search", {
          q: params.topik,
          rows: params.jumlah,
          sort: "score desc"
        });

        const datasets = searchResult?.result?.results ?? [];
        const total = searchResult?.result?.count ?? 0;

        if (datasets.length === 0) {
          return {
            content: [{ 
              type: "text", 
              text: `Tidak ada dataset ditemukan untuk "${params.topik}" di portal ${portal.name}.\n\n` +
                    `💡 **Tips**: Coba gunakan kata kunci yang lebih umum, atau cari di portal lain dengan ckan_indo_portals.` 
            }]
          };
        }

        // Step 2+3: For each dataset, get details + sample data
        const enriched: any[] = [];
        for (const ds of datasets) {
          try {
            const detail = await ckanGet(baseUrl, "package_show", { id: ds.id || ds.name });
            const pkg = detail?.result ?? {};

            const resources = (pkg.resources ?? []).map((r: any) => ({
              name: r.name,
              id: r.id,
              format: r.format,
              datastore_active: r.datastore_active === true
            }));

            let sampleData: any = null;
            if (params.ambil_data && portal.hasDatastore) {
              const dsResources = resources.filter((r: any) => r.datastore_active);
              if (dsResources.length > 0) {
                try {
                  const dataResult = await ckanGet(baseUrl, "datastore_search", {
                    resource_id: dsResources[0].id,
                    limit: 3
                  });
                  sampleData = {
                    resource_name: dsResources[0].name,
                    fields: dataResult?.result?.fields?.map((f: any) => f.id) ?? [],
                    total_records: dataResult?.result?.total ?? 0,
                    records: dataResult?.result?.records ?? []
                  };
                } catch {
                  // DataStore call failed — skip silently
                }
              }
            }

            enriched.push({
              title: pkg.title || ds.name,
              name: pkg.name || ds.name,
              organization: pkg.organization?.title ?? pkg.organization?.name ?? "-",
              description: (pkg.notes || "").substring(0, 300),
              metadata_modified: pkg.metadata_modified,
              resources,
              sample_data: sampleData
            });
          } catch {
            // Skip failed individual dataset fetches
            enriched.push({
              title: ds.title || ds.name,
              name: ds.name || ds.id,
              organization: ds.organization?.title ?? "-",
              description: (ds.notes || "").substring(0, 200),
              resources: [],
              sample_data: null
            });
          }
        }

        if (params.response_format === "json") {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({
                portal: portal.key,
                portal_name: portal.name,
                total_hasil: total,
                ditampilkan: enriched.length,
                hasil: enriched
              }, null, 2)
            }]
          };
        }

        // Markdown format
        let md = `# Hasil Pencarian: "${params.topik}"\n\n`;
        md += `**Portal**: ${portal.name} (\`${portal.key}\`)\n`;
        md += `**URL**: ${baseUrl}\n`;
        md += `**Total hasil**: ${total.toLocaleString("id-ID")} | **Ditampilkan**: ${enriched.length}\n`;
        if (!portal.hasDatastore) {
          md += `⚠️ **DataStore tidak tersedia** di portal ini. Data hanya bisa di-download sebagai file.\n`;
        }
        md += `\n---\n\n`;

        for (let i = 0; i < enriched.length; i++) {
          const item = enriched[i];
          md += `## ${i + 1}. ${item.title}\n\n`;
          md += `**Organisasi**: ${item.organization}\n`;
          if (item.metadata_modified) {
            md += `**Terakhir diupdate**: ${item.metadata_modified}\n`;
          }
          if (item.description) {
            md += `\n${item.description}\n`;
          }

          // Resources
          if (item.resources.length > 0) {
            md += `\n**Resources** (${item.resources.length}):\n`;
            for (const r of item.resources) {
              const dsLabel = r.datastore_active ? " 📊DataStore" : "";
              md += `- \`${r.name}\` [${r.format}] \`${r.id}\`${dsLabel}\n`;
            }
          }

          // Sample data
          if (item.sample_data) {
            md += `\n**Sample Data** (${item.sample_data.total_records.toLocaleString("id-ID")} total records):\n`;
            md += `Fields: ${item.sample_data.fields.join(", ")}\n\n`;
            
            // Table of records
            if (item.sample_data.records.length > 0) {
              const fields = Object.keys(item.sample_data.records[0]).slice(0, 8);
              md += `| ${fields.join(" | ")} |\n`;
              md += `| ${fields.map(() => "---").join(" | ")} |\n`;
              for (const rec of item.sample_data.records) {
                const vals = fields.map((f: string) => String(rec[f] ?? "").substring(0, 40));
                md += `| ${vals.join(" | ")} |\n`;
              }
            }
          }

          md += `\n---\n\n`;
        }

        // Footer with actionable next steps
        md += `💡 **Langkah selanjutnya**:\n`;
        if (portal.hasDatastore) {
          md += `- Gunakan \`ckan_datastore_search\` dengan \`server_url="${baseUrl}"\` dan \`resource_id\` dari atas untuk ambil data lengkap\n`;
        }
        md += `- Gunakan \`ckan_package_show\` dengan \`server_url="${baseUrl}"\` untuk metadata lengkap satu dataset\n`;
        md += `- Cari di portal lain dengan \`ckan_indo_portals\`\n`;

        return { content: [{ type: "text", text: md }] };
      } catch (err: any) {
        const msg = err.message || String(err);
        return {
          isError: true,
          content: [{ type: "text", text: `❌ Gagal mencari data: ${msg}` }]
        };
      }
    }
  );
}
