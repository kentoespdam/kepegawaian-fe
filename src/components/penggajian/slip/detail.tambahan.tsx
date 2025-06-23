import type { GajiBatchMasterProses } from "@_types/gaji_batch_master_process";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { rupiah2 } from "@helpers/number";

const SlipGajiTambahan = ({
	detail,
	jenis,
}: { detail: GajiBatchMasterProses[]; jenis: "PEMASUKAN" | "POTONGAN" }) => {
	let urut = 1;
	const filtered = detail.filter(
		(item) => item.kode.startsWith("ADD_") && item.jenisGaji === jenis,
	);
	return (
		<Table className="text-xs">
			<TableHeader>
				<TableRow className="border-none">
					<TableCell className="px-2 py-1 font-bold" colSpan={5}>
						{jenis === "PEMASUKAN"
							? "Penerimaan Tambahan"
							: "Potongan Tambahan"}
					</TableCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				{filtered.length > 0 ? (
					filtered.map((item) => (
						<TableRow className="border-none" key={item.id}>
							<TableCell className="px-2 py-1" align="right" width={10}>
								{urut++}
							</TableCell>
							<TableCell className="px-2 py-1">{item.nama}</TableCell>
							<TableCell className="px-2 py-1" width={10}>
								:
							</TableCell>
							<TableCell className="px-2 py-1" width={10}>
								Rp.
							</TableCell>
							<TableCell className="px-2 py-1" align="right" width={100}>
								{rupiah2(item.nilai)}
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell className="px-2 py-1 italic" colSpan={5}>
							(Tidak ada data)
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default SlipGajiTambahan;
