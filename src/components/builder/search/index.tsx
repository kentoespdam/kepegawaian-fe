import { CustomColumnDef } from "@_types/index";
import SearchComponent from "./component";

type SearchBuilderProps = {
    searchParams: Record<string, string>,
    columns: CustomColumnDef[]
}

const SearchBuilder = (props: SearchBuilderProps) => {
    return (
        <div className="flex flex-row justify-start gap-2 mb-2">
            {props.columns.map((column) => (
                <SearchComponent
                    key={column.id}
                    col={column}
                    searchParams={props.searchParams}
                />
            ))}
        </div>
    );
}

export default SearchBuilder;