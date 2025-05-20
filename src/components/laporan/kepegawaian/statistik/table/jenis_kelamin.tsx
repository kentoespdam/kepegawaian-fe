import type { StatistikJenisKelamin } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface StatistikJenisKelaminTableProps {
	data: StatistikJenisKelamin[];
}
const StatistikJenisKelaminTable = ({
	data,
}: StatistikJenisKelaminTableProps) => {
	let urut = 1;
	return (
		<Table className="w-fit">
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="border text-center text-primary-foreground">NO</TableHead>
					<TableHead className="border text-center text-primary-foreground">JENIS KELAMIN</TableHead>
					<TableHead className="border text-center text-primary-foreground">TOTAL</TableHead>
					<TableHead className="border text-center text-primary-foreground">PERSEN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.jenis_kelamin}>
						<TableCell className="border" align="right">
							{urut++}
						</TableCell>
						<TableCell className="border">{item.jenis_kelamin}</TableCell>
						<TableCell className="border" align="right">
							{item.total}
						</TableCell>
						<TableCell className="border" align="right">
							{item.persen}%
						</TableCell>
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

export default StatistikJenisKelaminTable;
