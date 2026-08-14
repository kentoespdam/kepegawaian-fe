#!/usr/bin/env bash
# Verifikasi fix end-to-end: dashboard response → valueFromLabel (fixed) → payload → PATCH.
# Jalur deserialisasi PATCH /admin/profil/{nik} == PATCH /profil (Jackson enum → label mentah = 400).
set -u
B=http://192.168.1.211:8080
NIK=3302120108880003

DASH=$(curl -s --max-time 5 "$B/profil/biodata/$NIK/dashboard")
echo "$DASH" | python3 -c "import sys,json; d=json.load(sys.stdin)['data']; print('dashboard jenisKelamin =', repr(d['jenisKelamin']), '| agama =', repr(d['agama']), '| statusKawin =', repr(d['statusKawin']))"

echo "== payload dibangun persis handleEditSubmit, tapi valueFromLabel sudah fixed =="
PAYLOAD=$(echo "$DASH" | NIK="$NIK" bun -e '
const raw = await (await fetch("data:application/json," + encodeURIComponent(require("fs").readFileSync(0, "utf8")))).json().catch(() => null);
' 2>/dev/null || true)

# baca dashboard via stdin → build payload dengan valueFromLabel fixed
PAYLOAD=$(echo "$DASH" | NIK="$NIK" bun -e '
import { valueFromLabel } from "./src/lib/enums.ts";
import { ENUMS } from "./src/lib/enums.ts";
let s = "";
process.stdin.on("data", (c) => (s += c));
process.stdin.on("end", () => {
	const d = JSON.parse(s).data;
	// persis defaultValues di section-left-panel.tsx
	const defaults = {
		nama: d.nama,
		jenisKelamin: valueFromLabel(d.jenisKelamin, ENUMS.jenisKelamin),
		agama: valueFromLabel(d.agama, ENUMS.agama),
		statusKawin: valueFromLabel(d.statusKawin, ENUMS.statusKawin),
		tempatLahir: d.tempatLahir,
		tanggalLahir: d.tanggalLahir,
		ibuKandung: d.ibuKandung,
		telp: d.noTelp,
		alamat: d.alamat,
	};
	// persis handleEditSubmit: buang kosong/undefined, kecuali nik
	const payload = {};
	for (const [k, v] of Object.entries(defaults)) {
		if (k === "nik") continue;
		if (v === "" || v === undefined || v === null) continue;
		payload[k] = v;
	}
	console.log(JSON.stringify(payload));
});
')

echo "payload = $PAYLOAD"
echo
echo "== PATCH /admin/profil/\$NIK =="
curl -s -i --max-time 5 -X PATCH "$B/admin/profil/$NIK" -H "Content-Type: application/json" -d "$PAYLOAD" | sed -n '1p;/^$/,$p' | head -12
