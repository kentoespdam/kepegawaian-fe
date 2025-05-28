import type { StatistikGelarAkademik } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface StatistikGelarAkademikTableProps {
	data: StatistikGelarAkademik[];
}
const StatistikGelarAkademikTable = ({
	data,
}: StatistikGelarAkademikTableProps) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="sticky top-0">
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						NO
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						TINGKAT
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						GELAR
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						TOTAL
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						PERSEN
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={`${item.gelar}-${item.jenjang}`}>
						<TableCell className="border p-1" align="right">
							{urut++}
						</TableCell>
						<TableCell className="border p-1 text-nowrap">{item.jenjang}</TableCell>
						<TableCell className="border p-1 text-nowrap">{item.gelar}</TableCell>
						<TableCell className="border p-1" align="right">
							{item.total}
						</TableCell>
						<TableCell className="border p-1" align="right">
							{item.persen.toFixed(2)}%
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3} className="border p-1" align="right">
						Total Pegawai
					</TableCell>
					<TableCell className="border p-1" align="right">
						{data.reduce((acc, item) => acc + item.total, 0)}
					</TableCell>
					<TableCell className="border p-1" align="right">
						{data.reduce((acc, item) => acc + item.persen, 0)}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default StatistikGelarAkademikTable;
