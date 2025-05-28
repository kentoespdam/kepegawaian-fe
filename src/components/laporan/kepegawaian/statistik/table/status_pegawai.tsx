import type { StatistikStatusPegawai } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface StatistikStatusPegawaiTableProps {
	data: StatistikStatusPegawai[];
}
const StatistikStatusPegawaiTable = ({
	data,
}: StatistikStatusPegawaiTableProps) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">NO</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">AGAMA</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">JUMLAH</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">PERSEN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.status_pegawai}>
						<TableCell className="border" align="right">
							{urut++}
						</TableCell>
						<TableCell className="border text-nowrap">{item.status_pegawai}</TableCell>
						<TableCell className="border" align="right">{item.total}</TableCell>
						<TableCell className="border" align="right">{item.persen.toFixed(2)}%</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2} className="border" align="right">
						Total Pegawai
					</TableCell>
					<TableCell className="border" align="right">
						{data.reduce((acc, item) => acc + item.total, 0)}
					</TableCell>
					<TableCell className="border" align="right">
						{data.reduce((acc, item) => acc + item.persen, 0)}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default StatistikStatusPegawaiTable;
