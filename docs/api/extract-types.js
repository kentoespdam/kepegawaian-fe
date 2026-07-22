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

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const OUTPUT_DIR = path.join(__dirname, "types");
// Dari docs/api/extract-types.js → naik 2 level ke root, lalu ke src/types/
const SRC_TYPES_DIR = path.join(__dirname, "..", "..", "src", "types");
const SHARED_MODULE = "_shared";

// ── Utility: schema → TypeScript ─────────────────────────────────────

/** Konversi nilai enum OpenAPI menjadi string/number literal TypeScript. */
function toLiteral(value) {
	return JSON.stringify(value);
}

/**
 * Sumber tunggal "enum → union tipe TS". Dua bentuk keluaran:
 *   - inline  (multiline:false): `"a" | "b"`         — dipakai di ekspresi tipe
 *   - hoisted (multiline:true) : `\n  | "a"\n  | "b"` — dipakai di alias top-level
 */
function renderEnumUnion(values, { multiline = false } = {}) {
	if (multiline) return `\n  | ${values.map(toLiteral).join("\n  | ")}`;
	return values.map(toLiteral).join(" | ");
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
		return renderEnumUnion(schema.enum);
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
function schemaToDeclaration(name, schema, enumAlias, schemas) {
	// Wrapper collapse (BY-STRUCTURE): ganti interface wrapper per-entity dengan
	// satu referensi generic dari _shared.ts (Envelope<T>/PageEnvelope<T>). Hanya
	// aktif saat peta `schemas` tersedia (renderer/plan); pemanggil lama 3-arg
	// (mis. unit test schema polos) tak terpengaruh.
	if (schemas) {
		if (isPageEnvelopeSchema(schema)) {
			return `export type ${name} = PageEnvelope<${pageEnvelopeInner(schema, schemas)}>;\n`;
		}
		if (isEnvelopeSchema(schema)) {
			return `export type ${name} = Envelope<${envelopeInner(schema)}>;\n`;
		}
	}

	// Enum bernama top-level ditangani oleh cabang fallback di bawah lewat
	// schemaToTsType (hasilnya identik) — tak perlu cabang enum terpisah di sini.
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

/** Perbandingan struktural (deep-equal) untuk objek polos dan array. */
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a == null || b == null) return false;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		return a.every((v, i) => deepEqual(v, b[i]));
	}
	if (typeof a === "object" && typeof b === "object") {
		const aKeys = Object.keys(a).sort();
		const bKeys = Object.keys(b).sort();
		if (aKeys.length !== bKeys.length) return false;
		if (!aKeys.every((k, i) => k === bKeys[i])) return false;
		return aKeys.every((k) => deepEqual(a[k], b[k]));
	}
	return false;
}

// ── Deteksi wrapper BY-STRUCTURE (bukan by-name) ─────────────────────
// Wrapper standar Spring dikenali dari BENTUK property-set-nya, bukan dari
// namanya (SingleResult*/ListResult*/SavedResult*/PageResult*/DeletedResult),
// supaya keluarga generic Envelope<T>/PageEnvelope<T>/Page<T> cukup ditulis
// SEKALI di _shared.ts; tiap entity hanya beda pada `data`.

const GENERIC_NAMES = ["Envelope", "PageEnvelope", "Page", "PageQuery"];
// Query-param pagination quartet — di-hoist ke PageQuery (_shared); tiap entity
// hanya menyisakan filter spesifiknya via `extends PageQuery`.
const PAGE_QUERY_KEYS = ["page", "size", "sortBy", "sortDirection"];
const ENVELOPE_KEYS = ["status", "statusText", "errors", "message", "data", "timestamp"];
const PAGE_ENVELOPE_KEYS = ["status", "statusText", "data", "timestamp"];
const PAGE_MARKER_KEYS = ["content", "pageable", "totalElements", "totalPages"];

function propKeySet(schema) {
	return new Set(Object.keys(schema?.properties || {}));
}
function hasExactKeys(schema, keys) {
	const ks = propKeySet(schema);
	return ks.size === keys.length && keys.every((k) => ks.has(k));
}
function hasAllKeys(schema, keys) {
	const ks = propKeySet(schema);
	return keys.every((k) => ks.has(k));
}

