#!/usr/bin/env node
/**
 * fetch-spec.js — ambil spec OpenAPI live dari backend, lalu split ke
 * docs/api/{modul}/api.json per-modul (jalanan yang sama dengan regeneration
 * manual: prefix → modul, schema = transitive closure dari path modul itu).
 *
 * Setelah split, otomatis menjalankan extract-types.js (regenerate tipe TS).
 *
 * Cara pakai:
 *   node docs/api/fetch-spec.js                        # BACKEND_URL dari env (.env.local) atau default
 *   node docs/api/fetch-spec.js <url-spec-lengkap>     # ambil dari URL lain (mis. /v3/api-docs group)
 *
 * Env:
 *   BACKEND_URL  — base URL backend (default: http://192.168.1.211:8080)
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const DEFAULT_BACKEND_URL = "http://192.168.1.211:8080";
const SPEC_PATH = process.argv[2] || `${process.env.BACKEND_URL || DEFAULT_BACKEND_URL}/v3/api-docs`;

// Modul → prefix path (segmen pertama setelah "/"). admin → profil, account → auth.
const MODULE_PREFIXES = {
	auth: ["auth", "account"],
	cuti: ["cuti"],
	kepegawaian: ["kepegawaian"],
	laporanKepegawaian: ["laporan"],
	master: ["master"],
	pegawai: ["pegawai"],
	penggajian: ["penggajian"],
	profil: ["profil", "admin"],
	system: ["system"],
};

function collectRefs(node, acc = new Set()) {
	if (!node || typeof node !== "object") return acc;
	if (Array.isArray(node)) {
		for (const item of node) collectRefs(item, acc);
		return acc;
	}
	for (const [key, value] of Object.entries(node)) {
		if (key === "$ref" && typeof value === "string") {
			acc.add(value.replace(/^#\/components\/schemas\//, ""));
		} else {
			collectRefs(value, acc);
		}
	}
	return acc;
}

function schemaClosure(name, schemas, acc = new Set()) {
	if (acc.has(name) || !schemas[name]) return acc;
	acc.add(name);
	for (const ref of collectRefs(schemas[name])) {
		schemaClosure(ref, schemas, acc);
	}
	return acc;
}

async function main() {
	console.log(`📡 Fetch ${SPEC_PATH} ...`);
	const res = await fetch(SPEC_PATH);
	if (!res.ok) throw new Error(`Gagal fetch spec (${res.status}): ${SPEC_PATH}`);
	const spec = await res.json();
	const allSchemas = spec.components?.schemas || {};
	const securitySchemes = spec.components?.securitySchemes || {};

	for (const [mod, prefixes] of Object.entries(MODULE_PREFIXES)) {
		const paths = {};
		for (const [p, item] of Object.entries(spec.paths || {})) {
			const seg = p.replace(/^\//, "").split("/")[0];
			if (prefixes.includes(seg)) paths[p] = item;
		}
		const names = new Set();
		for (const p of Object.keys(paths)) {
			for (const ref of collectRefs(paths[p])) {
				for (const c of schemaClosure(ref, allSchemas)) names.add(c);
			}
		}
		const schemas = {};
		for (const n of [...names].sort()) schemas[n] = allSchemas[n];

		const out = {
			openapi: spec.openapi,
			info: spec.info,
			servers: spec.servers,
			security: spec.security,
			paths,
			components: { schemas, securitySchemes },
		};
		const target = path.join(__dirname, mod, "api.json");
		fs.writeFileSync(target, `${JSON.stringify(out, null, "\t")}\n`);
		console.log(`  ✅ ${target} (${Object.keys(paths).length} paths, ${names.size} schemas)`);
	}

	console.log("\n🎨 Format api.json dengan Biome ...");
	execSync(
		`npx @biomejs/biome format --write ${Object.keys(MODULE_PREFIXES)
			.map((m) => `"${path.join(__dirname, m, "api.json")}"`)
			.join(" ")}`,
		{
			stdio: "inherit",
		},
	);

	console.log("\n🧬 Regenerate tipe TS ...");
	execSync(`node ${path.join(__dirname, "extract-types.js")}`, { stdio: "inherit" });

	console.log("\nSelesai! 🎯");
}

main().catch((err) => {
	console.error(`\n❌ Gagal: ${err.message}`);
	process.exit(1);
});
