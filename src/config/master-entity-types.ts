/**
 * master-entity-types — Type-level entity name → TItem / TPage / TReq map
 *
 * Satu-satunya tempat yang memetakan nama entitas string ke tipe
 * entity item (untuk EntityConfig / columns), paginated response
 * (untuk useResource.list), dan request body (untuk create/update).
 *
 * Dipakai oleh MasterPageClient untuk inferensi tipe dari literal prop `entity`.
 */
import type { Page } from "@/lib/api/types";
import type {
	AlasanBerhentiListResponse,
	AlasanBerhentiPostRequest,
	AlasanBerhentiQuery,
} from "@/types/master/alasan-berhenti";
import type { AlatKerjaPostRequest, AlatKerjaQuery } from "@/types/master/alat-kerja";
import type { ApdPostRequest, ApdQuery } from "@/types/master/apd";
import type { GolonganListResponse, GolonganPostRequest, GolonganQuery } from "@/types/master/golongan";
import type { GradeListResponse, GradePostRequest, GradeQuery } from "@/types/master/grade";
import type { HariLiburListResponse, HariLiburPostRequest, HariLiburQuery } from "@/types/master/hari-libur";
import type { JabatanListResponse, JabatanPostRequest, JabatanQuery } from "@/types/master/jabatan";
import type {
	JenisKeahlianListResponse,
	JenisKeahlianPostRequest,
	JenisKeahlianQuery,
} from "@/types/master/jenis-keahlian";
import type { JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery } from "@/types/master/jenis-kitas";
import type {
	JenisPelatihanListResponse,
	JenisPelatihanPostRequest,
	JenisPelatihanQuery,
} from "@/types/master/jenis-pelatihan";
import type { JenisSpListResponse, JenisSpPostRequest, JenisSpQuery } from "@/types/master/jenis-sp";
import type { JenjangPendidikanPostRequest, JenjangPendidikanResponse } from "@/types/master/jenjang-pendidikan";
import type { LevelPostRequest, LevelResponse } from "@/types/master/level";
import type { OrganisasiListResponse, OrganisasiPostRequest, OrganisasiQuery } from "@/types/master/organisasi";
import type { ProfesiListResponse, ProfesiPostRequest, ProfesiQuery } from "@/types/master/profesi";
import type { RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery } from "@/types/master/rumah-dinas";
import type { SanksiPostRequest, SanksiQuery } from "@/types/master/sanksi";

/**
 * Map nama entitas → tipe konkret.
 *
 * - TItem  = tipe satu baris di tabel (dipakai EntityConfig.columns)
 * - TPage  = tipe response paginated (dipakai useResource.list)
 * - TReq   = tipe request body (dipakai create/update)
 * - TList  = tipe response listAll (dipakai tree / FK dropdown)
 */
export interface MasterEntityTypes {
	golongan: {
		TItem: GolonganQuery;
		TPage: Page<GolonganQuery>;
		TReq: GolonganPostRequest;
		TList: GolonganListResponse[];
	};
	level: { TItem: LevelResponse; TPage: Page<LevelResponse>; TReq: LevelPostRequest; TList: LevelResponse[] };
	"jenjang-pendidikan": {
		TItem: JenjangPendidikanResponse;
		TPage: Page<JenjangPendidikanResponse>;
		TReq: JenjangPendidikanPostRequest;
		TList: JenjangPendidikanResponse[];
	};
	"jenis-keahlian": {
		TItem: JenisKeahlianQuery;
		TPage: Page<JenisKeahlianQuery>;
		TReq: JenisKeahlianPostRequest;
		TList: JenisKeahlianListResponse[];
	};
	"jenis-pelatihan": {
		TItem: JenisPelatihanQuery;
		TPage: Page<JenisPelatihanQuery>;
		TReq: JenisPelatihanPostRequest;
		TList: JenisPelatihanListResponse[];
	};
	"jenis-kitas": {
		TItem: JenisKitasQuery;
		TPage: Page<JenisKitasQuery>;
		TReq: JenisKitasPostRequest;
		TList: JenisKitasListResponse[];
	};
	"jenis-sp": {
		TItem: JenisSpQuery;
		TPage: Page<JenisSpQuery>;
		TReq: JenisSpPostRequest;
		TList: JenisSpListResponse[];
	};
	"alasan-berhenti": {
		TItem: AlasanBerhentiQuery;
		TPage: Page<AlasanBerhentiQuery>;
		TReq: AlasanBerhentiPostRequest;
		TList: AlasanBerhentiListResponse[];
	};
	"hari-libur": {
		TItem: HariLiburQuery;
		TPage: Page<HariLiburQuery>;
		TReq: HariLiburPostRequest;
		TList: HariLiburListResponse[];
	};
	"rumah-dinas": {
		TItem: RumahDinasQuery;
		TPage: Page<RumahDinasQuery>;
		TReq: RumahDinasPostRequest;
		TList: RumahDinasListResponse[];
	};
	organisasi: {
		TItem: OrganisasiQuery;
		TPage: Page<OrganisasiQuery>;
		TReq: OrganisasiPostRequest;
		TList: OrganisasiListResponse[];
	};
	jabatan: { TItem: JabatanQuery; TPage: Page<JabatanQuery>; TReq: JabatanPostRequest; TList: JabatanListResponse[] };
	grade: { TItem: GradeQuery; TPage: Page<GradeQuery>; TReq: GradePostRequest; TList: GradeListResponse[] };
	profesi: { TItem: ProfesiQuery; TPage: Page<ProfesiQuery>; TReq: ProfesiPostRequest; TList: ProfesiListResponse[] };
	sanksi: { TItem: SanksiQuery; TPage: Page<SanksiQuery>; TReq: SanksiPostRequest; TList: SanksiQuery[] };
	apd: { TItem: ApdQuery; TPage: Page<ApdQuery>; TReq: ApdPostRequest; TList: ApdQuery[] };
	"alat-kerja": {
		TItem: AlatKerjaQuery;
		TPage: Page<AlatKerjaQuery>;
		TReq: AlatKerjaPostRequest;
		TList: AlatKerjaQuery[];
	};
}

/** Nama entitas yang valid (union literal). */
export type MasterEntityName = keyof MasterEntityTypes;
