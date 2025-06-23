import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { getNamaBulan } from "@helpers/tanggal";

const SlipGajiProfil = ({ gaji }: { gaji: GajiBatchMaster }) => {
	const periode = gaji.periode.split("-")[0];
	const tahun = periode.substring(0, 4);
	const bulan = periode.substring(4);

	return (
		<div className="grid gap-0 mb-2">
			<span className="text-center font-bold mb-4">
				SLIP GAJI PEGAWAI <br /> {getNamaBulan(Number.parseInt(bulan))} {tahun}
			</span>
			<Table>
				<TableBody>
					<TableRow className="border-none">
						<TableCell className="px-2 py-0 font-bold">Nama</TableCell>
						<TableCell className="px-2 py-0" width={10}>
							:
						</TableCell>
						<TableCell className="px-2 py-0">{gaji.nama}</TableCell>
						<TableCell className="px-2 py-0 font-bold">Unit Kerja</TableCell>
						<TableCell className="px-2 py-0" width={10}>
							:
						</TableCell>
						<TableCell className="px-2 py-0">{gaji.namaOrganisasi}</TableCell>
					</TableRow>
					<TableRow className="border-none">
						<TableCell className="px-2 py-0 font-bold">NIPAM</TableCell>
						<TableCell className="px-2 py-0">:</TableCell>
						<TableCell className="px-2 py-0">{gaji.nipam}</TableCell>
						<TableCell className="px-2 py-0 font-bold">Golongan</TableCell>
						<TableCell className="px-2 py-0">:</TableCell>
						<TableCell className="px-2 py-0">{gaji.golongan}</TableCell>
					</TableRow>
					<TableRow className="border-none">
						<TableCell className="px-2 py-0 font-bold">Jabatan</TableCell>
						<TableCell className="px-2 py-0">:</TableCell>
						<TableCell className="px-2 py-0">{gaji.namaJabatan}</TableCell>
						<TableCell className="px-2 py-0 font-bold">Bank</TableCell>
						<TableCell className="px-2 py-0">:</TableCell>
						<TableCell className="px-2 py-0">- - -</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default SlipGajiProfil;
