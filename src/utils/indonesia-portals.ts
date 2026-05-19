/**
 * Indonesian CKAN Portal Registry
 * 
 * Curated list of Indonesian CKAN open data portals
 * with status integration from suryast/indonesia-gov-apis
 * 
 * @module indonesia-portals
 */

import axios from "axios";

// ---- Portal definitions ----

export interface IndonesiaPortal {
  /** Unique key for this portal */
  key: string;
  /** Human-readable name */
  name: string;
  /** CKAN base URL */
  baseUrl: string;
  /** Region (province/city) */
  region: string;
  /** Type: national, province, city */
  level: "national" | "province" | "city";
  /** Whether DataStore extension is available */
  hasDatastore: boolean;
  /** Approximate dataset count (informational) */
  datasetCount?: number;
  /** Known quirks */
  notes?: string[];
}

export interface PortalStatus {
  key: string;
  status: "up" | "down" | "geo_blocked_intl" | "error" | "unknown";
  httpCode?: number;
  latencyMs?: number;
  lastChecked?: string;
}

// ---- The curated Indonesian portal registry ----

export const INDONESIA_PORTALS: IndonesiaPortal[] = [
  {
    key: "surabaya",
    name: "Satu Data Surabaya",
    baseUrl: "https://ckan.surabaya.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 1512,
    notes: ["Full CKAN API + DataStore", "Tidak geo-blocked"]
  },
  {
    key: "malang",
    name: "Satu Data Kota Malang",
    baseUrl: "https://data.malangkota.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 82005,
    notes: ["Dataset sangat besar (82rb+)", "DataStore TIDAK terpasang", "Response package_list terpotong Cloudflare di ~327KB"]
  },
  {
    key: "aceh",
    name: "Open Data Aceh",
    baseUrl: "https://data.acehprov.go.id",
    region: "Aceh",
    level: "province",
    hasDatastore: true,
    datasetCount: 4177,
    notes: ["Full CKAN API + DataStore"]
  },
  {
    key: "palembang",
    name: "Satu Data Palembang",
    baseUrl: "https://satudata.palembang.go.id",
    region: "Sumatera Selatan",
    level: "city",
    hasDatastore: true,
    datasetCount: 40,
    notes: ["Full CKAN API + DataStore"]
  },
  {
    key: "jakarta",
    name: "Satu Data Jakarta",
    baseUrl: "https://data.jakarta.go.id",
    region: "DKI Jakarta",
    level: "province",
    hasDatastore: false,
    notes: ["Belum diverifikasi API-nya"]
  },
  {
    key: "jabar",
    name: "Open Data Jabar",
    baseUrl: "https://opendata.jabarprov.go.id",
    region: "Jawa Barat",
    level: "province",
    hasDatastore: false,
    notes: ["Belum diverifikasi API-nya"]
  },
  {
    key: "bali",
    name: "Open Data Bali",
    baseUrl: "https://data.baliprov.go.id",
    region: "Bali",
    level: "province",
    hasDatastore: false,
    notes: ["Belum diverifikasi API-nya"]
  },
  {
    key: "bandung",
    name: "Open Data Bandung",
    baseUrl: "https://data.bandung.go.id",
    region: "Jawa Barat",
    level: "city",
    hasDatastore: false,
    notes: ["Belum diverifikasi API-nya"]
  }
];

// ---- Status checker integration ----

const STATUS_JSON_URL = 
  "https://api.github.com/repos/suryast/indonesia-gov-apis/contents/status/data/latest.json";

/** Map indonesia-gov-apis portal IDs to our keys */
const STATUS_KEY_MAP: Record<string, string> = {
  "jakarta": "jakarta",
  "jabar": "jabar",
  "jatim": "jatim",
  "surabaya": "surabaya",
  "bandung": "bandung",
  "bali": "bali",
  "malang": "malang"
};

interface StatusApiResponse {
  portals?: Record<string, {
    name?: string;
    status?: string;
    url?: string;
    au?: { http_code?: number; latency_ms?: number; status?: string };
    id?: { http_code?: number; latency_ms?: number; status?: string };
  }>;
}

let _cachedStatuses: PortalStatus[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

export async function fetchPortalStatuses(): Promise<PortalStatus[]> {
  const now = Date.now();
  if (_cachedStatuses && (now - _cacheTimestamp) < CACHE_TTL_MS) {
    return _cachedStatuses;
  }

  try {
    const resp = await axios.get<StatusApiResponse>(STATUS_JSON_URL, {
      timeout: 10000,
      headers: {
        "Accept": "application/vnd.github.v3.raw",
        "User-Agent": "CKAN-Indonesia-MCP/1.0"
      }
    });

    const portals = resp.data?.portals ?? {};
    const results: PortalStatus[] = [];

    for (const [statusKey, ourKey] of Object.entries(STATUS_KEY_MAP)) {
      const entry = portals[statusKey];
      if (!entry) {
        // Portal not in status tracker — try to find by match
        const matchedPortal = INDONESIA_PORTALS.find(p => p.key === ourKey);
        results.push({
          key: ourKey,
          status: "unknown",
          lastChecked: new Date().toISOString()
        });
        continue;
      }

      const idStatus = entry.id?.status; // from Indonesia check
      const auStatus = entry.au?.status; // from Australia check (intl)
      
      let status: PortalStatus["status"] = "unknown";
      if (entry.status === "geo_blocked_intl") {
        status = "geo_blocked_intl";
      } else if (idStatus === "up") {
        status = "up";
      } else if (idStatus === "blocked") {
        status = "error";
      } else {
        status = "down";
      }

      results.push({
        key: ourKey,
        status,
        httpCode: entry.id?.http_code,
        latencyMs: entry.id?.latency_ms,
        lastChecked: new Date().toISOString()
      });
    }

    _cachedStatuses = results;
    _cacheTimestamp = now;
    return results;
  } catch {
    // Fallback: return all portals with unknown status
    return INDONESIA_PORTALS.map(p => ({
      key: p.key,
      status: "unknown" as const,
      lastChecked: new Date().toISOString()
    }));
  }
}

/**
 * Quick health check for a single portal URL.
 * Returns HTTP code. Used when detailed status not in tracker.
 */
export async function quickHealthCheck(baseUrl: string): Promise<number | null> {
  try {
    const resp = await axios.get(`${baseUrl}/api/3/action/status_show`, {
      timeout: 8000,
      validateStatus: () => true
    });
    return resp.status;
  } catch {
    return null;
  }
}

/** Format portal info as markdown table row */
export function formatPortalTable(
  portal: IndonesiaPortal,
  status?: PortalStatus
): string {
  const statusEmoji: Record<string, string> = {
    up: "🟢",
    down: "🔴",
    geo_blocked_intl: "🟡",
    error: "🟠",
    unknown: "⚪"
  };
  const emoji = statusEmoji[status?.status ?? "unknown"];
  const dsEmoji = portal.hasDatastore ? "✅" : "❌";
  const count = portal.datasetCount ? portal.datasetCount.toLocaleString("id-ID") : "?";
  
  return `| ${emoji} **${portal.name}** | \`${portal.key}\` | ${portal.region} | ${portal.level} | ${count} | ${dsEmoji} | ${portal.baseUrl} |`;
}
