"use client";

import { type Jabatan, jabatanTableColumns } from "@_types/master/jabatan";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useJabatanStore } from "@store/master/jabatan";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import JabatanTableBody from "./table.body";
const JabatanTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { jabatanId, openDelete, setOpenDelete } = useJabatanStore(
		useShallow((state) => ({
			jabatanId: state.jabatanId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["jabatan", search.toString()],
		queryFn: () =>
			getPageData<Jabatan>({
				path: "jabatan",
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounder-md grid">
			<Table>
				<TableHeadBuilder columns={jabatanTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<JabatanTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={jabatanTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={jabatanId}
				deletePath="master/jabatan"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={["jabatan", search.toString()]}
			/>
		</div>
	);
};

export default JabatanTable;
