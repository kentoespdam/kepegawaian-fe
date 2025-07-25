"use client";

import {
	type JenisKeahlian,
	jenisKeahlianTableColumns,
} from "@_types/master/jenis_keahlian";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JenisKeahlianTableBody from "./table.body";

const JenisKeahlianTable = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const { data, isFetching, isLoading, isSuccess, error } = useQuery({
		queryKey: ["jenis_keahlian", search.toString()],
		queryFn: () =>
			getPageDataEnc<JenisKeahlian>({
				path: encodeString("jenis_keahlian"),
				searchParams: search.toString(),
			}),
	});

	return (
		<>
			<Table>
				<TableHeadBuilder columns={jenisKeahlianTableColumns} />
				{isSuccess && data.content.length > 0 ? (
					<JenisKeahlianTableBody data={data} />
				) : (
					<LoadingTable
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
						isSuccess={isSuccess}
						columns={jenisKeahlianTableColumns}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
		</>
	);
};

export default JenisKeahlianTable;
