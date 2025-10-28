import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { useMemo } from "react"

const LapKenaikanBerkalaTableBody = ({ data }: { data: KenaikanBerkala[] }) => {
	const tableData = useMemo(
		() =>
			data.map((item, index) => ({
				...item,
				urut: index + 1,
			})),
		[data]
	)
	return (
		<TableBody>
			{tableData.map((row) => (
				<TableRow key={row.id}>
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
						{row.tmt_jabatan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.pangkat}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.golongan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tmt_golongan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.mkg_tahun}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.mkg_bulan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tmt_kerja}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.mk_tahun}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.mk_bulan}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.pendidikan_terakhir}
					</TableCell>
					<TableCell className="text-nowrap border">
						{row.tempat_lahir}, {row.tanggal_lahir}
					</TableCell>
					<TableCell className="text-nowrap border">&nbsp;</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default LapKenaikanBerkalaTableBody
