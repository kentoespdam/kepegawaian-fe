import type { CustomColumnDef } from "@_types/index";
import SearchComponent from "./component";
import SearchFormComponent from "./form";
import ResetSearchComponent from "./reset-button";

type SearchBuilderProps = {
    columns: CustomColumnDef[]
    pending?: boolean
}

const SearchBuilder = (props: SearchBuilderProps) => {
    return (
        <SearchFormComponent>
            <div className="flex flex-row justify-start gap-2 mb-2">
                {props.columns.map((column) => (
                    column.search ?
                        <div key={column.id} className="w-52">
                            <SearchComponent
                                key={column.id}
                                col={column}
                            />
                        </div>
                        : null
                ))}
                <ResetSearchComponent
                    pending={props.pending ?? false} />
            </div>
        </SearchFormComponent>
    );
}

export default SearchBuilder;