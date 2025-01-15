import type { CustomColumnDef } from "@_types/index";
import SearchComponent from "./component";
import SearchFormComponent from "./form";
import ResetSearchComponent from "./reset-button";
import { Suspense } from "react";

type SearchBuilderProps = {
	columns: CustomColumnDef[];
	pending?: boolean;
};

const SearchBuilder = (props: SearchBuilderProps) => {
	return (
		<Suspense>
			<SearchFormComponent>
				<div className="max-w-full flex flex-wrap flex-row justify-start gap-2 mb-2">
					{props.columns.map((column) =>
						column.search ? (
							<div key={column.id} className="w-52">
								<SearchComponent key={column.id} col={column} />
							</div>
						) : null,
					)}
					<ResetSearchComponent pending={props.pending ?? false} />
				</div>
			</SearchFormComponent>
		</Suspense>
	);
};

export default SearchBuilder;
