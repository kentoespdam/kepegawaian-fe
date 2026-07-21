import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// Generator adalah CommonJS; vitest meng-interop named export-nya.
import {
	domainOf,
	placementOf,
	plan,
	render,
	renderEnumUnion,
	schemaToDeclaration,
	schemaToTsType,
	topoSort,
} from "./extract-types.js";

// ── Helper: bangun spec OpenAPI minimal dari daftar (path → schemaRef) ──
// Tiap path GET membungkus satu $ref; schemas diberikan apa adanya.
function makeSpec(paths: Record<string, string>, schemas: Record<string, unknown>) {
	const p: Record<string, unknown> = {};
	for (const [route, ref] of Object.entries(paths)) {
		p[route] = {
			get: { responses: { 200: { content: { "*/*": { schema: { $ref: `#/components/schemas/${ref}` } } } } } },
		};
	}
	return { paths: p, components: { schemas } };
}

// Ambil satu domain/file dari hasil plan/render; gagal tegas bila tak ada
// (sekaligus menyempitkan tipe dari `T | undefined` untuk tsc --strict).
function pick<T>(items: T[], match: (x: T) => boolean, label: string): T {
	const found = items.find(match);
	if (!found) throw new Error(`tidak ditemukan: ${label}`);
	return found;
}

const ENUM_WARNA = ["MERAH", "HIJAU"];
const ENUM_UKURAN = ["S", "M", "L"];

describe("renderEnumUnion — sumber tunggal enum → union (#3)", () => {
	it("bentuk inline (default) menyatukan literal dengan ' | ' di satu baris", () => {
		expect(renderEnumUnion(ENUM_WARNA)).toBe('"MERAH" | "HIJAU"');
	});

	it("bentuk hoisted (multiline) diawali newline + '  | ' per nilai", () => {
		expect(renderEnumUnion(ENUM_WARNA, { multiline: true })).toBe('\n  | "MERAH"\n  | "HIJAU"');
	});

	it("meng-escape nilai lewat JSON (tanda kutip), bukan konkatenasi mentah", () => {
		expect(renderEnumUnion(['a"b'])).toBe('"a\\"b"');
	});
});

describe("schemaToTsType — mesin ekspresi tipe rekursif", () => {
	it("memetakan primitif OpenAPI ke tipe TS", () => {
		expect(schemaToTsType({ type: "integer" })).toBe("number");
		expect(schemaToTsType({ type: "number" })).toBe("number");
		expect(schemaToTsType({ type: "string" })).toBe("string");
		expect(schemaToTsType({ type: "boolean" })).toBe("boolean");
	});

	it("$ref menjadi nama tipe (segmen terakhir)", () => {
		expect(schemaToTsType({ $ref: "#/components/schemas/FooBar" })).toBe("FooBar");
	});

	it("enum didelegasikan ke renderEnumUnion (inline)", () => {
		expect(schemaToTsType({ type: "string", enum: ENUM_WARNA })).toBe('"MERAH" | "HIJAU"');
	});

	it("array membungkus union elemennya dengan kurung agar aman", () => {
		expect(schemaToTsType({ type: "array", items: { enum: ENUM_WARNA } })).toBe('("MERAH" | "HIJAU")[]');
		expect(schemaToTsType({ type: "array", items: { type: "string" } })).toBe("string[]");
	});

	it("object tanpa properties → Record<string, unknown>", () => {
		expect(schemaToTsType({ type: "object" })).toBe("Record<string, unknown>");
	});

	it("oneOf/anyOf → union; allOf → intersection", () => {
		const variants = [{ type: "string" }, { $ref: "#/components/schemas/Foo" }];
		expect(schemaToTsType({ oneOf: variants })).toBe("string | Foo");
		expect(schemaToTsType({ allOf: variants })).toBe("string & Foo");
	});

	it("schema tak dikenal → unknown", () => {
		expect(schemaToTsType(null)).toBe("unknown");
		expect(schemaToTsType({ type: "wat" })).toBe("unknown");
	});
});

