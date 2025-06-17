"use client";

import { type JenisSp, jenisSpTableColumns } from "@_types/master/jenis_sp";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useJenisSpStore } from "@store/master/jenis_sp.store";
import { useSanksiStore } from "@store/master/sanksi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PatchSanksiJenisSpForm from "./form.add.sanksi.jenis_sp.dialog";
import DeleteSanksiJenisSpFormDialog from "./form.delete.sanksi";
import JenisSpTableBody from "./table.body";

const JenisSpTableComponent = () => {
	const { jenisSp, openDelete, setOpenDelete } = useJenisSpStore((state) => ({
		jenisSp: state.jenisSp,
		openDelete: state.openDelete,
		setOpenDelete: state.setOpenDelete,
	}));
	const {
		sanksiId,
		openDelete: openDeleteSanksi,
		setOpenDelete: setOpenDeleteSanksi,
	} = useSanksiStore((state) => ({
		sanksiId: state.sanksiId,
		jenisSpId: state.jenisSpId,
		openDelete: state.openDelete,
		setOpenDelete: state.setOpenDelete,
	}));

	const params = useSearchParams();
	const qKey = ["jenis_sp", params.toString()];
	const query = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageData<JenisSp>({
				path: "master/jenis_sp",
				isRoot: true,
				searchParams: params.toString(),
			}),
	});
	return (
		<div className="rounder-md grid">
			<SearchBuilder columns={jenisSpTableColumns} />
			<Table>
				<TableHeadBuilder columns={jenisSpTableColumns} />
				{query.isLoading || query.error || !query.data || query.data.empty ? (
					<LoadingTable
						columns={jenisSpTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
					/>
				) : (
					<JenisSpTableBody data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
			<PatchSanksiJenisSpForm qKey={qKey} />
			<DeleteZodDialogBuilder
				id={jenisSp ? jenisSp.id : 0}
				deletePath="master/jenis-sp"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
			<DeleteSanksiJenisSpFormDialog
				id={sanksiId}
				openDelete={openDeleteSanksi}
				setOpenDelete={setOpenDeleteSanksi}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default JenisSpTableComponent;
