"use client";

import {
	lampiranSkTableColumns,
	type LampiranSk,
} from "@_types/kepegawaian/lampiran_sk";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { globalGetData } from "@helpers/action";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import LampiranSkForm from "../form/form.lampiran";
import DeleteLampiranSkDialog from "../form/delete";
import LampiranSkTableBody from "../table/body";

type LampiranSkContentProps = {
	pegawaiId: number;
};
const LampiranSkContent = ({ pegawaiId }: LampiranSkContentProps) => {
	const param = useSearchParams();
	const search = new URLSearchParams(param);
	const rootKey = "lampiran-sk";
	const { jenisSk, refId } = useLampiranSkStore((state) => ({
		jenisSk: state.ref,
		refId: state.refId,
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
		<div className="grid overflow-auto p-2 gap-0">
			<div className="min-h-80">
				<Table>
					<TableHeadBuilder columns={lampiranSkTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable
							columns={lampiranSkTableColumns}
							error={query.error?.message}
							isLoading={query.isLoading || query.isFetching}
						/>
					) : query.data && query.data.length > 0 ? (
						<LampiranSkTableBody
							data={query.data}
							jenisSk={jenisSk}
							rootKey={rootKey}
						/>
					) : (
						<LoadingTable
							columns={lampiranSkTableColumns}
							isSuccess={false}
							error={query.error?.message}
						/>
					)}
				</Table>
			</div>

			<LampiranSkForm rootKey={rootKey} savePath="kepegawaian/lampiran" />
			<DeleteLampiranSkDialog pegawaiId={pegawaiId} rootKey={rootKey} />
		</div>
	);
};

export default LampiranSkContent;