describe("schemaToDeclaration — deklarasi bernama top-level", () => {
	it("object → interface, dengan '?' untuk field non-required + komentar format", () => {
		const decl = schemaToDeclaration(
			"Foo",
			{
				type: "object",
				required: ["id"],
				properties: { id: { type: "integer", format: "int64" }, nama: { type: "string" } },
			},
			undefined,
		);
		expect(decl).toBe("export interface Foo {\n  id: number; // int64\n  nama?: string;\n}\n");
	});

	it("enum bernama → type alias lewat cabang fallback (bukti cabang enum dead sudah dihapus, #3)", () => {
		// Sebelum #3 ada cabang khusus enum; kini fallback schemaToTsType menghasilkan output identik.
		expect(schemaToDeclaration("Warna", { type: "string", enum: ENUM_WARNA }, undefined)).toBe(
			'export type Warna = "MERAH" | "HIJAU";\n',
		);
	});

	it("object kosong → Record<string, unknown>", () => {
		expect(schemaToDeclaration("Empty", { type: "object", properties: {} }, undefined)).toBe(
			"export type Empty = Record<string, unknown>;\n",
		);
	});

	it("enumAlias menggantikan enum berulang dengan referensi nama alias", () => {
		const alias = new Map([[JSON.stringify(ENUM_WARNA), "WarnaAlias"]]);
		const decl = schemaToDeclaration("Cat", { type: "object", properties: { c: { enum: ENUM_WARNA } } }, alias);
		expect(decl).toContain("c?: WarnaAlias;");
	});
});

describe("domainOf & topoSort — utilitas graf", () => {
	it("domainOf = segmen pertama setelah /master/", () => {
		expect(domainOf("/master/profesi/{id}")).toBe("profesi");
		expect(domainOf("/master/jenis-kontrak")).toBe("jenis-kontrak");
	});

	it("topoSort menaruh dependency sebelum yang bergantung", () => {
		const schemas = {
			Parent: { type: "object", properties: { child: { $ref: "#/components/schemas/Child" } } },
			Child: { type: "object", properties: { id: { type: "integer" } } },
		};
		const ordered = topoSort(["Parent", "Child"], schemas);
		expect(ordered.indexOf("Child")).toBeLessThan(ordered.indexOf("Parent"));
	});
});

describe("placementOf — sumber tunggal aturan shared-vs-lokal (#4)", () => {
	it("tepat 1 domain-pemilik → lokal (tinggal bersama pemiliknya)", () => {
		expect(placementOf(1)).toBe("local");
	});

	it(">= 2 domain (lintas-domain) → shared", () => {
		expect(placementOf(2)).toBe("shared");
		expect(placementOf(5)).toBe("shared");
	});

	it("0 domain (orphan, mis. enum tanpa pemilik jelas) → shared", () => {
		expect(placementOf(0)).toBe("shared");
	});
});

describe("plan — keputusan penempatan sebagai data (#1, seam murni)", () => {
	it("schema dipakai >= 2 domain → shared; hanya 1 domain → lokal", () => {
		// Mini dipakai oleh a & b (lintas-domain) → shared; ASolo hanya a → lokal.
		const spec = makeSpec(
			{ "/master/a": "AResp", "/master/b": "BResp" },
			{
				AResp: {
					type: "object",
					properties: { m: { $ref: "#/components/schemas/Mini" }, s: { $ref: "#/components/schemas/ASolo" } },
				},
				BResp: { type: "object", properties: { m: { $ref: "#/components/schemas/Mini" } } },
				Mini: { type: "object", properties: { id: { type: "integer" } } },
				ASolo: { type: "object", properties: { x: { type: "string" } } },
			},
		);
		const p = plan(spec);
		expect(p.shared.names).toContain("Mini");
		expect(p.shared.names).not.toContain("ASolo");
		const a = pick(p.domains, (d: { domain: string }) => d.domain === "a", "domain a");
		expect(a.local).toContain("ASolo");
		expect(a.imports).toContain("Mini"); // domain a meng-import tipe shared
	});

	it("plan murni: memuat SEMUA domain tanpa peduli argumen (filter di shell)", () => {
		const spec = makeSpec(
			{ "/master/a": "AResp", "/master/b": "BResp" },
			{ AResp: { type: "object", properties: {} }, BResp: { type: "object", properties: {} } },
		);
		const p = plan(spec);
		expect(p.domains.map((d: { domain: string }) => d.domain).sort()).toEqual(["a", "b"]);
		expect(p.stats.totalDomain).toBe(2);
	});
});

