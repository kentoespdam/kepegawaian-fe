"use client";

import {
	type RefPotonganTkk,
	refPotonganTkkTableColumns,
} from "@_types/penggajian/ref_potongan_tkk";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useRefPotonganTkkStore } from "@store/penggajian/ref_potongan_tkk";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import RefPotonganTkkTableBody from "./table.body";

const RefPotonganTkkComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const { refPotonganTkkId, openDelete, setOpenDelete } =
		useRefPotonganTkkStore(
			useShallow((state) => ({
				refPotonganTkkId: state.refPotonganTkkId,
				openDelete: state.openDelete,
				setOpenDelete: state.setOpenDelete,
			})),
		);

	const { isLoading, error, data } = useQuery({
		queryKey: ["ref-potongan-tkk", search.toString()],
		queryFn: async () =>
			await getPageData<RefPotonganTkk>({
				path: "penggajian/potongan-tkk",
				searchParams: search.toString(),
				isRoot: true,
			}),
	});
	return (
		<>
			<SearchBuilder columns={refPotonganTkkTableColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={refPotonganTkkTableColumns} />
					{isLoading || error || !data || data?.empty ? (
						<LoadingTable
							columns={refPotonganTkkTableColumns}
							isLoading={isLoading}
							error={error?.message}
						/>
					) : (
						<RefPotonganTkkTableBody data={data} />
					)}
				</Table>
				<PaginationBuilder data={data} />
				<DeleteZodDialogBuilder
					id={refPotonganTkkId}
					deletePath="penggajian/potongan-tkk"
					openDelete={openDelete}
					setOpenDelete={setOpenDelete}
					queryKeys={["ref-potongan-tkk", search.toString()]}
				/>
			</div>
		</>
	);
};

export default RefPotonganTkkComponent;
