"use client"
import type { CustomColumnDef } from "@_types/index";
import { useSearchParams } from "next/navigation";
import InputSearchComponent from "./input";
import SearchLevelBuilder from "./level";
import SearchProfesiBuilder from "./profesi";
import SearchJabatanBuilder from "./jabatan";
import SearchOrganisasiBuilder from "./organisasi";
import JenjangPendidikanSearchBuilder from "./jenjang-pendidikan";

export interface BaseSearchProps {
    col: CustomColumnDef, val: string
}


type SearchComponentProps = {
    col: CustomColumnDef
}
const SearchComponent = ({ col }: SearchComponentProps) => {
    const searchParams = useSearchParams()
    if (!col.search) return null

    const colValue = searchParams.get(col.id)
    const value = !colValue ? "" : colValue

    switch (col.searchType) {
        case "level":
            return <SearchLevelBuilder col={col} val={value} />
        case "profesi":
            return <SearchProfesiBuilder col={col} val={value} />
        case "jabatan":
            return <SearchJabatanBuilder col={col} val={value} />
        case "organisasi":
            return <SearchOrganisasiBuilder col={col} val={value} />
        case "jenjangPendidikan":
            return <JenjangPendidikanSearchBuilder col={col} val={value} />
        default:
            return <InputSearchComponent col={col} val={value} />
    }
}

export default SearchComponent;