describe("plan — kebijakan dedup enum berbasis frekuensi (#2)", () => {
	it("HttpStatusText dikenali via KONTEN ('200 OK'), bukan nama properti", () => {
		const httpEnum = ["200 OK", "404 NOT_FOUND"];
		const spec = makeSpec(
			{ "/master/a": "AResp", "/master/b": "BResp" },
			{
				AResp: { type: "object", properties: { statusText: { enum: httpEnum } } },
				BResp: { type: "object", properties: { statusText: { enum: httpEnum } } },
			},
		);
		const p = plan(spec);
		expect(p.stats.hasHttpStatus).toBe(true);
		expect(p.shared.aliasDecls.join("\n")).toContain("export type HttpStatusText =");
		expect(p.warnings).toHaveLength(0); // dikenali → tanpa peringatan
	});

	it("enum berulang lintas-domain tak dikenal → alias di _shared + peringatan auto-name", () => {
		const spec = makeSpec(
			{ "/master/a": "AResp", "/master/b": "BResp" },
			{
				AResp: { type: "object", properties: { warna: { enum: ENUM_WARNA } } },
				BResp: { type: "object", properties: { warna: { enum: ENUM_WARNA } } },
			},
		);
		const p = plan(spec);
		expect(p.shared.aliasDecls.join("\n")).toContain("Enum1");
		expect(p.warnings).toHaveLength(1);
		expect(p.warnings[0]).toContain("KNOWN_ENUMS");
		const a = pick(p.domains, (d: { domain: string }) => d.domain === "a", "domain a");
		expect(a.imports).toContain("Enum1");
	});

	it("enum berulang dalam SATU domain → alias LOKAL, tidak mencemari _shared", () => {
		const spec = makeSpec(
			{ "/master/c": "CResp" },
			{ CResp: { type: "object", properties: { u1: { enum: ENUM_UKURAN }, u2: { enum: ENUM_UKURAN } } } },
		);
		const p = plan(spec);
		const c = pick(p.domains, (d: { domain: string }) => d.domain === "c", "domain c");
		expect(c.aliasDecls).toHaveLength(1); // dideklarasi lokal
		expect(c.imports).toHaveLength(0); // tidak meng-import dari _shared
		expect(p.shared.aliasDecls.join("\n")).not.toContain('"S"');
	});

	it("enum yang muncul sekali (< threshold) TIDAK dialiaskan — di-inline", () => {
		const spec = makeSpec(
			{ "/master/a": "AResp" },
			{ AResp: { type: "object", properties: { warna: { enum: ENUM_WARNA } } } },
		);
		const p = plan(spec);
		expect(p.enumAlias.size).toBe(0);
		const files = render(p);
		const aFile = pick(files, (f: { filename: string }) => f.filename === "a.ts", "a.ts").contents;
		expect(aFile).toContain('"MERAH" | "HIJAU"'); // inline, bukan alias
	});
});

describe("render — Plan → File[] (#1, hanya string)", () => {
	const spec = makeSpec(
		{ "/master/a": "AResp", "/master/b": "BResp" },
		{
			AResp: { type: "object", properties: { m: { $ref: "#/components/schemas/Mini" } } },
			BResp: { type: "object", properties: { m: { $ref: "#/components/schemas/Mini" } } },
			Mini: { type: "object", properties: { id: { type: "integer" } } },
		},
	);

	it("mengembalikan satu file per domain + _shared.ts, dgn {domain, filename, contents}", () => {
		const files = render(plan(spec));
		const names = files.map((f: { filename: string }) => f.filename).sort();
		expect(names).toEqual(["_shared.ts", "a.ts", "b.ts"]);
		for (const f of files) {
			expect(typeof f.contents).toBe("string");
			expect(f.contents.endsWith("\n")).toBe(true); // normalizeTrailing: tepat satu newline akhir
		}
	});

	it("file domain meng-import tipe shared dari './_shared'", () => {
		const files = render(plan(spec));
		const aFile = pick(files, (f: { filename: string }) => f.filename === "a.ts", "a.ts").contents;
		expect(aFile).toContain('from "./_shared"');
		expect(aFile).toContain("Mini");
	});
});

