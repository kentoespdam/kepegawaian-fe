import type { DUK } from "@_types/laporan/kepegawaian/duk"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { useMemo } from "react"

interface DukTableBodyProps {
	duk: DUK[]
}
const DukTableBody = ({ duk }: DukTableBodyProps) => {
	const tableData = useMemo(
		() =>
			duk.map((item, index) => ({
				...item,
				urut: index + 1,
			})),
		[duk]
	)

	return (
		<TableBody>
			{tableData.map((row) => (
				<TableRow key={row.nipam}>
					<TableCell className="border" align="right">
						{row.urut}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.nama}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.nipam}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.golongan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.pangkat}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tmt_golongan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.nama_jabatan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tmt_jabatan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tmt_kerja}
					</TableCell>
					<TableCell className="text-nowrap border" align="right">
						{row.mk_tahun}
					</TableCell>
					<TableCell className="text-nowrap border" align="right">
						{row.mk_bulan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.jurusan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tahun_lulus}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tingkat_pendidikan}
					</TableCell>
					<TableCell className="text-nowrap border" align="right">
						{row.usia}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.status_pegawai}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default DukTableBody
