#!/usr/bin/env node
/**
 * extract-types.js
 *
 * Meng-generate TypeScript response/request types langsung dari 1 sumber:
 * master.json (OpenAPI 3.1). Output dikelompokkan per module/domain — bukan
 * per-endpoint — supaya DRY & KISS:
 *
 *   - Domain = segmen pertama path setelah "/master/"
 *       (mis. /master/organisasi/{id} → domain "organisasi").
 *   - Semua schema yang HANYA dipakai 1 domain → ditulis di file domain itu.
 *   - Schema yang dipakai >= 2 domain → di-hoist ke ./types/_shared.ts,
 *       lalu di-`import` oleh tiap domain (single source of truth).
 *   - Enum HTTP status (statusText) yang berulang di puluhan wrapper
 *       → dijadikan satu tipe `HttpStatusText` di _shared.ts.
 *
 * Arsitektur (seam yang bisa diuji):
 *   plan(spec)   → Plan   : SEMUA keputusan murni (shared vs lokal, alias enum,
 *                            import/re-export per domain, urutan topologis) sebagai
 *                            data — tanpa menyentuh fs/console.
 *   render(plan) → File[] : ubah Plan jadi [{ domain, filename, contents }] (string).
 *   main()               : shell tipis — baca → plan → render → (filter arg) → tulis.
 *
 * Karena plan() murni & total, "spec masuk → keputusan keluar" bisa di-assert
 * langsung tanpa mock disk (mis. plan(spec).shared.names berisi "DeletedResult").
 *
 * Cara pakai:
 *   node extract-types.js               # generate semua domain + _shared.ts
 *   node extract-types.js organisasi    # generate 1 domain saja (+ _shared.ts)
 *
 * Output: folder ./types/ (satu file .ts per domain + _shared.ts).
 */

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "master.json");
const OUTPUT_DIR = path.join(__dirname, "types");
const SHARED_MODULE = "_shared";

// ── Utility: schema → TypeScript ─────────────────────────────────────

/** Konversi nilai enum OpenAPI menjadi string/number literal TypeScript. */
function toLiteral(value) {
  return JSON.stringify(value);
}

/** Segmen terakhir dari sebuah $ref → nama tipe. */
function refName(ref) {
  return ref.replace(/^#\/components\/schemas\//, "");
}

/**
 * Petakan schema OpenAPI (primitif / array / $ref / enum / gabungan)
 * menjadi ekspresi tipe TypeScript inline.
 */
function schemaToTsType(schema) {
  if (!schema || typeof schema !== "object") return "unknown";

  if (schema.$ref) return refName(schema.$ref);

  if (Array.isArray(schema.enum)) {
    return schema.enum.map(toLiteral).join(" | ");
  }

  switch (schema.type) {
    case "integer":
    case "number":
      return "number";
    case "string":
      return "string";
    case "boolean":
      return "boolean";
    case "array":
      return `${wrapUnion(schemaToTsType(schema.items))}[]`;
    case "object": {
      if (schema.properties) {
        const inner = Object.entries(schema.properties)
          .map(([k, v]) => `  ${k}: ${schemaToTsType(v)};`)
          .join("\n");
        return `{\n${inner}\n}`;
      }
      return "Record<string, unknown>";
    }
    default:
      if (Array.isArray(schema.oneOf) || Array.isArray(schema.anyOf)) {
        const variants = schema.oneOf || schema.anyOf;
        return variants.map((v) => wrapUnion(schemaToTsType(v))).join(" | ");
      }
      if (Array.isArray(schema.allOf)) {
        return schema.allOf.map((v) => schemaToTsType(v)).join(" & ");
      }
      return "unknown";
  }
}

/** Bungkus union dengan kurung agar aman sebagai elemen array. */
function wrapUnion(tsType) {
  return tsType.includes("|") ? `(${tsType})` : tsType;
}

/** Komentar inline opsional (format int64/date-time, batasan validasi). */
function describeProp(propSchema) {
  if (!propSchema || typeof propSchema !== "object") return "";
  const parts = [];
  if (propSchema.format) parts.push(propSchema.format);
  if (propSchema.minLength != null) parts.push(`minLength ${propSchema.minLength}`);
  if (propSchema.maximum != null) parts.push(`max ${propSchema.maximum}`);
  if (propSchema.minimum != null) parts.push(`min ${propSchema.minimum}`);
  return parts.length ? ` // ${parts.join(", ")}` : "";
}

/**
 * Konversi satu named schema jadi deklarasi TypeScript.
 * enumAlias: peta nama-enum → nama tipe alias (mis. HttpStatusText),
 * dipakai untuk mengganti enum berulang dengan referensi tipe tunggal.
 */
function schemaToDeclaration(name, schema, enumAlias) {
  if (Array.isArray(schema.enum)) {
    const union = schema.enum.map(toLiteral).join(" | ");
    return `export type ${name} = ${union};\n`;
  }

  if (schema.type === "object" || schema.properties) {
    const required = new Set(schema.required || []);
    const props = Object.entries(schema.properties || {});

    if (props.length === 0) {
      return `export type ${name} = Record<string, unknown>;\n`;
    }

    const lines = props.map(([propName, propSchema]) => {
      const optional = required.has(propName) ? "" : "?";
      const tsType = resolveEnumAlias(propSchema, enumAlias);
      const comment = describeProp(propSchema);
      return `  ${propName}${optional}: ${tsType};${comment}`;
    });

    return `export interface ${name} {\n${lines.join("\n")}\n}\n`;
  }

  return `export type ${name} = ${schemaToTsType(schema)};\n`;
}

/**
 * Jika sebuah property adalah enum yang sudah punya alias bersama
 * (mis. HttpStatusText), pakai alias itu; kalau tidak, konversi normal.
 */
function resolveEnumAlias(propSchema, enumAlias) {
  if (enumAlias && Array.isArray(propSchema.enum)) {
    const sig = enumSignature(propSchema.enum);
    if (enumAlias.has(sig)) return enumAlias.get(sig);
  }
  return schemaToTsType(propSchema);
}

/** Tanda tangan stabil untuk mendeteksi enum yang identik. */
function enumSignature(values) {
  return JSON.stringify(values);
}

// ── Utility: graf schema & domain ────────────────────────────────────

/** Kumpulkan seluruh $ref schema yang muncul di sebuah node (rekursif). */
function collectRefs(node, acc = new Set()) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, acc);
    return acc;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string") {
      acc.add(refName(value));
    } else {
      collectRefs(value, acc);
    }
  }
  return acc;
}