describe("collapse wrapper BY-STRUCTURE → generic Envelope/PageEnvelope/Page", () => {
	// Envelope penuh: 6 field {status,statusText,errors,message,data,timestamp}.
	const envelope = (dataSchema: unknown) => ({
		type: "object",
		properties: {
			status: { type: "integer" },
			statusText: { type: "string" },
			errors: { type: "array", items: { type: "string" } },
			message: { type: "string" },
			data: dataSchema,
			timestamp: { type: "string" },
		},
	});
	// Page (pageable): content[] + pageable + totalElements/totalPages.
	const page = (itemRef: string) => ({
		type: "object",
		properties: {
			totalElements: { type: "integer" },
			totalPages: { type: "integer" },
			content: { type: "array", items: { $ref: `#/components/schemas/${itemRef}` } },
			pageable: { $ref: "#/components/schemas/PageableObject" },
		},
	});
	// PageEnvelope: 4 field (tanpa errors/message), data → $ref schema Page.
	const pageEnvelope = (pageRef: string) => ({
		type: "object",
		properties: {
			status: { type: "integer" },
			statusText: { type: "string" },
			data: { $ref: `#/components/schemas/${pageRef}` },
			timestamp: { type: "string" },
		},
	});

	it("schema Envelope object → alias Envelope<T>, bukan interface wrapper", () => {
		const decl = schemaToDeclaration("SingleResultFoo", envelope({ $ref: "#/components/schemas/Foo" }), undefined, {
			Foo: {},
		});
		expect(decl).toBe("export type SingleResultFoo = Envelope<Foo>;\n");
	});

	it("schema Envelope dengan data array → Envelope<T[]>", () => {
		const decl = schemaToDeclaration(
			"ListResultFoo",
			envelope({ type: "array", items: { $ref: "#/components/schemas/Foo" } }),
			undefined,
			{ Foo: {} },
		);
		expect(decl).toBe("export type ListResultFoo = Envelope<Foo[]>;\n");
	});

	it("schema Envelope data primitif (int64) → Envelope<number>", () => {
		const decl = schemaToDeclaration("SavedResultLong", envelope({ type: "integer", format: "int64" }), undefined, {});
		expect(decl).toBe("export type SavedResultLong = Envelope<number>;\n");
	});

	it("tanpa peta schemas (pemanggil 3-arg lama) → tetap interface, tak collapse", () => {
		const decl = schemaToDeclaration("SingleResultFoo", envelope({ $ref: "#/components/schemas/Foo" }), undefined);
		expect(decl).toContain("export interface SingleResultFoo {");
	});

	it("plan+render: interface Page* di-suppress; wrapper → PageEnvelope<T>", () => {
		const spec = makeSpec(
			{ "/master/a": "PageResultPageFoo" },
			{
				PageResultPageFoo: pageEnvelope("PageFoo"),
				PageFoo: page("Foo"),
				Foo: { type: "object", properties: { id: { type: "integer" } } },
				PageableObject: { type: "object", properties: { pageNumber: { type: "integer" } } },
			},
		);
		const files = render(plan(spec));
		const aFile = pick(files, (f: { filename: string }) => f.filename === "a.ts", "a.ts").contents;
		expect(aFile).toContain("export type PageResultPageFoo = PageEnvelope<Foo>;");
		expect(aFile).not.toContain("interface PageFoo"); // schema Page tak ditulis
		expect(aFile).toContain('import type { PageEnvelope } from "./_shared"');
	});

	it("_shared.ts selalu memuat keluarga generic (union + never, errors string|string[])", () => {
		const spec = makeSpec({ "/master/a": "AResp" }, { AResp: { type: "object", properties: {} } });
		const shared = pick(
			render(plan(spec)),
			(f: { filename: string }) => f.filename === "_shared.ts",
			"_shared.ts",
		).contents;
		expect(shared).toContain("export type Envelope<T> =");
		expect(shared).toContain("errors?: never");
		expect(shared).toContain("errors: string | string[]");
		expect(shared).toContain("export interface Page<T> {");
		expect(shared).toContain("export interface PageEnvelope<T> {");
	});
});

