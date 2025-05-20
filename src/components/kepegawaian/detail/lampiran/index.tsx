"use client";

import {
	type LampiranSk,
	lampiranSkTableColumns,
} from "@_types/kepegawaian/lampiran_sk";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { globalGetData } from "@helpers/action";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import LampiranSkForm from "./form.index";
import LampiranSkTableBody from "./table.body";

type LampiranSkContentProps = {
	pegawaiId: number;
};
const LampiranSkContent = ({ pegawaiId }: LampiranSkContentProps) => {
	const param = useSearchParams();
	const search = new URLSearchParams(param);
	const rootKey = "lampiran-sk";
	const { lampiranId, jenisSk, refId, openDeleteLampiranForm, setOpenDeleteLampiranForm } = useLampiranSkStore((state) => ({
		lampiranId: state.lampiranId,
		jenisSk: state.ref,
		refId: state.refId,
		openDeleteLampiranForm: state.openDeleteLampiranForm,
		setOpenDeleteLampiranForm: state.setOpenDeleteLampiranForm,
	}));

	const query = useQuery<LampiranSk[]>({
		queryKey: [rootKey, jenisSk, refId],
		queryFn: async () => {
			const result = await globalGetData<LampiranSk[]>({
				path: `kepegawaian/lampiran/list/${jenisSk}/${refId}`,
				isRoot: true,
				searchParams: search.toString(),
			});
			return result;
		},
		enabled: !!jenisSk && !!refId,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0 mb-4">
			<div className="min-h-fit">
				<Table>
					<TableHeadBuilder columns={lampiranSkTableColumns} />
					{query.isLoading || query.isFetching || query.isError || !query.data || query.data.length === 0 ? (
						<LoadingTable
							columns={lampiranSkTableColumns}
							error={query.error?.message}
							isLoading={query.isLoading || query.isFetching}
						/>
					) : (
						<LampiranSkTableBody
							data={query.data}
							jenisSk={jenisSk}
							rootKey={rootKey}
						/>
					)}
				</Table>
			</div>

			<LampiranSkForm rootKey={rootKey} savePath="kepegawaian/lampiran" />
			<DeleteZodDialogBuilder
				id={lampiranId}
				queryKeys={[rootKey]}
				deletePath={`kepegawaian/lampiran/${jenisSk}/${refId}`}
				openDelete={openDeleteLampiranForm}
				setOpenDelete={setOpenDeleteLampiranForm}
			/>
		</div>
	);
};

export default LampiranSkContent;
