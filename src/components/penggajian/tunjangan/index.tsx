"use client";

import {
	type Tunjangan,
	tunjanganTableColumns,
} from "@_types/penggajian/tunjangan";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useTunjanganStore } from "@store/penggajian/tunjangan";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TunjanganTableBody from "./table.body";

const TunjanganComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const jenisTunjangan = search.get("jenisTunjangan");
	const { tunjanganId, openDelete, setOpenDelete } = useTunjanganStore(
		(state) => state,
	);

	const { isLoading, error, data } = useQuery({
		queryKey: ["tunjangan", search.toString()],
		queryFn: async () =>
			await getPageDataEnc<Tunjangan>({
				path: encodeString(`penggajian/tunjangan/${jenisTunjangan}`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: !!jenisTunjangan,
	});

	return (
		<>
			<SearchBuilder columns={tunjanganTableColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={tunjanganTableColumns} />
					{isLoading || error || !data || data?.empty ? (
						<LoadingTable
							columns={tunjanganTableColumns}
							isLoading={isLoading}
							error={error?.message}
						/>
					) : (
						<TunjanganTableBody data={data} />
					)}
				</Table>
				<PaginationBuilder data={data} />
				<DeleteZodDialogBuilder
					id={tunjanganId}
					deletePath={`penggajian/tunjangan/${jenisTunjangan}`}
					openDelete={openDelete}
					setOpenDelete={setOpenDelete}
					queryKeys={[["tunjangan", search.toString()]]}
				/>
			</div>
		</>
	);
};

export default TunjanganComponent;
