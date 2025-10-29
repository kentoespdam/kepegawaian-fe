import type { Pageable } from "@_types/index"
import type { JenisKeahlian } from "@_types/master/jenis_keahlian"
import ButtonDeleteBuilder from "@components/builder/button/delete"
import ButtonEditBuilder from "@components/builder/button/edit"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { hapus } from "./action"
import { memo, useMemo } from "react"

type JenisKeahlianTableBodyProps = {
	data: Pageable<JenisKeahlian>
}

const TableButtonAction = memo(({ id }: { id: number }) => (
	<TableCell align="center" className="border-x">
		<ButtonDeleteBuilder
			id={id}
			msg="Delete JenisKeahlian"
			action={hapus}
			tag="jenis_keahlian"
		/>
		<ButtonEditBuilder
			href={`/master/jenis_keahlian/edit/${id}`}
			msg="Edit JenisKeahlian"
		/>
	</TableCell>
))
TableButtonAction.displayName = "TableButtonAction"

const JenisKeahlianTableBody = ({ data }: JenisKeahlianTableBodyProps) => {
	const tableData = useMemo(() => {
		const urut = getUrut(data)
		return data.content.map((item, index) => ({
			...item,
			urut: urut + index,
		}))
	}, [data])

	return (
		<TableBody>
			{tableData.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{row.urut}
					</TableCell>
					<TableCell className="border-x">{row.nama}</TableCell>
					<TableButtonAction id={row.id} />
				</TableRow>
			))}
		</TableBody>
	)
}

export default JenisKeahlianTableBody
