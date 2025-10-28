"use client"

import {
	type CutiKuotaPegawai,
	cutiKuotaSearchColumns,
	getCutiKuotaColumns,
} from "@_types/cuti/kuota"
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import PaginationBuilder from "@components/builder/table/pagination"
import { Table } from "@components/ui/table"
import { globalGetDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { useCutiKuotaStore } from "@store/cuti/kuota"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import CutiKuotaFormDialog from "./dialog.form"
import CutiKuotaFormBatchDialog from "./dialog.form.batch"
import CutiKuotaTable from "./table.body"

const CutiKuotaComponent = () => {
	const { replace } = useRouter()
	const params = useSearchParams()

	const { searchParams, currentYear, queryKey } = useMemo(() => {
		const search = new URLSearchParams(params)
		const yearFromParams = params.get("tahun")
		const calculatedYear = yearFromParams
			? Number(yearFromParams)
			: new Date().getFullYear()

		// Set default year if not present
		if (!yearFromParams) {
			search.set("tahun", String(calculatedYear))
		}

		return {
			searchParams: search,
			currentYear: calculatedYear,
			queryKey: ["cuti-kuota", search.toString()],
		}
	}, [params])

	const { selectedDataId, openDelete, setOpenDelete } = useCutiKuotaStore(
		(state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})
	)

	const { data, isFetching, isLoading, isError } = useQuery({
		queryKey: queryKey,
		queryFn: () =>
			globalGetDataEnc<CutiKuotaPegawai>({
				path: encodeString("cuti/kuota"),
				isRoot: true,
				searchParams: searchParams.toString(),
			}),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	})

	useMemo(() => {
		if (!params.get("tahun")) {
			replace(`?${searchParams.toString()}`)
		}
	}, [replace, searchParams, params])

	const tableColumns = useMemo(
		() => getCutiKuotaColumns(currentYear),
		[currentYear]
	)

	// Loading and error states
	const showLoading = isFetching || isLoading
	const hasData = !isError && data

	return (
		<div className="grid">
			<SearchBuilder columns={cutiKuotaSearchColumns} />
			<Table>
				<TableHeadBuilder columns={tableColumns} />
				{showLoading || !hasData ? (
					<LoadingTable columns={12} isLoading={showLoading} />
				) : (
					<CutiKuotaTable data={data} />
				)}
			</Table>
			<PaginationBuilder data={data?.page} />

			<CutiKuotaFormDialog tahun={currentYear} />
			<CutiKuotaFormBatchDialog tahun={currentYear} />

			<DeleteZodDialogBuilder
				id={selectedDataId}
				deletePath="cuti/kuota"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[queryKey]}
			/>
		</div>
	)
}

export default CutiKuotaComponent
