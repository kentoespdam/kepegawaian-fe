"use client";
import type { CustomColumnDef } from "@_types/index";
import { useSearchParams } from "next/navigation";
import AlasanTerminasiSearchBuilder from "./alasan-terminasi";
import SearchCutiApprovalStatusBuilder from "./cuti.approval.status";
import SearchGolonganBuilder from "./golongan";
import SearchGradeBuilder from "./grade";
import InputSearchComponent from "./input";
import SearchJabatanBuilder from "./jabatan";
import JenisMutasiSearchBuilder from "./jenis-mutasi";
import JenisSkSearchBuilder from "./jenisSk";
import SearchJenisTunjanganBuilder from "./jenis_tunjangan";
import JenjangPendidikanSearchBuilder from "./jenjang-pendidikan";
import SearchLevelBuilder from "./level";
import SearchOrganisasiBuilder from "./organisasi";
import SearchProfesiBuilder from "./profesi";
import StatusProsesGajiSearchBuilder from "./status_proses_gaji";
import SearchTahunBuilder from "./tahun";

type SearchComponentProps = {
	col: CustomColumnDef;
};

export interface BaseSearchProps extends SearchComponentProps {
	val: string;
}

const SearchComponent = ({ col }: SearchComponentProps) => {
	const searchParams = useSearchParams();
	if (!col.search) return null;

	const colValue = searchParams.get(col.id);
	const value = !colValue ? "" : colValue;

	switch (col.searchType) {
		case "level":
			return <SearchLevelBuilder col={col} val={value} />;
		case "profesi":
			return <SearchProfesiBuilder col={col} val={value} />;
		case "jabatan":
			return <SearchJabatanBuilder col={col} val={value} />;
		case "organisasi":
			return <SearchOrganisasiBuilder col={col} val={value} />;
		case "jenjangPendidikan":
			return <JenjangPendidikanSearchBuilder col={col} val={value} />;
		case "jenisSk":
			return <JenisSkSearchBuilder col={col} val={value} />;
		case "jenisMutasi":
			return <JenisMutasiSearchBuilder col={col} val={value} />;
		case "alasanTerminasi":
			return <AlasanTerminasiSearchBuilder col={col} val={value} />;
		case "grade":
			return <SearchGradeBuilder col={col} val={value} />;
		case "jenisTunjangan":
			return <SearchJenisTunjanganBuilder col={col} val={value} />;
		case "golongan":
			return <SearchGolonganBuilder col={col} val={value} />;
		case "statusProsesGaji":
			return <StatusProsesGajiSearchBuilder col={col} val={value} />;
		case "tahun":
			return <SearchTahunBuilder col={col} val={value} />;
		case "approvalCutiStatus":
			return <SearchCutiApprovalStatusBuilder col={col} val={value} />;
		default:
			return <InputSearchComponent col={col} val={value} />;
	}
};

export default SearchComponent;
