"use client"

import type { DnpResponse } from "@_types/laporan/kepegawaian/dnp"
import { Table } from "@components/ui/table"
import DnpTableBody from "./table.body"
import DnpTableHeader from "./table.head"
import { memo } from "react"

interface DnpComponentProps {
	dnpResponse: DnpResponse
}
const DnpComponent = memo(({ dnpResponse }: DnpComponentProps) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<DnpTableHeader />
				<DnpTableBody dnpResponse={dnpResponse} />
			</Table>
		</div>
	)
})

DnpComponent.displayName = "DnpComponent"

export default DnpComponent
