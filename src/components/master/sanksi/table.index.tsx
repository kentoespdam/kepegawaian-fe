"use client";
import { type Sanksi, sanksiTableColumns } from "@_types/master/sanksi";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SanksiTableBody from "./table.body";
import { useSanksiStore } from "@store/master/sanksi";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";

const SanksiTableComponent = () => {
	const { sanksiId, openDelete, setOpenDelete } = useSanksiStore((state) => ({
		sanksiId: state.sanksiId,
		openDelete: state.openDelete,
		setOpenDelete: state.setOpenDelete,
	}));
	const searchParams = useSearchParams();
	const qKey = ["sanksi", searchParams.toString()];
	const query = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageData<Sanksi>({
				path: "sanksi",
				searchParams: searchParams.toString(),
			}),
	});
	return (
		<div className="rounder-md grid">
			<SearchBuilder columns={sanksiTableColumns} />
			<Table>
				<TableHeadBuilder columns={sanksiTableColumns} />
				{query.isLoading || query.error || !query.data || query.data.empty ? (
					<LoadingTable
						columns={sanksiTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
					/>
				) : (
					<SanksiTableBody data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
			<DeleteZodDialogBuilder
				id={sanksiId}
				deletePath="master/sanksi"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qkey]}
			/>
		</div>
	);
};

export default SanksiTableComponent;
