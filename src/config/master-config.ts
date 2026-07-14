import { alasanBerhentiConfig } from "@/config/master/alasan-berhenti.config";
import { alatKerjaConfig } from "@/config/master/alat-kerja.config";
import { apdConfig } from "@/config/master/apd.config";
import { golonganConfig } from "@/config/master/golongan.config";
import { gradeConfig } from "@/config/master/grade.config";
import { hariLiburConfig } from "@/config/master/hari-libur.config";
import { jabatanConfig } from "@/config/master/jabatan.config";
import { jenisKeahlianConfig } from "@/config/master/jenis-keahlian.config";
import { jenisKitasConfig } from "@/config/master/jenis-kitas.config";
import { jenisPelatihanConfig } from "@/config/master/jenis-pelatihan.config";
import { jenisSpConfig } from "@/config/master/jenis-sp.config";
import { jenjangPendidikanConfig } from "@/config/master/jenjang-pendidikan.config";
import { levelConfig } from "@/config/master/level.config";
import { organisasiConfig } from "@/config/master/organisasi.config";
import { profesiConfig } from "@/config/master/profesi.config";
import { rumahDinasConfig } from "@/config/master/rumah-dinas.config";
import { sanksiConfig } from "@/config/master/sanksi.config";

export type { EntityConfig } from "@/config/master/_config-kit";
export type { Page } from "@/lib/api/types";

import type { EntityConfig } from "@/config/master/_config-kit";

// Map heterogen: tiap entity punya TQuery berbeda. Karena TQuery hanya muncul di posisi
// kontravarian (`cell` param), `EntityConfig<never>` adalah supertype dari semua EntityConfig<T>.
// Consumer meng-cast ke tipe konkret via `as unknown` (master-client.tsx).
export const MASTER_ENTITY_CONFIGS: Record<string, EntityConfig<never>> = {
	golongan: golonganConfig,
	level: levelConfig,
	"jenjang-pendidikan": jenjangPendidikanConfig,
	"jenis-keahlian": jenisKeahlianConfig,
	"jenis-pelatihan": jenisPelatihanConfig,
	"jenis-kitas": jenisKitasConfig,
	"jenis-sp": jenisSpConfig,
	"alasan-berhenti": alasanBerhentiConfig,
	"hari-libur": hariLiburConfig,
	"rumah-dinas": rumahDinasConfig,
	organisasi: organisasiConfig,
	jabatan: jabatanConfig,
	grade: gradeConfig,
	apd: apdConfig,
	"alat-kerja": alatKerjaConfig,
	sanksi: sanksiConfig,
	profesi: profesiConfig,
};
