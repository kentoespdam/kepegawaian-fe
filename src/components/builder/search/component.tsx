import { CustomColumnDef } from "@_types/index";
import InputSearchComponent from "./input";

export interface BaseSearchProps {
    col: CustomColumnDef, value: string
}


type SearchComponentProps = {
    searchParams: Record<string, string>,
    col: CustomColumnDef
}
const SearchComponent = ({ searchParams, col }: SearchComponentProps) => {
    const search = new URLSearchParams(searchParams)
    if (!col.search) return null
    const value = search.get(col.id) || ""
    switch (col.search) {
        default:
            return <InputSearchComponent col={col} value={value} />
    }
}

export default SearchComponent;