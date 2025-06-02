import type { Mutasi } from "@_types/kepegawaian/mutasi";
import { TableBody, TableCell, TableRow } from "@components/ui/table";

type LapMutasiTableBodyProps = {
	data?: Mutasi[];
};
const LapMutasiTableBody = ({ data }: LapMutasiTableBodyProps) => {
	let urut = 0;
	return (
		<TableBody>
			{data?.map((item) => (
				<TableRow key={`${item.jenis_mutasi}${item.nipam}${item.tmt_berlaku}`}>
					<TableCell className="border">{++urut}</TableCell>
					<TableCell className="border text-nowrap">
						{item.jenis_mutasi}
					</TableCell>
					<TableCell className="border text-nowrap">{item.nipam}</TableCell>
					<TableCell className="border text-nowrap">{item.nama}</TableCell>
					<TableCell className="border text-nowrap">
						{item.tmt_berlaku}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_organisasi_lama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_jabatan_lama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_golongan_lama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_organisasi}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_jabatan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{item.nama_organisasi}
					</TableCell>
					<TableCell className="border text-nowrap">{item.notes}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default LapMutasiTableBody;
