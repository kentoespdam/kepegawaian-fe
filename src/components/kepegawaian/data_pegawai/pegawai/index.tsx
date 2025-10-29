"use client"
import { type Pegawai, pegawaiTableColumns } from "@_types/pegawai"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card"
import { Table } from "@components/ui/table"
import { TabsContent } from "@components/ui/tabs"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useDataPegawaiStore } from "@store/kepegawaian/data_pegawai/data_pegawai-store"
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import EditProfilPribadiFormComponent from "../profil/pribadi"
import PegawaiTableBody from "./body"

const TabBiodataPegawai = () => {
	const { tab } = useDataPegawaiStore((state) => ({
		tab: state.tab,
	}))
	const searchParams = useSearchParams()
	const search = useMemo(
		() => new URLSearchParams(searchParams).toString(),
		[searchParams]
	)
	const qKey = useMemo(() => ["data-pegawai", search], [search])

	const { pegawai, open } = useProfilPribadiStore((state) => ({
		pegawai: state.pegawai,
		open: state.open,
	}))

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<Pegawai>({
				path: encodeString("pegawai"),
				searchParams: search,
				isRoot: true,
			}),
		enabled: tab === "pegawai",
		staleTime: 1000 * 60 * 5,
	})

	const showLoading = !data ? isLoading || isFetching : false
	const isEmptyData = !data || data.empty

	return (
		<TabsContent value="pegawai">
			<Card className="w-full">
				<CardHeader className="px-7">
					<CardTitle>Daftar Pegawai</CardTitle>
					<CardDescription>Daftar Biodata Pegawai</CardDescription>
				</CardHeader>
				<CardContent className="grid max-w-full">
					<SearchBuilder columns={pegawaiTableColumns} />
					<Table>
						<TableHeadBuilder columns={pegawaiTableColumns} />
						{showLoading || isEmptyData ? (
							<LoadingTable
								columns={pegawaiTableColumns}
								isLoading={showLoading}
							/>
						) : (
							<PegawaiTableBody data={data} />
						)}
					</Table>
					<PaginationBuilder data={data} />
				</CardContent>
			</Card>
			<EditProfilPribadiFormComponent open={open} pegawai={pegawai} />
		</TabsContent>
	)
}

export default TabBiodataPegawai
