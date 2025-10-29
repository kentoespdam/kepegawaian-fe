import type { StatistikPendidikan2 } from "@_types/laporan/kepegawaian/lap_statistik"
import LoadingTable from "@components/builder/table/loading"
import { Table } from "@components/ui/table"
import { useMemo } from "react"
import Pendidikan2Filter from "./pendidikan2_filter"
import Pendidikan2TableBody from "./pendidikan2_table_body"
import Pendidikan2TableHeader from "./pendidikan2_table_header"

type TableStatistikPendidikan2ComponentProps = {
	statistikData?: StatistikPendidikan2[]
}
const TableStatistikPendidikan2Component = ({
	statistikData,
}: TableStatistikPendidikan2ComponentProps) => {
	const row = useMemo(() => statistikData ?? [], [statistikData])
	return (
		<div className="grid gap-2">
			<Pendidikan2Filter />
			<Table className="w-full">
				<Pendidikan2TableHeader />
				{row.length === 0 ? (
					<LoadingTable columns={19} isLoading={false} />
				) : (
					<Pendidikan2TableBody data={row} />
				)}
			</Table>
		</div>
	)
}

export default TableStatistikPendidikan2Component
