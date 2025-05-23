import type { StatistikAgama } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface StatistikAgamaTableProps {
	data: StatistikAgama[];
}
const StatistikAgamaTable = ({
	data,
}: StatistikAgamaTableProps) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="border text-center bg-primary text-primary-foreground">NO</TableHead>
					<TableHead className="border text-center bg-primary text-primary-foreground">AGAMA</TableHead>
					<TableHead className="border text-center bg-primary text-primary-foreground">JUMLAH</TableHead>
					<TableHead className="border text-center bg-primary text-primary-foreground">PERSEN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.agama}>
						<TableCell className="border" align="right">
							{urut++}
						</TableCell>
						<TableCell className="border text-nowrap">{item.agama}</TableCell>
						<TableCell className="border" align="right">{item.total}</TableCell>
						<TableCell className="border" align="right">{item.persen}%</TableCell>
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
					</TableCell>{" "}
					<TableCell className="border" align="right">
						{data.reduce((acc, item) => acc + item.persen, 0)}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default StatistikAgamaTable;