/** Envelope penuh: tepat 6 field {status,statusText,errors,message,data,timestamp}. */
function isEnvelopeSchema(schema) {
	return hasExactKeys(schema, ENVELOPE_KEYS);
}
/** PageEnvelope: tepat 4 field (tanpa errors/message), data → $ref schema Page. */
function isPageEnvelopeSchema(schema) {
	return hasExactKeys(schema, PAGE_ENVELOPE_KEYS) && !!schema.properties.data?.$ref;
}
/** Page (pageable): punya content[] + pageable + totalElements/totalPages. */
function isPageSchema(schema) {
	return hasAllKeys(schema, PAGE_MARKER_KEYS) && schema.properties.content?.type === "array";
}

/** Ekspresi T untuk Envelope<T> — tipe dari property `data`. */
function envelopeInner(schema) {
	return schemaToTsType(schema.properties.data);
}
/** Ekspresi elemen untuk Page<T> — tipe elemen dari `content[]`. */
function pageInner(schema) {
	const content = schema.properties.content || {};
	return schemaToTsType(content.items || {});
}
/** Ekspresi T untuk PageEnvelope<T> — elemen content dari schema Page yang dirujuk `data`. */
function pageEnvelopeInner(schema, schemas) {
	const ref = schema.properties.data?.$ref;
	const pageSchema = ref && schemas ? schemas[refName(ref)] : null;
	return pageSchema && isPageSchema(pageSchema) ? pageInner(pageSchema) : "unknown";
}

/**
 * Keluarga generic yang menggantikan wrapper per-entity. Ditulis SEKALI di
 * _shared.ts. Envelope<T> = union 2 cabang agar caller tak perlu `?.` di error:
 *   - 2xx  : message wajib, data ada, errors?: never
 *   - error: errors wajib (string | string[]), data?: never
 * PageEnvelope<T> mengikuti spec pageable (tanpa errors/message; backend selalu
 * balas pageable dengan content:[] walau kosong).
 */
const GENERIC_FAMILY = [
	"/** Wrapper standar semua response. Union: sukses (data + message) | error (errors). */",
	"export type Envelope<T> =",
	"  | { status: number; statusText?: HttpStatusText; message: string; data: T; errors?: never; timestamp?: string } // 2xx",
	"  | { status: number; statusText?: HttpStatusText; message?: string; data?: never; errors: string | string[]; timestamp?: string }; // error",
	"",
	"export interface Page<T> {",
	"  totalElements?: number; // int64",
	"  totalPages?: number; // int32",
	"  size?: number; // int32",
	"  content?: T[];",
	"  number?: number; // int32",
	"  numberOfElements?: number; // int32",
	"  pageable?: PageableObject;",
	"  sort?: SortObject;",
	"  first?: boolean;",
	"  last?: boolean;",
	"  empty?: boolean;",
	"}",
	"",
	"export interface PageEnvelope<T> {",
	"  status?: number; // int32",
	"  statusText?: HttpStatusText;",
	"  data?: Page<T>;",
	"  timestamp?: string; // date-time",
	"}",
	"",
	"/** Query params pagination standar; di-extends oleh tiap {Entity}SearchParams. */",
	"export interface PageQuery {",
	"  page?: number; // int32",
	"  size?: number; // int32",
	"  sortBy?: string;",
	'  sortDirection?: "asc" | "desc";',
	"}",
].join("\n");

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

