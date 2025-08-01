"use client";

import type { Pegawai } from "@_types/pegawai";
import {
	type GajiBatchRoot,
	gajiBatchRootColumns,
} from "@_types/penggajian/gaji_batch_root";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteBatchRootDialog from "./dialog.delete";
import GajiBatchRootTableBody from "./table.body";

interface ProsesGajiComponentProps {
	pegawai: Pegawai;
}
const ProsesGajiComponent = ({ pegawai }: ProsesGajiComponentProps) => {
	const { batchId, openDelete, setOpenDelete } = useGajiBatchRootStore(
		(state) => ({
			batchId: state.batchId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const qKey = ["gaji_batch_root", search.toString()];

	const { isLoading, error, data } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<GajiBatchRoot>({
				path: encodeString("penggajian/batch"),
				searchParams: search.toString(),
				isRoot: true,
			}),
	});

	return (
		<>
			<SearchBuilder columns={gajiBatchRootColumns} qKey={qKey} />
			<div className="w-full overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={gajiBatchRootColumns} />
					{isLoading || error || !data || data?.empty ? (
						<LoadingTable
							columns={gajiBatchRootColumns}
							isLoading={isLoading}
							error={error?.message}
						/>
					) : (
						<GajiBatchRootTableBody data={data} pegawai={pegawai} qKey={qKey} />
					)}
				</Table>
				<PaginationBuilder data={data} />
			</div>
			<DeleteBatchRootDialog
				id={batchId}
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</>
	);
};

export default ProsesGajiComponent;
