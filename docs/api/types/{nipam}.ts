/**
 * {nipam} — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : GET /pegawai/{nipam}/nipam
 */

import type { Envelope, PegawaiResponse } from "./_shared";

export type SingleResultPegawaiResponse = Envelope<PegawaiResponse>;

export type { Biodata, Golongan, Grade, Jabatan, KodePajak, Organisasi, PegawaiResponse, Profesi } from "./_shared";
