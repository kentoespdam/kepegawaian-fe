"use client"

import type { Biodata } from "@_types/profil/biodata"
import {
	type Pendidikan,
	pendidikanTableColumns,
} from "@_types/profil/pendidikan"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { getPageDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import DeletePendidikanDialog from "./dialog.delete"
import FormProfilPendidikanDialog from "./dialog.form"
import ProfilPendidikanTableBody from "./table.body"
import { useMemo } from "react"

interface ProfilPendidikanContentComponentProps {
	biodata: Biodata
	isKaryawanAktif: boolean
}

const ProfilPendidikanContentComponent = ({
	biodata,
	isKaryawanAktif,
}: ProfilPendidikanContentComponentProps) => {
	const searchParams = useSearchParams()
	const { nik } = biodata

	const qKey = useMemo(
		() => ["profil-pendidikan", nik, searchParams.toString()],
		[searchParams, nik]
	)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<Pendidikan>({
				path: encodeString(`profil/pendidikan/${biodata.nik}/biodata`),
				searchParams: searchParams.toString(),
				isRoot: true,
			}),
		enabled: biodata && !!biodata.nik,
	})

	const showLoading = isLoading || isFetching
	const isEmptyData = !data || data.empty

	return (
		<div className="grid gap-0 overflow-auto p-2">
			<SearchBuilder columns={pendidikanTableColumns} />
			<Table>
				<TableHeadBuilder columns={pendidikanTableColumns} />
				{!isEmptyData ? (
					<ProfilPendidikanTableBody
						data={data}
						biodata={biodata}
						qKey={qKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				) : (
					<LoadingTable
						columns={pendidikanTableColumns}
						isLoading={showLoading}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
			<FormProfilPendidikanDialog />
			<DeletePendidikanDialog />
		</div>
	)
}

export default ProfilPendidikanContentComponent
