"use client";
import type { CustomColumnDef } from "@_types/index";
import { useSearchParams } from "next/navigation";
import InputSearchComponent from "./input";
import SearchLevelBuilder from "./level";
import SearchProfesiBuilder from "./profesi";
import SearchJabatanBuilder from "./jabatan";
import SearchOrganisasiBuilder from "./organisasi";
import JenjangPendidikanSearchBuilder from "./jenjang-pendidikan";
import JenisSkSearchBuilder from "./jenisSk";
import JenisMutasiSearchBuilder from "./jenis-mutasi";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";

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
		default:
			return <InputSearchComponent col={col} val={value} />;
	}
};

export default SearchComponent;
