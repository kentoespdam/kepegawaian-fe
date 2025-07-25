"use client";
import {
	type PendapatanNonPajak,
	pendapatanNonPajakColumns,
} from "@_types/penggajian/pendapatan_non_pajak";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKodePajakStore } from "@store/penggajian/kode_pajak";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PendapatanNonPajakTableBody from "./table.body";

const KodePajakComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const { kodePajakId, openDelete, setOpenDelete } = useKodePajakStore(
		(state) => ({
			kodePajakId: state.kodePajakId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const qKey = ["kode-pajak", search.toString()];

	const { isLoading, error, data } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<PendapatanNonPajak>({
				path: encodeString("penggajian/pendapatan-non-pajak"),
				searchParams: search.toString(),
				isRoot: true,
			}),
	});

	return (
		<>
			<SearchBuilder columns={pendapatanNonPajakColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={pendapatanNonPajakColumns} />
					{isLoading || error || !data || data?.empty ? (
						<LoadingTable
							columns={pendapatanNonPajakColumns}
							isLoading={isLoading}
							error={error?.message}
						/>
					) : (
						<PendapatanNonPajakTableBody data={data} />
					)}
				</Table>
				<PaginationBuilder data={data} />
				<DeleteZodDialogBuilder
					id={kodePajakId}
					deletePath="penggajian/pendapatan-non-pajak"
					openDelete={openDelete}
					setOpenDelete={setOpenDelete}
					queryKeys={[qKey]}
				/>
			</div>
		</>
	);
};

export default KodePajakComponent;
