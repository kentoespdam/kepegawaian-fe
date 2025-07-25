"use client";

import type { Biodata } from "@_types/profil/biodata";
import {
	type Pendidikan,
	pendidikanTableColumns,
} from "@_types/profil/pendidikan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeletePendidikanDialog from "./dialog.delete";
import FormProfilPendidikanDialog from "./dialog.form";
import ProfilPendidikanTableBody from "./table.body";

interface ProfilPendidikanContentComponentProps {
	biodata: Biodata;
}

const ProfilPendidikanContentComponent = ({
	biodata,
}: ProfilPendidikanContentComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { nik } = biodata;

	const qKey = ["profil-pendidikan", nik, search.toString()];

	const query = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Pendidikan>({
				path: encodeString(`profil/pendidikan/${biodata.nik}/biodata`),
				searchParams: search.toString(),
				isRoot: true,
			}),
		enabled: biodata && !!biodata.nik,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<SearchBuilder columns={pendidikanTableColumns} />
			<Table>
				<TableHeadBuilder columns={pendidikanTableColumns} />
				{query.isLoading ||
				query.isFetching ||
				query.isError ||
				!biodata ||
				!query.data ||
				query.data.empty ? (
					<LoadingTable
						columns={pendidikanTableColumns}
						isLoading={query.isLoading || query.isFetching}
					/>
				) : (
					<ProfilPendidikanTableBody
						data={query.data}
						biodata={biodata}
						qKey={qKey}
					/>
				)}
			</Table>
			<PaginationBuilder data={query.data} />
			<FormProfilPendidikanDialog />
			<DeletePendidikanDialog />
		</div>
	);
};

export default ProfilPendidikanContentComponent;
