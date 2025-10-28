"use client"
import type { Organisasi } from "@_types/master/organisasi"
import {
	type GajiBatchMaster,
	gajiBatchMasterColumns,
} from "@_types/penggajian/gaji_batch_master"
import SearchBuilder from "@components/builder/search"
import TableHeadBuilder from "@components/builder/table/head"
import LoadingTable from "@components/builder/table/loading"
import { getNamaBulan } from "@helpers/tanggal"
import { FileSpreadsheetIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import GajiBatchMasterTableBody from "../gaji_batch_master/verif_phase_1/table.body"

interface VerifPhase1ComponentProps {
	organisasiList: Organisasi[]
	gajiBatchMasters?: GajiBatchMaster[]
}
const VerifPhase1Component = ({
	organisasiList,
	gajiBatchMasters,
}: VerifPhase1ComponentProps) => {
	const searchParams = useSearchParams()
	const periodeStr = useMemo(() => {
		const periode = searchParams.get("periode")
		return `${getNamaBulan(Number(periode?.substring(4, 6))) ?? ""} ${periode?.substring(0, 4) ?? ""}`
	}, [searchParams])

	return (
		<div className="grid gap-2 pr-4">
			<div>
				<h2 className="flex">
					<FileSpreadsheetIcon className="mr-1 h-5 w-5" />
					Gaji [Periode{" "}
					<span className="ml-2 text-primary">{periodeStr}</span>]
				</h2>
			</div>
			<SearchBuilder columns={gajiBatchMasterColumns} />
			<div className="block max-h-[70vh] min-h-[350px] overflow-y-auto">
				<table>
					<TableHeadBuilder columns={gajiBatchMasterColumns} />
					{!gajiBatchMasters ? (
						<LoadingTable
							columns={gajiBatchMasterColumns}
							isLoading={false}
						/>
					) : (
						<GajiBatchMasterTableBody
							organisasiList={organisasiList}
							gajiBatchMasters={gajiBatchMasters}
						/>
					)}
				</table>
			</div>
		</div>
	)
}

export default VerifPhase1Component
