import type { StatistikPendidikan2 } from "@_types/laporan/kepegawaian/lap_statistik"
import { TableBody, TableCell, TableRow } from "@components/ui/table"

type Pendidikan2TableBodyProps = {
	data: StatistikPendidikan2[]
}
const Pendidikan2TableBody = ({ data }: Pendidikan2TableBodyProps) => {
	return (
		<TableBody>
			{data.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border">{row.pendidikan}</TableCell>
					<TableCell className="border">{row.non_golongan}</TableCell>
					<TableCell className="border">{row.golongan_a}</TableCell>
					<TableCell className="border">{row.golongan_b}</TableCell>
					<TableCell className="border">{row.golongan_c}</TableCell>
					<TableCell className="border">{row.golongan_d}</TableCell>
					<TableCell className="border">{row.jml_golongan}</TableCell>
					<TableCell className="border">{row.kontrak}</TableCell>
					<TableCell className="border">{row.capeg}</TableCell>
					<TableCell className="border">{row.honorer}</TableCell>
					<TableCell className="border">{row.tetap}</TableCell>
					<TableCell className="border">
						{row.jml_status_pegawai}
					</TableCell>
					<TableCell className="border">{row.adm}</TableCell>
					<TableCell className="border">{row.pelayanan}</TableCell>
					<TableCell className="border">{row.teknik}</TableCell>
					<TableCell className="border">
						{row.jml_unit_kerja}
					</TableCell>
					<TableCell className="border">{row.pria}</TableCell>
					<TableCell className="border">{row.wanita}</TableCell>
					<TableCell className="border">
						{row.jml_jenis_kelamin}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default Pendidikan2TableBody
