"use client"

import {
	type JenisKeahlian,
	jenisKeahlianTableColumns,
} from "@_types/master/jenis_keahlian"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import JenisKeahlianTableBody from "./table.body"

const JenisKeahlianTable = () => {
	const searchParams = useSearchParams()
	const search = new URLSearchParams(searchParams)

	const { data, isFetching, isLoading } = useQuery({
		queryKey: ["jenis_keahlian", search.toString()],
		queryFn: () =>
			getPageDataEnc<JenisKeahlian>({
				path: encodeString("jenis_keahlian"),
				searchParams: search.toString(),
			}),
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<>
			<Table>
				<TableHeadBuilder columns={jenisKeahlianTableColumns} />
				{!isEmptyData ? (
					<JenisKeahlianTableBody data={data} />
				) : (
					<LoadingTable
						columns={jenisKeahlianTableColumns}
						isLoading={showLoading}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
		</>
	)
}

export default JenisKeahlianTable
