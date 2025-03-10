import type { CustomColumnDef } from "@_types/index";
import SearchComponent from "./component";
import SearchFormComponent from "./form";
import ResetSearchComponent from "./reset-button";
import { Suspense } from "react";
import RefreshSearchComponent from "./refresh_search";

type SearchBuilderProps = {
	columns: CustomColumnDef[];
	pending?: boolean;
	qkey?: string[]
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
					{props.qkey ?
						<RefreshSearchComponent pending={props.pending ?? false} qkey={props.qkey ?? []} />
						: null}
					< ResetSearchComponent pending={props.pending ?? false} />
				</div>
			</SearchFormComponent>
		</Suspense>
	);
};

export default SearchBuilder;
