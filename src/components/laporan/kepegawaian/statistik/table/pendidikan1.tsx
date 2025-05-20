import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface TableStatistikPendidikan1ComponentProps {
	data: StatistikPendidikan1[];
}
const TableStatistikPendidikan1Component = ({
	data,
}: TableStatistikPendidikan1ComponentProps) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="border text-center">NO</TableHead>
					<TableHead className="border text-center">NAMA</TableHead>
					<TableHead className="border text-center">TOTAL</TableHead>
					<TableHead className="border text-center">PERSEN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.nama}>
						<TableCell className="border" align="right">
							{urut++}
						</TableCell>
						<TableCell className="border text-nowrap">{item.nama}</TableCell>
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

export default TableStatistikPendidikan1Component;
