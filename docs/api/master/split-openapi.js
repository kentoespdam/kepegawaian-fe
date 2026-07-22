#!/usr/bin/env node
/**
 * split-openapi.js
 *
 * Memecah file OpenAPI master.json menjadi per-endpoint per file.
 * Setiap file berisi metadata root + 1 path + seluruh components/schemas
 * yang dirujuk oleh path tersebut.
 *
 * Cara pakai:
 *   node split-openapi.js
 *
 * Output: folder ./endpoints/ dengan satu file JSON per path.
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const INPUT_FILE = path.join(__dirname, "api.json");
const OUTPUT_DIR = path.join(__dirname, "endpoints");

// ── Utility ──────────────────────────────────────────────────────────

/**
 * Sanitasi path endpoint jadi nama file yang aman.
 * Contoh:
 *   /master/sanksi          → sanksi
 *   /master/sanksi/{id}     → sanksi-by-id
 *   /master/level/batch     → level-batch
 *   /master/jabatan/{id}/parent → jabatan-by-id-parent
 *   /master/sanksi/{id}/jenis-sp → sanksi-by-id-jenis-sp
 */
function pathToFilename(endpointPath) {
	// Hapus prefix /master/
	let name = endpointPath.replace(/^\/master\//, "");
	// Ganti {pathParam} dengan by-(namaParam)
	name = name.replace(/\{(\w+)\}/g, "by-$1");
	// Ganti slash dengan dash
	name = name.replace(/\//g, "-");
	return name;
}

/**
 * Kumpulkan semua $ref ke components/schemas yang muncul di sebuah path entry.
 */
function collectSchemaRefs(pathEntry, refs = new Set()) {
	if (!pathEntry || typeof pathEntry !== "object") return refs;

	if (Array.isArray(pathEntry)) {
		for (const item of pathEntry) {
			collectSchemaRefs(item, refs);
		}
		return refs;
	}

	for (const [key, value] of Object.entries(pathEntry)) {
		if (key === "$ref" && typeof value === "string" && value.startsWith("#/components/schemas/")) {
			refs.add(value.replace("#/components/schemas/", ""));
		} else {
			collectSchemaRefs(value, refs);
		}
	}

	return refs;
}

/**
 * Resolve dependensi skema secara rekursif (termasuk nested $ref di
 * properties, items, allOf, oneOf, anyOf — di-handle oleh collectSchemaRefs).
 */
function resolveSchemaDeps(schemaName, allSchemas, resolved) {
	if (resolved.has(schemaName)) return resolved;
	resolved.add(schemaName);

	const schema = allSchemas[schemaName];
	if (!schema) return resolved;

	const nestedRefs = collectSchemaRefs(schema);
	for (const ref of nestedRefs) {
		resolveSchemaDeps(ref, allSchemas, resolved);
	}

	return resolved;
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
	try {
		// 1. Baca file
		console.log(`📖 Membaca ${INPUT_FILE} ...`);
		const raw = fs.readFileSync(INPUT_FILE, "utf-8");
		const spec = JSON.parse(raw);

		const { openapi, info, servers, security, paths, components } = spec;
		const allSchemas = components?.schemas || {};
		const allSecuritySchemes = components?.securitySchemes || {};

		// 2. Buat folder output
		if (!fs.existsSync(OUTPUT_DIR)) {
			fs.mkdirSync(OUTPUT_DIR, { recursive: true });
			console.log(`📁 Membuat folder ${OUTPUT_DIR}`);
		}

		// 3. Loop setiap path
		const pathKeys = Object.keys(paths).sort();
		console.log(`🔀 Memecah ${pathKeys.length} endpoint ke ${OUTPUT_DIR}/ ...\n`);

		for (const endpointPath of pathKeys) {
			const pathEntry = paths[endpointPath];

			// Kumpulkan schema refs
			const referencedSchemas = collectSchemaRefs(pathEntry);

			// Resolve dependensi skema (nested $ref)
			const allNeededSchemas = new Set();
			for (const schemaName of referencedSchemas) {
				resolveSchemaDeps(schemaName, allSchemas, allNeededSchemas);
			}

			// Bangun partial spec
			const partialSpec = {
				openapi,
				info,
				servers,
				security,
				paths: {
					[endpointPath]: pathEntry,
				},
				components: {
					schemas: {},
					securitySchemes: allSecuritySchemes,
				},
			};

			// Masukkan skema yang dibutuhkan
			for (const schemaName of allNeededSchemas) {
				if (allSchemas[schemaName]) {
					partialSpec.components.schemas[schemaName] = allSchemas[schemaName];
				}
			}

			// Nama file
			const filename = `${pathToFilename(endpointPath)}.json`;
			const outputPath = path.join(OUTPUT_DIR, filename);

			fs.writeFileSync(outputPath, JSON.stringify(partialSpec, null, 2), "utf-8");
			console.log(`  ✅ ${filename.padEnd(40)} ← ${endpointPath}`);
		}

		// 4. Format dengan Biome
		console.log(`\n🎨 Memformat output dengan Biome ...`);
		try {
			execSync(`npx @biomejs/biome format --write "${OUTPUT_DIR}"`, { stdio: "inherit" });
			console.log(`   Format selesai.`);
		} catch (e) {
			console.warn(`   ⚠️  Gagal format dengan Biome: ${e.message}`);
		}

		// 5. Summary
		console.log(`\n📊 Ringkasan:`);
		console.log(`   Total endpoint : ${pathKeys.length}`);
		console.log(`   Output folder  : ${OUTPUT_DIR}/`);
		console.log(`   Total skema    : ${Object.keys(allSchemas).length}`);
		console.log(`   Selesai! 🎯`);
	} catch (err) {
		console.error(`\n❌ Gagal memproses: ${err.message}`);
		process.exit(1);
	}
}

main();
