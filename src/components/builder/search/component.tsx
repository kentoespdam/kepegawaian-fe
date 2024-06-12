"use client"
import type { CustomColumnDef } from "@_types/index";
import { useSearchParams } from "next/navigation";
import InputSearchComponent from "./input";
import SearchLevelBuilder from "./level";

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
        default:
            return <InputSearchComponent col={col} val={value} />
    }
}

export default SearchComponent;