/** Transitive closure: semua schema yang dibutuhkan oleh `name`. */
function schemaClosure(name, schemas, acc = new Set()) {
  if (acc.has(name) || !schemas[name]) return acc;
  acc.add(name);
  for (const ref of collectRefs(schemas[name])) {
    schemaClosure(ref, schemas, acc);
  }
  return acc;
}

/** Domain = segmen pertama path setelah "/master/". */
function domainOf(endpointPath) {
  return endpointPath.replace(/^\/master\//, "").split("/")[0];
}

/**
 * Urutkan schema secara topologis (dependency lebih dulu). Cycle aman.
 */
function topoSort(names, schemas) {
  const inScope = new Set(names);
  const visited = new Set();
  const ordered = [];

  function visit(name) {
    if (visited.has(name) || !inScope.has(name)) return;
    visited.add(name);
    for (const dep of collectRefs(schemas[name])) visit(dep);
    ordered.push(name);
  }

  for (const name of names) visit(name);
  return ordered;
}

// ── Build ────────────────────────────────────────────────────────────

const GENERATED_HEADER = [
  " * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.",
  " * JANGAN diedit manual — jalankan ulang script bila spec berubah.",
  " *",
  " * Sumber: docs/api/master/master.json",
];

/** Header komentar file. */
function fileHeader(title, extraLines = []) {
  return [
    "/**",
    ` * ${title}`,
    " *",
    ...GENERATED_HEADER,
    ...extraLines.map((l) => ` * ${l}`),
    " */",
    "",
  ].join("\n");
}

/**
 * Render satu file domain dari keputusan yang SUDAH diambil di plan().
 * `d` adalah entri Plan.domains: { domain, endpoints, local, imports, reExports }.
 */
function renderDomainFile(d, schemas, enumAlias) {
  const header = fileHeader(`${d.domain} — response & request types`, [
    `Endpoint : ${d.endpoints.join(", ")}`,
  ]);

  const body = d.local.map((name) => schemaToDeclaration(name, schemas[name], enumAlias)).join("\n");

  const importLine = d.imports.length ? `${buildImport("import", d.imports)}\n\n` : "";
  const reExportLine = d.reExports.length ? `\n${buildImport("export", d.reExports)}\n` : "";

  return normalizeTrailing(`${header}\n${importLine}${body}${reExportLine}`);
}

/** True bila nama tipe muncul sebagai identifier utuh (word-boundary) di teks. */
function referencedIn(text, name) {
  return new RegExp(`\\b${name}\\b`).test(text);
}

/**
 * Bangun statement import/export bergaya Biome: satu baris bila muat di
 * lineWidth (120), atau multi-line (satu nama per baris) bila melebihi.
 * keyword: "import" | "export".
 */
function buildImport(keyword, names) {
  const singleLine = `${keyword} type { ${names.join(", ")} } from "./${SHARED_MODULE}";`;
  if (singleLine.length <= 120) return singleLine;
  const inner = names.map((n) => `  ${n},`).join("\n");
  return `${keyword} type {\n${inner}\n} from "./${SHARED_MODULE}";`;
}

/**
 * Rapikan whitespace: maksimal satu blank line antar-blok, dan file diakhiri
 * tepat satu newline. Menyamakan output dengan gaya formatter Biome.
 */
function normalizeTrailing(content) {
  return `${content.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "")}\n`;
}

/**
 * Render _shared.ts dari keputusan Plan.shared:
 *   { names: [...topoSorted], aliasDecls: [dekl string], enumAlias }.
 */
function renderSharedFile(shared, schemas) {
  const header = fileHeader("shared — tipe lintas-domain (dipakai >= 2 module)");

  const aliasBlock = shared.aliasDecls.length ? `${shared.aliasDecls.join("\n")}\n\n` : "";
  const body = shared.names.map((name) => schemaToDeclaration(name, schemas[name], shared.enumAlias)).join("\n");

  return normalizeTrailing(`${header}\n${aliasBlock}${body}`);
}

// ── Plan: keputusan murni (tanpa I/O) ────────────────────────────────

/**
 * Ubah OpenAPI spec menjadi Plan — SEMUA keputusan sebagai data, tanpa fs.
 * Fungsi ini murni & total (selalu memuat seluruh domain; filter argumen CLI
 * dilakukan di shell). Bentuk Plan:
 *   {
 *     schemas,                       // rujukan schema mentah utk renderer
 *     enumAlias,                     // Map<signature, aliasTypeName>
 *     shared:  { names, aliasDecls, enumAlias },
 *     domains: [{ domain, endpoints, local, imports, reExports }],
 *     stats:   { totalDomain, totalSchema, sharedCount },
 *   }
 */
function plan(spec) {
  const schemas = spec.components?.schemas || {};
  const paths = spec.paths || {};

  // 1. Petakan domain → daftar path & closure schema-nya.
  const domainEndpoints = {}; // domain → ["GET /master/x", ...]
  const domainSchemas = {}; // domain → Set<schemaName>
  for (const endpointPath of Object.keys(paths)) {
    const domain = domainOf(endpointPath);
    domainEndpoints[domain] ??= [];
    domainSchemas[domain] ??= new Set();

    for (const method of Object.keys(paths[endpointPath])) {
      domainEndpoints[domain].push(`${method.toUpperCase()} ${endpointPath}`);
    }
    for (const ref of collectRefs(paths[endpointPath])) {
      schemaClosure(ref, schemas, domainSchemas[domain]);
    }
  }

  // 2. Hitung berapa domain memakai tiap schema → tentukan yang shared.
  const usage = {}; // schemaName → Set<domain>
  for (const [domain, set] of Object.entries(domainSchemas)) {
    for (const name of set) {
      (usage[name] ??= new Set()).add(domain);
    }
  }
  const sharedNames = new Set(Object.keys(usage).filter((n) => usage[n].size >= 2));

  // 3. Deteksi enum yang identik & berulang → jadikan alias bersama.
  //    Fokus: enum HTTP status (statusText) yang muncul di banyak wrapper.
  const enumAlias = new Map(); // signature → aliasTypeName
  const aliasDecls = [];
  const httpStatus = findHttpStatusEnum(schemas);
  if (httpStatus) {
    enumAlias.set(enumSignature(httpStatus), "HttpStatusText");
    aliasDecls.push(
      `/** Semua status HTTP (dipakai oleh field statusText di wrapper response). */\nexport type HttpStatusText =\n  | ${httpStatus.map(toLiteral).join("\n  | ")};`,
    );
  }

  // 4. Keputusan per domain: schema lokal (topo-sort), lalu import & re-export.
  const domains = Object.keys(domainSchemas)
    .sort()
    .map((domain) => {
      const all = [...domainSchemas[domain]];
      const local = topoSort(
        all.filter((n) => !sharedNames.has(n)),
        schemas,
      );
      const sharedUsed = all.filter((n) => sharedNames.has(n));

      // Import: tipe shared + alias enum yang BENAR-BENAR dirujuk deklarasi
      // lokal (bukan sekadar ada di closure endpoint) → hindari unused import.
      const localBody = local.map((n) => schemaToDeclaration(n, schemas[n], enumAlias)).join("\n");
      const candidates = new Set([...sharedUsed, ...enumAlias.values()]);
      const imports = [...candidates].filter((n) => referencedIn(localBody, n)).sort();

      // Re-export seluruh schema shared milik domain ini → file domain jadi SATU
      // pintu import untuk konsumen. HttpStatusText sengaja tidak di-re-export
      // (alias internal, bukan schema).
      const reExports = [...sharedUsed].sort();

      return { domain, endpoints: domainEndpoints[domain].sort(), local, imports, reExports };
    });

  return {
    schemas,
    enumAlias,
    shared: { names: topoSort([...sharedNames], schemas), aliasDecls, enumAlias },
    domains,
    stats: {
      totalDomain: Object.keys(domainSchemas).length,
      totalSchema: Object.keys(schemas).length,
      sharedCount: sharedNames.size,
      hasHttpStatus: Boolean(httpStatus),
    },
  };
}

/**
 * Cari nilai enum HTTP status (dikenali dari kehadiran "200 OK") di schema
 * mana pun, untuk dijadikan satu alias HttpStatusText. Mengembalikan array
 * nilai enum, atau null bila tidak ada.
 */
function findHttpStatusEnum(schemas) {
  for (const schema of Object.values(schemas)) {
    for (const prop of Object.values(schema.properties || {})) {
      if (Array.isArray(prop.enum) && prop.enum.includes("200 OK")) {
        return prop.enum;
      }
    }
  }
  return null;
}

// ── Render: Plan → daftar file (string) ──────────────────────────────

/**
 * Ubah Plan menjadi daftar file { domain, filename, contents } — string saja,
 * tanpa I/O. Entri _shared punya domain: null.
 */
function render(p) {
  const files = [
    { domain: null, filename: `${SHARED_MODULE}.ts`, contents: renderSharedFile(p.shared, p.schemas) },
  ];
  for (const d of p.domains) {
    files.push({ domain: d.domain, filename: `${d.domain}.ts`, contents: renderDomainFile(d, p.schemas, p.enumAlias) });
  }
  return files;
}

// ── Main: shell tipis (baca → plan → render → tulis) ─────────────────

function main() {
  try {
    console.log(`📖 Membaca ${INPUT_FILE} ...`);
    const spec = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));

    const p = plan(spec);

    // Filter opsional 1 domain dari argumen CLI (plan tetap total; shell memilih).
    const arg = process.argv[2];
    if (arg && !p.domains.some((d) => d.domain === arg)) {
      const choices = p.domains.map((d) => d.domain).join(", ");
      throw new Error(`Domain "${arg}" tidak ada. Pilihan: ${choices}`);
    }

    const files = render(p).filter((f) => f.domain === null || !arg || f.domain === arg);

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`📁 Membuat folder ${OUTPUT_DIR}`);
    }

    const domainCount = files.filter((f) => f.domain !== null).length;
    console.log(`\n🧩 ${SHARED_MODULE}.ts`.padEnd(24) + `(${p.stats.sharedCount} schema lintas-domain${p.stats.hasHttpStatus ? " + HttpStatusText" : ""})`);
    console.log(`\n🧬 Meng-generate ${domainCount} module domain ...\n`);

    for (const f of files) {
      fs.writeFileSync(path.join(OUTPUT_DIR, f.filename), f.contents, "utf-8");
      if (f.domain !== null) {
        const d = p.domains.find((x) => x.domain === f.domain);
        console.log(`  ✅ ${f.filename.padEnd(28)} ${d.local.length} lokal, ${d.reExports.length} shared`);
      }
    }

    console.log(`\n📊 Ringkasan:`);
    console.log(`   Total domain      : ${p.stats.totalDomain}`);
    console.log(`   Total schema      : ${p.stats.totalSchema}`);
    console.log(`   Schema shared     : ${p.stats.sharedCount}`);
    console.log(`   Output folder     : ${OUTPUT_DIR}/`);
    console.log(`   Selesai! 🎯`);
  } catch (err) {
    console.error(`\n❌ Gagal memproses: ${err.message}`);
    process.exit(1);
  }
}

// Ekspor seam murni untuk pengujian; jalankan main() hanya saat dipanggil CLI.
if (require.main === module) {
  main();
} else {
  module.exports = { plan, render, schemaToDeclaration, schemaToTsType, topoSort, domainOf };
}