/** Domain = segmen kedua dari path endpoint (setelah prefix modul). */
function domainOf(endpointPath) {
	return endpointPath.replace(/^\//, "").split("/")[1];
}

/** kebab-case domain → PascalCase entity (mis. "jenis-sp" → "JenisSp"). */
function pascalCase(kebab) {
	return kebab
		.split("-")
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join("");
}

/**
 * Kumpulkan query params (in:"query") dari SEMUA GET endpoint sebuah domain,
 * dedup by-name. Path params (mis. id) diabaikan. Kembalikan [] bila tak ada.
 */
function collectQueryParams(pathsForDomain) {
	const byName = new Map();
	for (const pathItem of pathsForDomain) {
		const params = pathItem.get?.parameters || [];
		for (const p of params) {
			if (p.in === "query" && !byName.has(p.name)) byName.set(p.name, p);
		}
	}
	return [...byName.values()];
}

/**
 * Bangun deklarasi `{Entity}SearchParams` — filter query-param per entity untuk
 * table. Pagination quartet (page/size/sortBy/sortDirection) di-hoist ke
 * PageQuery (extends), jadi di sini hanya filter spesifik entity. Semua opsional
 * (spec menandai required:false). Kembalikan null bila tak ada filter spesifik.
 */
function buildSearchParamsDecl(domain, queryParams) {
	const filters = queryParams.filter((p) => !PAGE_QUERY_KEYS.includes(p.name));
	if (filters.length === 0) return null;
	const name = `${pascalCase(domain)}SearchParams`;
	const lines = filters.map((p) => {
		const optional = p.required ? "" : "?";
		const comment = describeProp(p.schema);
		return `  ${p.name}${optional}: ${schemaToTsType(p.schema)};${comment}`;
	});
	return `export interface ${name} extends PageQuery {\n${lines.join("\n")}\n}\n`;
}

/**
 * Kebijakan penempatan (output-shape) — SUMBER TUNGGAL aturan "shared vs lokal".
 * Sebuah tipe dengan tepat satu domain-pemilik tinggal bersama pemiliknya
 * (lokal); selain itu — dipakai banyak domain, atau tanpa pemilik jelas (n=0,
 * mis. enum orphan) — masuk ke commons `_shared`. Dipakai oleh keputusan schema
 * MAUPUN enum agar keduanya tak pernah menyimpang.
 */
function placementOf(domainCount) {
	return domainCount === 1 ? "local" : "shared";
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
	" * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.",
	" * JANGAN diedit manual — jalankan ulang script bila spec berubah.",
	" *",
	" * Sumber: docs/api/{modul}/api.json",
];

/** Header komentar file. */
function fileHeader(title, extraLines = []) {
	return ["/**", ` * ${title}`, " *", ...GENERATED_HEADER, ...extraLines.map((l) => ` * ${l}`), " */", ""].join("\n");
}

/**
 * Render satu file domain dari keputusan yang SUDAH diambil di plan().
 * `d` adalah entri Plan.domains: { domain, endpoints, local, imports, reExports, module }.
 */
function renderDomainFile(d, schemas, enumAlias, module) {
	const header = fileHeader(`${d.domain} — response & request types`, [`Endpoint : ${d.endpoints.join(", ")}`]);

	// Alias enum yang berulang HANYA di domain ini (bukan lintas-domain) →
	// dideklarasi lokal, sebelum schema. Kosong bila tak ada.
	const aliasBlock = d.aliasDecls.length ? `${d.aliasDecls.join("\n")}\n\n` : "";
	const searchBlock = d.searchParams ? `${d.searchParams}\n` : "";
	const body = d.local.map((name) => schemaToDeclaration(name, schemas[name], enumAlias, schemas)).join("\n");

	const importLine = d.imports.length ? `${buildImport("import", d.imports, module)}\n\n` : "";
	const reExportLine = d.reExports.length ? `\n${buildImport("export", d.reExports, module)}\n` : "";

	return normalizeTrailing(`${header}\n${importLine}${aliasBlock}${searchBlock}${body}${reExportLine}`);
}

/** True bila nama tipe muncul sebagai identifier utuh (word-boundary) di teks. */
function referencedIn(text, name) {
	return new RegExp(`\\b${name}\\b`).test(text);
}

/**
 * Bangun statement import/export bergaya Biome: satu baris bila muat di
 * lineWidth (120), atau multi-line (satu nama per baris) bila melebihi.
 * keyword: "import" | "export". module: prefix modul untuk path relatif.
 */
function buildImport(keyword, names, module) {
	const from = module ? `../${SHARED_MODULE}` : `./${SHARED_MODULE}`;
	const singleLine = `${keyword} type { ${names.join(", ")} } from "${from}";`;
	if (singleLine.length <= 120) return singleLine;
	const inner = names.map((n) => `  ${n},`).join("\n");
	return `${keyword} type {\n${inner}\n} from "${from}";`;
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
	// Keluarga generic (Envelope/Page/PageEnvelope) ditulis SEKALI di sini; tipe
	// TS di-hoist jadi urutan relatif thd PageableObject/SortObject/HttpStatusText
	// tak masalah. Ditaruh sebelum body agar mudah ditemukan pembaca.
	const genericBlock = `${GENERIC_FAMILY}\n\n`;
	const body = shared.names
		.map((name) => schemaToDeclaration(name, schemas[name], shared.enumAlias, schemas))
		.join("\n");

	return normalizeTrailing(`${header}\n${aliasBlock}${genericBlock}${body}`);
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
 *     domains: [{ domain, endpoints, local, aliasDecls, imports, reExports }],
 *     warnings: [string],            // enum berulang tanpa nama di KNOWN_ENUMS
 *     stats:   { totalDomain, totalSchema, sharedCount, hasHttpStatus },
 *   }
 */
function plan(spec, moduleTypes = {}) {
	const schemas = spec.components?.schemas || {};
	const paths = spec.paths || {};

	// 1. Petakan domain → daftar path & closure schema-nya.
	//    Untuk modul tipe "resource": domain = nama modul (semua path jadi 1 file)
	//    Untuk modul tipe "collection" (default): domain = segmen entity.
	const domainEndpoints = {}; // domain → ["GET /master/x", ...]
	const domainSchemas = {}; // domain → Set<schemaName>
	const domainPaths = {}; // domain → [pathItem] (utk ekstraksi query params GET)
	for (const endpointPath of Object.keys(paths)) {
		const mod = endpointPath.replace(/^\//, "").split("/")[0];
		const type = moduleTypes[mod] || "collection";
		const domain = type === "resource" ? mod : domainOf(endpointPath);
		if (!domain) continue; // path root (/), skip
		domainEndpoints[domain] ??= [];
		domainSchemas[domain] ??= new Set();
		domainPaths[domain] ??= [];
		domainPaths[domain].push(paths[endpointPath]);

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
			usage[name] ??= new Set();
			usage[name].add(domain);
		}
	}
	// Schema Page (pageable) di-inline ke generic Page<T> di _shared.ts → jangan
	// ditulis sebagai interface tersendiri di mana pun (lokal maupun shared).
	const isSuppressed = (n) => isPageSchema(schemas[n]);
	const sharedNames = new Set(
		Object.keys(usage).filter((n) => placementOf(usage[n].size) === "shared" && !isSuppressed(n)),
	);

	// 3. Rencanakan alias enum (dedup enum identik yang berulang) via kebijakan
	//    frekuensi + registry KNOWN_ENUMS. Penempatan mengikuti aturan schema:
	//    enum lintas-domain → _shared.ts; enum berulang dalam 1 domain → alias
	//    lokal di file domain itu.
	const enumPlan = planEnumAliases(schemas, domainSchemas);
	const { enumAlias, sharedAliasDecls, sharedAliasNames, domainAliasDecls } = enumPlan;

	// 4. Keputusan per domain: schema lokal (topo-sort), alias lokal, import & re-export.
	const domains = Object.keys(domainSchemas)
		.sort()
		.map((domain) => {
			const all = [...domainSchemas[domain]];
			const local = topoSort(
				all.filter((n) => !sharedNames.has(n) && !isSuppressed(n)),
				schemas,
			);
			const sharedUsed = all.filter((n) => sharedNames.has(n));
			const aliasDecls = domainAliasDecls.get(domain) || [];

			// Query-param filter type per entity (GET). null bila tak ada filter
			// spesifik (mis. endpoint /{id}-only atau /list tanpa query).
			const searchParams = buildSearchParamsDecl(domain, collectQueryParams(domainPaths[domain]));

			// Body lokal = alias lokal + SearchParams + deklarasi schema lokal; dipakai
			// untuk mendeteksi import yang BENAR-BENAR dirujuk (hindari unused import).
			const localBody = [
				...aliasDecls,
				...(searchParams ? [searchParams] : []),
				...local.map((n) => schemaToDeclaration(n, schemas[n], enumAlias, schemas)),
			].join("\n");
			// Import: schema shared + alias enum SHARED + generic family (Envelope/
			// PageEnvelope/Page) yang dirujuk oleh alias wrapper hasil collapse. Alias
			// lokal dideklarasi di file ini, jadi tak di-import. Difilter referencedIn.
			const candidates = new Set([...sharedUsed, ...sharedAliasNames, ...GENERIC_NAMES]);
			const imports = [...candidates].filter((n) => referencedIn(localBody, n)).sort();

			// Re-export seluruh schema shared milik domain ini → file domain jadi SATU
			// pintu import untuk konsumen. Alias enum (mis. HttpStatusText) sengaja tak
			// di-re-export (alias internal, bukan schema).
			const reExports = [...sharedUsed].sort();

			// Module = segmen pertama dari endpoint path (e.g. "master", "pegawai")
			const endpoints = domainEndpoints[domain].sort();
			const firstPath = endpoints[0].replace(/^(GET|POST|PUT|DELETE) /, "");
			const module = firstPath.replace(/^\//, "").split("/")[0];

			return { domain, endpoints, module, local, aliasDecls, searchParams, imports, reExports };
		});

	return {
		schemas,
		enumAlias,
		shared: { names: topoSort([...sharedNames], schemas), aliasDecls: sharedAliasDecls, enumAlias },
		domains,
		warnings: enumPlan.warnings,
		stats: {
			totalDomain: Object.keys(domainSchemas).length,
			totalSchema: Object.keys(schemas).length,
			sharedCount: sharedNames.size,
			hasHttpStatus: sharedAliasNames.has("HttpStatusText"),
		},
	};
}

// ── Kebijakan dedup enum ──────────────────────────────────────────────

/** Ambang: enum yang muncul >= sekian kali dianggap "berulang" & di-hoist. */
const ENUM_DEDUP_THRESHOLD = 2;

/**
 * Registry enum bernama — dikenali dari KONTEN (bukan nama properti, yang tak
 * bisa diandalkan). Enum berulang yang cocok salah satu `detect` memakai nama
 * & komentar yang ditentukan di sini. Tambahkan entri saat spec memperkenalkan
 * enum berulang baru agar nama tetap bermakna (lihat `warnings` dari plan()).
 */
const KNOWN_ENUMS = [
	{
		name: "HttpStatusText",
		comment: "Semua status HTTP (dipakai oleh field statusText di wrapper response).",
		detect: (values) => values.includes("200 OK"),
	},
	{
		name: "JenisSk",
		comment: "Jenis SK kepegawaian (SK_KENAIKAN_PANGKAT_GOLONGAN, SK_CAPEG, SK_PEGAWAI_TETAP, dll).",
		detect: (values) => values.includes("SK_CAPEG"),
	},
	{
		name: "JenisKelamin",
		comment: "Jenis kelamin (LAKI_LAKI, PEREMPUAN).",
		detect: (values) => values.includes("LAKI_LAKI"),
	},
	{
		name: "Agama",
		comment: "Agama (ISLAM, KRISTEN, KATOLIK, HINDU, BUDHA).",
		detect: (values) => values.includes("ISLAM"),
	},
	{
		name: "StatusKepegawaian",
		comment: "Status kepegawaian (KONTRAK, CAPEG, PEGAWAI, CALON_HONORER, HONORER, NON_PEGAWAI).",
		detect: (values) => values.includes("CALON_HONORER"),
	},
	{
		name: "StatusKawin",
		comment: "Status perkawinan (BELUM_KAWIN, KAWIN, JANDA_DUDA, MENIKAH_SEKANTOR, TIDAK_TAHU).",
		detect: (values) => values.includes("BELUM_KAWIN"),
	},
	{
		name: "JenisProfilUpdate",
		comment: "Jenis profil yang diupdate (PROFIL_KELUARGA, PROFIL_PENDIDIKAN).",
		detect: (values) => values.includes("PROFIL_KELUARGA"),
	},
	{
		name: "GolonganDarah",
		comment: "Golongan darah (A, B, AB, O).",
		detect: (values) => values.includes("AB"),
	},
	{
		name: "TipeKomponen",
		comment: "Tipe komponen penggajian (NONE, PEMASUKAN, POTONGAN).",
		detect: (values) => values.includes("PEMASUKAN"),
	},
	{
		name: "StatusApproval",
		comment: "Status approval umum (PENDING, APPROVED, CONFIRMED, REJECTED, CANCELED, RETURNED).",
		detect: (values) => values.includes("CONFIRMED"),
	},
	{
		name: "StatusBerhenti",
		comment: "Status berhenti pegawai (BERHENTI_OR_KELUAR, DIRUMAHKAN).",
		detect: (values) => values.includes("BERHENTI_OR_KELUAR"),
	},
	{
		name: "JenisRiwayatKepegawaian",
		comment: "Jenis riwayat kepegawaian (PENGANGKATAN_PERTAMA, MUTASI_LOKER).",
		detect: (values) => values.includes("PENGANGKATAN_PERTAMA"),
	},
	{
		name: "JenisAksiKontrak",
		comment: "Jenis aksi kontrak (PERPANJANGAN, PENGANGKATAN, TERMINASI).",
		detect: (values) => values.includes("TERMINASI"),
	},
	{
		name: "JenisTunjangan",
		comment: "Jenis tunjangan (JABATAN, KINERJA, BERAS, AIR).",
		detect: (values) => values.includes("BERAS"),
	},
	{
		name: "KlaimCuti",
		comment: "Jenis klaim cuti (PENGAJUAN_CUTI, KLAIM_CUTI).",
		detect: (values) => values.includes("PENGAJUAN_CUTI"),
	},
	{
		name: "StatusBatch",
		comment: "Status batch penggajian (PENDING, PROSES).",
		detect: (values) => values.includes("PROSES"),
	},
	{
		name: "StatusUpdateProfil",
		comment: "Status approval update profil (REJECT, PENDING, APPROVED).",
		detect: (values) => values.includes("REJECT"),
	},
	{
		name: "HubunganKeluarga",
		comment: "Hubungan keluarga (SUAMI, ISTRI, AYAH, IBU, ANAK, SAUDARA).",
		detect: (values) => values.includes("SUAMI"),
	},
	{
		name: "StatusPendidikanKeluarga",
		comment: "Status pendidikan anggota keluarga (BELUM_SEKOLAH, SEKOLAH, SELESAI_SEKOLAH).",
		detect: (values) => values.includes("SELESAI_SEKOLAH"),
	},
	{
		name: "TingkatKemampuan",
		comment: "Tingkat kemampuan keahlian (KURANG, BAIK, CUKUP).",
		detect: (values) => values.includes("KURANG"),
	},
];

/** Bangun deklarasi TypeScript untuk satu alias enum (multi-line, satu nilai/baris). */
function buildEnumAliasDecl(name, values, comment) {
	const doc = comment ? `/** ${comment} */\n` : "";
	return `${doc}export type ${name} =${renderEnumUnion(values, { multiline: true })};`;
}

/**
 * Rencanakan alias untuk enum yang identik & berulang (>= ENUM_DEDUP_THRESHOLD).
 * Kebijakan (bukan magic-string):
 *   - Nama: dari KNOWN_ENUMS bila kontennya dikenali; jika tidak, nama auto
 *     `Enum{n}` + peringatan agar diberi nama di registry (tak pernah diam-diam
 *     terduplikasi — selalu ter-hoist).
 *   - Penempatan (mengikuti aturan schema): enum yang tersebar >= 2 domain →
 *     _shared.ts; enum berulang dalam 1 domain → alias lokal di file domain itu.
 * Mengembalikan:
 *   { enumAlias:Map<sig,name>, sharedAliasDecls:[], sharedAliasNames:Set,
 *     domainAliasDecls:Map<domain,[]>, warnings:[] }
 */
function planEnumAliases(schemas, domainSchemas) {
	// schemaName → Set<domain> (schema tunggal bisa dipakai banyak domain).
	const schemaDomains = {};
	for (const [domain, set] of Object.entries(domainSchemas)) {
		for (const name of set) {
			schemaDomains[name] ??= new Set();
			schemaDomains[name].add(domain);
		}
	}

	// signature → { values, count, domains:Set } — sebaran & frekuensi tiap enum.
	const enums = new Map();
	for (const [sname, schema] of Object.entries(schemas)) {
		for (const prop of Object.values(schema.properties || {})) {
			if (!Array.isArray(prop.enum)) continue;
			const sig = enumSignature(prop.enum);
			if (!enums.has(sig)) enums.set(sig, { values: prop.enum, count: 0, domains: new Set() });
			const e = enums.get(sig);
			e.count++;
			for (const d of schemaDomains[sname] || []) e.domains.add(d);
		}
	}

	const enumAlias = new Map();
	const sharedAliasDecls = [];
	const sharedAliasNames = new Set();
	const domainAliasDecls = new Map(); // domain → [decl]
	const warnings = [];
	let autoCounter = 0;

	// Deterministik: yang paling sering dulu (stabil terhadap urutan objek spec).
	const repeated = [...enums.values()].filter((e) => e.count >= ENUM_DEDUP_THRESHOLD).sort((a, b) => b.count - a.count);

	for (const e of repeated) {
		const known = KNOWN_ENUMS.find((k) => k.detect(e.values));
		let name;
		let comment;
		if (known) {
			name = known.name;
			comment = known.comment;
		} else {
			autoCounter++;
			name = `Enum${autoCounter}`;
			comment = "";
			warnings.push(
				`Enum berulang (${e.count}×) tanpa nama di KNOWN_ENUMS → dialiaskan "${name}". Tambahkan entri detect di KNOWN_ENUMS agar namanya bermakna.`,
			);
		}
		enumAlias.set(enumSignature(e.values), name);
		const decl = buildEnumAliasDecl(name, e.values, comment);

		// Penempatan mengikuti kebijakan yang sama dengan schema (placementOf):
		// 1 domain → alias lokal; selain itu (lintas-domain / orphan) → _shared.
		if (placementOf(e.domains.size) === "local") {
			const domain = [...e.domains][0];
			if (!domainAliasDecls.has(domain)) domainAliasDecls.set(domain, []);
			domainAliasDecls.get(domain).push(decl);
		} else {
			sharedAliasDecls.push(decl);
			sharedAliasNames.add(name);
		}
	}

	return { enumAlias, sharedAliasDecls, sharedAliasNames, domainAliasDecls, warnings };
}

// ── Render: Plan → daftar file (string) ──────────────────────────────

/**
 * Ubah Plan menjadi daftar file { domain, filename, module, contents } — string saja,
 * tanpa I/O. Entri _shared punya domain: null, module: null.
 * File domain ditulis ke subfolder per module (mirror struktur docs/api/).
 */
function render(p) {
	const files = [{ domain: null, filename: `${SHARED_MODULE}.ts`, module: null, contents: renderSharedFile(p.shared, p.schemas) }];
	for (const d of p.domains) {
		files.push({ domain: d.domain, module: d.module, filename: `${d.domain}.ts`, contents: renderDomainFile(d, p.schemas, p.enumAlias, d.module) });
	}
	return files;
}

// ── Discover modules ─────────────────────────────────────────────────

/**
 * Sync file-file hasil generate ke src/types/ — copy per-file (hanya file di plan).
 * Tidak pernah rm -rf folder tujuan; file hand-written (_computed.ts, auth.ts, dll)
 * aman by construction karena tidak ada di daftar file.
 */
function syncToSrc(files) {
	console.log(`\n📋 Sync ke src/types/ ...`);
	for (const f of files) {
		const sourcePath = f.module
			? path.join(OUTPUT_DIR, f.module, f.filename)
			: path.join(OUTPUT_DIR, f.filename);
		const targetDir = f.module ? path.join(SRC_TYPES_DIR, f.module) : SRC_TYPES_DIR;
		const targetPath = path.join(targetDir, f.filename);

		if (!fs.existsSync(targetDir)) {
			fs.mkdirSync(targetDir, { recursive: true });
			const label = f.module ? `${f.module}/` : path.basename(SRC_TYPES_DIR);
			console.log(`   📁 Membuat folder ${label}`);
		}

		fs.copyFileSync(sourcePath, targetPath);
		console.log(`   📄 ${f.module ? f.module + "/" : ""}${f.filename}`);
	}

	// Format dengan Biome
	console.log(`\n🎨 Memformat src/types/ dengan Biome ...`);
	try {
		execSync(`npx @biomejs/biome format --write "${SRC_TYPES_DIR}"`, { stdio: "inherit" });
		console.log(`   Format selesai.`);
	} catch (e) {
		console.warn(`   ⚠️  Gagal format src/types/ dengan Biome: ${e.message}`);
	}
}

/** Temukan semua modul (folder dengan api.json) di direktori script ini. */
function discoverModules() {
	const entries = fs.readdirSync(__dirname, { withFileTypes: true });
	return entries
		.filter((e) => e.isDirectory())
		.filter((e) => fs.existsSync(path.join(__dirname, e.name, "api.json")))
		.map((e) => e.name)
		.sort();
}

// ── Main: shell tipis (baca semua modul - merge - plan - render - tulis) ──

function main() {
	try {
		const modules = discoverModules();
		if (modules.length === 0) {
			throw new Error(`Tidak ditemukan modul (folder dengan api.json) di ${__dirname}`);
		}

		console.log(`📖 Membaca ${modules.length} modul: ${modules.join(", ")}`);

		// Merge semua spec — deteksi konflik schema (Q4):
		// Nama sama + identik (deep-equal) → merge jadi 1 shared
		// Nama sama + berbeda → throw (fail keras)
		const mergedPaths = {};
		const mergedSchemas = {};
		const schemaSources = {}; // schemaName → module pertama
		for (const mod of modules) {
			const specPath = path.join(__dirname, mod, "api.json");
			const spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
			if (spec.paths) Object.assign(mergedPaths, spec.paths);
			if (spec.components?.schemas) {
				for (const [name, schema] of Object.entries(spec.components.schemas)) {
					if (mergedSchemas[name] !== undefined) {
						if (!deepEqual(mergedSchemas[name], schema)) {
							throw new Error(
								`${name}: konflik ${schemaSources[name]} vs ${mod} — bentuk berbeda. Periksa definisi schema di api.json masing-masing.`,
							);
						}
						// Identik → merge jadi 1 definisi shared
					} else {
						mergedSchemas[name] = schema;
						schemaSources[name] = mod;
					}
				}
			}
		}

		const mergedSpec = { paths: mergedPaths, components: { schemas: mergedSchemas } };

		// Baca module.json untuk tiap modul (collection/resource)
		const moduleTypes = {};
		for (const mod of modules) {
			const configPath = path.join(__dirname, mod, "module.json");
			if (!fs.existsSync(configPath)) {
				throw new Error(`Modul "${mod}" tidak memiliki module.json — buat docs/api/${mod}/module.json`);
			}
			const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
			if (config.type) moduleTypes[mod] = config.type;
		}

		const p = plan(mergedSpec, moduleTypes);

		for (const w of p.warnings) console.warn(`⚠️  ${w}`);

		const files = render(p);

		if (!fs.existsSync(OUTPUT_DIR)) {
			fs.mkdirSync(OUTPUT_DIR, { recursive: true });
			console.log(`📁 Membuat folder ${OUTPUT_DIR}`);
		}

		const domainCount = files.filter((f) => f.domain !== null).length;
		console.log(
			`\n🧩 ${SHARED_MODULE}.ts`.padEnd(24) +
				`(${p.stats.sharedCount} schema lintas-domain${p.stats.hasHttpStatus ? " + HttpStatusText" : ""})`,
		);
		console.log(`\n🧬 Meng-generate ${domainCount} module domain ...\n`);

		for (const f of files) {
			const dir = f.module ? path.join(OUTPUT_DIR, f.module) : OUTPUT_DIR;
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			fs.writeFileSync(path.join(dir, f.filename), f.contents, "utf-8");
			if (f.domain !== null) {
				const d = p.domains.find((x) => x.domain === f.domain);
				console.log(`  ✅ ${(f.module ? f.module + "/" : "") + f.filename.padEnd(28)} ${d.local.length} lokal, ${d.reExports.length} shared`);
			}
		}

		// Format output dengan Biome
		console.log(`\n🎨 Memformat output dengan Biome ...`);
		try {
			execSync(`npx @biomejs/biome format --write "${OUTPUT_DIR}"`, { stdio: "inherit" });
			console.log(`   Format selesai.`);
		} catch (e) {
			console.warn(`   ⚠️  Gagal format dengan Biome: ${e.message}`);
		}

		// Sync ke src/types/ (hanya file yang di-plan; file hand-written aman implisit)
		syncToSrc(files);

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
	module.exports = {
		plan,
		render,
		syncToSrc,
		schemaToDeclaration,
		schemaToTsType,
		renderEnumUnion,
		topoSort,
		domainOf,
		placementOf,
	};
}
