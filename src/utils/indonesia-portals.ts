/**
 * Indonesian CKAN Portal Registry
 * Auto-generated from datashades.info + health check (2026-05-19)
 * Total: 63 portals (39 verified UP, 42 with DataStore)
 */

import axios from "axios";

export interface IndonesiaPortal {
  key: string;
  name: string;
  baseUrl: string;
  region: string;
  level: "national" | "province" | "city";
  hasDatastore: boolean;
  datasetCount?: number;
  notes?: string[];
}

export interface PortalStatus {
  key: string;
  status: "up" | "down" | "geo_blocked_intl" | "error" | "unknown";
  httpCode?: number;
  latencyMs?: number;
  lastChecked?: string;
}

export const INDONESIA_PORTALS: IndonesiaPortal[] = [
  { // G
    key: "malang",
    name: "Satu Data Kota Malang",
    baseUrl: "https://data.malangkota.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 82005,
    notes: ["DataStore NO"]
  },
  { // G
    key: "demak",
    name: "Open Data Kabupaten Demak",
    baseUrl: "https://data.demakkab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 27199,
    notes: ["DataStore OK"]
  },
  { // G
    key: "bantul",
    name: "SATU DATA BANTUL",
    baseUrl: "https://dataset.bantulkab.go.id",
    region: "DI Yogyakarta",
    level: "city",
    hasDatastore: true,
    datasetCount: 12727,
    notes: ["DataStore OK"]
  },
  { // G
    key: "kaltim",
    name: "data.kaltimprov.go.id",
    baseUrl: "https://data.kaltimprov.go.id",
    region: "Kalimantan Timur",
    level: "province",
    hasDatastore: false,
    datasetCount: 12405,
    notes: ["DataStore NO"]
  },
  { // G
    key: "purbalingga",
    name: "SATU DATA PURBALINGGA",
    baseUrl: "https://data.purbalinggakab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 8371,
    notes: ["DataStore OK"]
  },
  { // G
    key: "sidoarjo",
    name: "Open Data Kabupaten Sidoarjo",
    baseUrl: "https://opendata.sidoarjokab.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 6639,
    notes: ["DataStore OK"]
  },
  { // G
    key: "lamongan",
    name: "Portal Data Lamongan",
    baseUrl: "https://data.lamongankab.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 4539,
    notes: ["DataStore NO"]
  },
  { // G
    key: "sukoharjo",
    name: "OPENDATA KABUPATEN SUKOHARJO",
    baseUrl: "https://data.sukoharjokab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: false,
    datasetCount: 3314,
    notes: ["DataStore NO"]
  },
  { // G
    key: "pekalongan",
    name: "Kota Pekalongan",
    baseUrl: "http://data.pekalongankota.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 2491,
    notes: ["DataStore OK"]
  },
  { // G
    key: "kuburaya",
    name: "Open Data Kubu Raya",
    baseUrl: "https://opendata.kuburayakab.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 2477,
    notes: ["DataStore OK"]
  },
  { // G
    key: "kuburaya",
    name: "satudata.kuburayakab.go.id",
    baseUrl: "https://satudata.kuburayakab.go.id",
    region: "Indonesia",
    level: "city",
    hasDatastore: false,
    datasetCount: 2315,
    notes: ["DataStore NO"]
  },
  { // G
    key: "brebes",
    name: "Open Data Kabupaten Brebes",
    baseUrl: "https://opendata.brebeskab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: false,
    datasetCount: 1653,
    notes: ["DataStore NO"]
  },
  { // G
    key: "magelang",
    name: "CKAN",
    baseUrl: "https://data.magelangkota.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 1642,
    notes: ["DataStore OK"]
  },
  { // G
    key: "mojokerto",
    name: "Satu Data Informasi Kota Mojokerto",
    baseUrl: "https://data.mojokertokota.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 1603,
    notes: ["DataStore NO"]
  },
  { // G
    key: "surabaya",
    name: "Satu Data Surabaya",
    baseUrl: "https://ckan.surabaya.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 1515,
    notes: ["DataStore OK"]
  },
  { // G
    key: "pandeglang",
    name: "PANDEGLANG OPEN DATA",
    baseUrl: "https://opendata.pandeglangkab.go.id",
    region: "Banten",
    level: "city",
    hasDatastore: false,
    datasetCount: 1464,
    notes: ["DataStore NO"]
  },
  { // G
    key: "bondowoso",
    name: "Satu Data Kabupaten Bondowoso",
    baseUrl: "https://sadab.bondowosokab.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 1391,
    notes: ["DataStore NO"]
  },
  { // G
    key: "salatiga",
    name: "OPEN DATA SALATIGA",
    baseUrl: "https://data.salatiga.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 1265,
    notes: ["DataStore OK"]
  },
  { // G
    key: "balikpapan",
    name: "Satu Data Balikpapan",
    baseUrl: "https://data.balikpapan.go.id",
    region: "Kalimantan Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 1130,
    notes: ["DataStore OK"]
  },
  { // G
    key: "denpasar",
    name: "Portal Satu Data Denpasar",
    baseUrl: "https://satudata.denpasarkota.go.id",
    region: "Bali",
    level: "city",
    hasDatastore: true,
    datasetCount: 1028,
    notes: ["DataStore OK"]
  },
  { // G
    key: "inhil",
    name: "ISTAKA - Inhil Satu Data Medeka",
    baseUrl: "https://data.inhilkab.go.id",
    region: "Riau",
    level: "city",
    hasDatastore: true,
    datasetCount: 831,
    notes: ["DataStore OK"]
  },
  { // G
    key: "jogja",
    name: "Open Data Kota Yogyakarta",
    baseUrl: "https://dataset.jogjakota.go.id",
    region: "DI Yogyakarta",
    level: "city",
    hasDatastore: true,
    datasetCount: 827,
    notes: ["DataStore OK"]
  },
  { // G
    key: "sampang",
    name: "Kabupaten Sampang",
    baseUrl: "https://ckan.sampangkab.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: false,
    datasetCount: 799,
    notes: ["DataStore NO"]
  },
  { // G
    key: "beltim",
    name: "Satu Data Indonesia Kabupaten Belitung Timur",
    baseUrl: "https://data.beltim.go.id",
    region: "Bangka Belitung",
    level: "city",
    hasDatastore: true,
    datasetCount: 760,
    notes: ["DataStore OK"]
  },
  { // G
    key: "cilegon",
    name: "Katalogdata Cilegon",
    baseUrl: "https://katalogdata.cilegon.go.id",
    region: "Banten",
    level: "city",
    hasDatastore: true,
    datasetCount: 655,
    notes: ["DataStore OK"]
  },
  { // G
    key: "tanjabbar",
    name: "Satu Data Kabupaten Tanjung Jabung Barat",
    baseUrl: "https://data.tanjabbarkab.go.id",
    region: "Jambi",
    level: "city",
    hasDatastore: false,
    datasetCount: 629,
    notes: ["DataStore NO"]
  },
  { // G
    key: "karo",
    name: "KataSada | Karo Tangguh Satu Data ",
    baseUrl: "http://opendata.karokab.go.id",
    region: "Sumatera Utara",
    level: "city",
    hasDatastore: true,
    datasetCount: 628,
    notes: ["DataStore OK"]
  },
  { // G
    key: "purworejo",
    name: "Opendata Purworejo",
    baseUrl: "https://data.purworejokab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 624,
    notes: ["DataStore OK"]
  },
  { // G
    key: "bima",
    name: "Satu Data Kota Bima",
    baseUrl: "https://1data.bimakota.go.id",
    region: "NTB",
    level: "city",
    hasDatastore: false,
    datasetCount: 558,
    notes: ["DataStore NO"]
  },
  { // G
    key: "asahan",
    name: "ASADA",
    baseUrl: "https://satudata.asahankab.go.id",
    region: "Sumatera Utara",
    level: "city",
    hasDatastore: true,
    datasetCount: 439,
    notes: ["DataStore OK"]
  },
  { // G
    key: "mempawah",
    name: "Satu Data Mempawah",
    baseUrl: "https://satudata.mempawahkab.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 410,
    notes: ["DataStore OK"]
  },
  { // G
    key: "bengkulu",
    name: "Bengkulu Portal Data",
    baseUrl: "https://data.bengkuluprov.go.id",
    region: "Bengkulu",
    level: "province",
    hasDatastore: true,
    datasetCount: 401,
    notes: ["DataStore OK"]
  },
  { // G
    key: "kayongutara",
    name: "Satu Data Kayong Utara",
    baseUrl: "https://satudata.kayongutarakab.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 376,
    notes: ["DataStore OK"]
  },
  { // G
    key: "agam",
    name: "Portal Satu Data Kabupaten Agam",
    baseUrl: "https://data.agamkab.go.id",
    region: "Sumatera Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 291,
    notes: ["DataStore OK"]
  },
  { // G
    key: "seluma",
    name: "Satu Data Kabupaten Seluma",
    baseUrl: "https://sdi.selumakab.go.id",
    region: "Bengkulu",
    level: "city",
    hasDatastore: true,
    datasetCount: 280,
    notes: ["DataStore OK"]
  },
  { // G
    key: "rsud",
    name: "RSUD dr. Iskak Tulungagung",
    baseUrl: "https://data.rsud.tulungagung.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 153,
    notes: ["DataStore OK"]
  },
  { // G
    key: "kemendesa",
    name: "Portal Satu Data",
    baseUrl: "https://satudata.kemendesa.go.id",
    region: "Nasional",
    level: "national",
    hasDatastore: true,
    datasetCount: 71,
    notes: ["DataStore OK"]
  },
  { // G
    key: "lkpp",
    name: "LKPP",
    baseUrl: "https://data.lkpp.go.id",
    region: "Nasional",
    level: "national",
    hasDatastore: true,
    datasetCount: 43,
    notes: ["DataStore OK"]
  },
  { // G
    key: "palembang",
    name: "Satu Data Palembang",
    baseUrl: "https://satudata.palembang.go.id",
    region: "Sumatera Selatan",
    level: "city",
    hasDatastore: true,
    datasetCount: 40,
    notes: ["DataStore OK"]
  },
  { // O
    key: "sanggau",
    name: "Satu Data Sanggau",
    baseUrl: "https://data.sanggau.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "magelang",
    name: "Portal Data Kabupaten Magelang",
    baseUrl: "https://opendata.magelangkab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "pontianak",
    name: "SATU DATA KOTA PONTIANAK",
    baseUrl: "https://ckan.pontianak.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: http_502"]
  },
  { // O
    key: "tegal",
    name: "Data Terbuka - Kabupaten Tegal",
    baseUrl: "https://data.tegalkab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: http_503"]
  },
  { // O
    key: "kuburaya",
    name: "Open Data Kubu Raya",
    baseUrl: "https://opendata.kuburaya.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "wonosobo",
    name: "Open Data Kabupaten Wonosobo",
    baseUrl: "https://opendata.wonosobokab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "kutaibarat",
    name: "Satu Data Kutai Barat",
    baseUrl: "https://data.kutaibaratkab.go.id",
    region: "Indonesia",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
  { // O
    key: "banyumas",
    name: "Banyumas Open Data",
    baseUrl: "https://data.banyumaskab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
  { // O
    key: "kendal",
    name: "Open Data Kabupaten Kendal",
    baseUrl: "https://data.kendalkab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "boyolali",
    name: "Portal Satu Data Kabupaten Boyolali",
    baseUrl: "https://data.boyolali.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
  { // O
    key: "belitung",
    name: "Portal Belitung Satu Data",
    baseUrl: "https://data.belitung.go.id",
    region: "Bangka Belitung",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "sumbawabarat",
    name: "Data Kabupaten Sumbawa Barat",
    baseUrl: "https://data.sumbawabaratkab.go.id",
    region: "NTB",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "padang",
    name: "Satu Data Pemko Padang",
    baseUrl: "https://satudata.padang.go.id",
    region: "Sumatera Barat",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: timeout"]
  },
  { // O
    key: "banjarnegara",
    name: "OpenData Banjarnegara",
    baseUrl: "https://opendata.banjarnegarakab.go.id",
    region: "Jawa Tengah",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "bangkalan",
    name: "Bangkalan Open Data",
    baseUrl: "https://data.bangkalankab.go.id",
    region: "Jawa Timur",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // R
    key: "batubara",
    name: "Satu Data Batubara",
    baseUrl: "https://data.batubarakab.go.id",
    region: "Sumatera Utara",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: no_ckan_api"]
  },
  { // R
    key: "tapteng",
    name: "Satudata Tapanuli Tengah",
    baseUrl: "https://satudata.tapteng.go.id",
    region: "Sumatera Utara",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: no_ckan_api"]
  },
  { // O
    key: "kampar",
    name: "Satu Data Kampar",
    baseUrl: "https://data.kamparkab.go.id",
    region: "Riau",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
  { // O
    key: "bengkuluselatan",
    name: "Satu Data Kabupaten Bengkulu Selatan",
    baseUrl: "https://data.bengkuluselatankab.go.id",
    region: "Bengkulu",
    level: "province",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "halmaherautara",
    name: "SATUDATA ",
    baseUrl: "https://data.halmaherautarakab.go.id",
    region: "Maluku Utara",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "simalungun",
    name: "Portal Data Simalungun",
    baseUrl: "https://portalsatudata.simalungunkab.go.id",
    region: "Sumatera Utara",
    level: "city",
    hasDatastore: true,
    datasetCount: 0,
    notes: ["DataStore OK", "Status: error"]
  },
  { // O
    key: "singkawang",
    name: "satudata.singkawangkota.go.id",
    baseUrl: "https://satudata.singkawangkota.go.id",
    region: "Kalimantan Barat",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: http_502"]
  },
  { // O
    key: "sumbar",
    name: "data.sumbarprov.go.id",
    baseUrl: "https://data.sumbarprov.go.id",
    region: "Sumatera Barat",
    level: "province",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
  { // O
    key: "manokwari",
    name: "satudata.manokwarikab.go.id",
    baseUrl: "https://satudata.manokwarikab.go.id",
    region: "Papua Barat",
    level: "city",
    hasDatastore: false,
    datasetCount: 0,
    notes: ["DataStore NO", "Status: error"]
  },
// ---- Status checker integration ----

];
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

