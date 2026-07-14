import { alasanBerhentiConfig } from "@/types/master/alasan-berhenti.config";
import { alatKerjaConfig } from "@/types/master/alat-kerja.config";
import { apdConfig } from "@/types/master/apd.config";
import { golonganConfig } from "@/types/master/golongan.config";
import { gradeConfig } from "@/types/master/grade.config";
import { hariLiburConfig } from "@/types/master/hari-libur.config";
import { jabatanConfig } from "@/types/master/jabatan.config";
import { jenisKeahlianConfig } from "@/types/master/jenis-keahlian.config";
import { jenisKitasConfig } from "@/types/master/jenis-kitas.config";
import { jenisPelatihanConfig } from "@/types/master/jenis-pelatihan.config";
import { jenisSpConfig } from "@/types/master/jenis-sp.config";
import { jenjangPendidikanConfig } from "@/types/master/jenjang-pendidikan.config";
import { levelConfig } from "@/types/master/level.config";
import { organisasiConfig } from "@/types/master/organisasi.config";
import { profesiConfig } from "@/types/master/profesi.config";
import { rumahDinasConfig } from "@/types/master/rumah-dinas.config";
import { sanksiConfig } from "@/types/master/sanksi.config";

export type { Page } from "@/lib/api/types";
export type { EntityConfig } from "@/types/master/_config-kit";

import type { EntityConfig } from "@/types/master/_config-kit";

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
