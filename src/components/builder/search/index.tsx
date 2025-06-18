import type { CustomColumnDef } from "@_types/index";
import type { QueryKey } from "@tanstack/react-query";
import { Suspense } from "react";
import SearchComponent from "./component";
import SearchFormComponent from "./form.index";
import RefreshSearchComponent from "./refresh_search";
import ResetSearchComponent from "./reset-button";

type SearchBuilderProps = {
	columns: CustomColumnDef[];
	pending?: boolean;
	qKey?: QueryKey;
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
					{props.qKey ? (
						<RefreshSearchComponent
							pending={props.pending ?? false}
							qKey={props.qKey ?? []}
						/>
					) : null}
					<ResetSearchComponent
						pending={props.pending ?? false}
						columns={props.columns}
					/>
				</div>
			</SearchFormComponent>
		</Suspense>
	);
};

export default SearchBuilder;