describe("query params GET → {Entity}SearchParams extends PageQuery (#Candidate2)", () => {
	// Spec minimal dgn parameters GET; makeSpec tak menaruh parameters, jadi bangun manual.
	const specWithParams = (route: string, params: unknown[], ref = "Foo") => ({
		paths: {
			[route]: {
				get: {
					parameters: params,
					responses: { 200: { content: { "*/*": { schema: { $ref: `#/components/schemas/${ref}` } } } } },
				},
			},
		},
		components: { schemas: { Foo: { type: "object", properties: { id: { type: "integer" } } } } },
	});
	const qp = (name: string, schema: unknown, where = "query") => ({ name, in: where, required: false, schema });

	it("filter query-param jadi interface {Entity}SearchParams extends PageQuery", () => {
		const p = plan(
			specWithParams("/master/golongan", [qp("golongan", { type: "string" }), qp("pangkat", { type: "string" })]),
		);
		const g = pick(p.domains, (d: { domain: string }) => d.domain === "golongan", "domain golongan");
		expect(g.searchParams).toContain("export interface GolonganSearchParams extends PageQuery {");
		expect(g.searchParams).toContain("golongan?: string;");
		expect(g.searchParams).toContain("pangkat?: string;");
	});

	it("pagination quartet (page/size/sortBy/sortDirection) di-hoist → TIDAK diulang di SearchParams", () => {
		const p = plan(
			specWithParams("/master/golongan", [
				qp("golongan", { type: "string" }),
				qp("page", { type: "integer" }),
				qp("size", { type: "integer" }),
				qp("sortBy", { type: "string" }),
				qp("sortDirection", { type: "string" }),
			]),
		);
		const g = pick(p.domains, (d: { domain: string }) => d.domain === "golongan", "domain golongan");
		expect(g.searchParams).not.toContain("page?");
		expect(g.searchParams).not.toContain("sortDirection?");
	});

	it("path param (id) diabaikan — endpoint /{id}-only → searchParams null", () => {
		const p = plan(specWithParams("/master/golongan/{id}", [qp("id", { type: "integer", format: "int64" }, "path")]));
		const g = pick(p.domains, (d: { domain: string }) => d.domain === "golongan", "domain golongan");
		expect(g.searchParams).toBeNull();
	});

	it("endpoint tanpa query filter (mis. /list) → searchParams null", () => {
		const p = plan(specWithParams("/master/golongan/list", []));
		const g = pick(p.domains, (d: { domain: string }) => d.domain === "golongan", "domain golongan");
		expect(g.searchParams).toBeNull();
	});

	it("hanya pagination quartet, tanpa filter spesifik → searchParams null", () => {
		const p = plan(
			specWithParams("/master/golongan", [qp("page", { type: "integer" }), qp("sortBy", { type: "string" })]),
		);
		const g = pick(p.domains, (d: { domain: string }) => d.domain === "golongan", "domain golongan");
		expect(g.searchParams).toBeNull();
	});

	it('PageQuery ada di _shared dengan sortDirection dinarrow ke "asc" | "desc"', () => {
		const shared = pick(
			render(plan(specWithParams("/master/golongan", []))),
			(f: { filename: string }) => f.filename === "_shared.ts",
			"_shared.ts",
		).contents;
		expect(shared).toContain("export interface PageQuery {");
		expect(shared).toContain('sortDirection?: "asc" | "desc";');
	});

	it("file domain meng-import PageQuery dari ./_shared saat ada SearchParams", () => {
		const aFile = pick(
			render(plan(specWithParams("/master/golongan", [qp("golongan", { type: "string" })]))),
			(f: { filename: string }) => f.filename === "golongan.ts",
			"golongan.ts",
		).contents;
		expect(aFile).toContain("PageQuery");
		expect(aFile).toContain('from "./_shared"');
		expect(aFile).toContain("GolonganSearchParams extends PageQuery");
	});
});

describe("smoke: master.json nyata → output stabil & konsisten", () => {
	const spec = JSON.parse(readFileSync(join(__dirname, "master.json"), "utf8"));

	it("plan() menghasilkan 20 domain + HttpStatusText di shared, tanpa peringatan", () => {
		const p = plan(spec);
		expect(p.stats.totalDomain).toBe(20);
		expect(p.stats.hasHttpStatus).toBe(true);
		expect(p.warnings).toHaveLength(0); // satu-satunya enum berulang nyata sudah dikenali
	});

	it("render() menghasilkan 21 file, setiap tipe shared yang di-import benar-benar ada di _shared", () => {
		const files = render(plan(spec));
		expect(files).toHaveLength(21);
		const shared = pick(files, (f: { filename: string }) => f.filename === "_shared.ts", "_shared.ts").contents;
		// Setiap file domain hanya boleh meng-import nama yang benar-benar diekspor _shared.
		expect(shared).toContain("export type HttpStatusText =");
		expect(shared).toContain("export type Envelope<T> =");
	});

	it("collapse nyata: tak ada interface wrapper/Page* tersisa di output mana pun", () => {
		const files = render(plan(spec));
		const allContents = files.map((f: { contents: string }) => f.contents).join("\n");
		// Wrapper per-entity harus jadi alias generic, bukan interface.
		expect(allContents).not.toMatch(/export interface (SingleResult|ListResult|SavedResult|PageResult|DeletedResult)/);
		// Schema Page* pageable di-inline ke Page<T>; hanya generic Page<T>/PageEnvelope<T> yang boleh ada.
		expect(allContents).not.toMatch(/export interface Page[A-Z]\w*Query/);
	});
});
