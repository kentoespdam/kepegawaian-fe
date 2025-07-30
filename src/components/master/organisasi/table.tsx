"use client";

import {
	type Organisasi,
	organisasiTableColumns,
} from "@_types/master/organisasi";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useOrganisasiStore } from "@store/master/organisasi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import OrganisasiTableBody from "./table.body";

const OrganisasiTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const qKey = ["organisasi", search.toString()];

	const { organisasiId, openDelete, setOpenDelete } = useOrganisasiStore(
		(state) => ({
			organisasiId: state.organisasiId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Organisasi>({
				path: encodeString("organisasi"),
				searchParams: search.toString(),
			}),
	});

	return (
		<div className="rounder-md border">
			<Table>
				<TableHeadBuilder columns={organisasiTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<OrganisasiTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={organisasiTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<DeleteZodDialogBuilder
				id={organisasiId}
				deletePath="master/organisasi"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[qKey]}
			/>
		</div>
	);
};

export default OrganisasiTable;
