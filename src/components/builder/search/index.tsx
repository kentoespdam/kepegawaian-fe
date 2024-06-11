import { CustomColumnDef } from "@_types/index";
import SearchComponent from "./component";
import ResetSearchComponent from "./reset-button";
import SearchFormComponent from "./form";

type SearchBuilderProps = {
    columns: CustomColumnDef[]
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
                <ResetSearchComponent />
            </div>
        </SearchFormComponent>
    );
}

export default SearchBuilder;