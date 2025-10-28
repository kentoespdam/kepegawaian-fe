import type { StatistikGolongan } from "@_types/laporan/kepegawaian/lap_statistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { useMemo } from "react";

interface StatistikGolonganTableProps {
	data: StatistikGolongan[];
}
const StatistikGolonganTable = ({
									data,
								}: StatistikGolonganTableProps) => {
	const totalPegawai = useMemo(() => data.reduce((acc, item) => acc + item.total, 0), [data]);

	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="bg-primary">
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10" rowSpan={2}>
						NO
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10" rowSpan={2}>
						GOL.
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10" rowSpan={2}>
						PANGKAT
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10" colSpan={2}>
						JENIS KELAMIN
					</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10" rowSpan={2}>
						TOTAL
					</TableHead>
				</TableRow>
				<TableRow className="bg-primary">
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">LK</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">PR</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, idx) => (
					<TableRow key={item.golongan}>
						<TableCell className="border" align="right">
							{idx + 1}
						</TableCell>
						<TableCell className="border">{item.golongan}</TableCell>
						<TableCell className="border">{item.pangkat}</TableCell>
						<TableCell className="border" align="right">
							{item.jml_l}
						</TableCell>
						<TableCell className="border" align="right">
							{item.jml_p}
						</TableCell>
						<TableCell className="border" align="right">
							{item.total}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={5} className="border" align="right">
						Total Pegawai
					</TableCell>
					<TableCell className="border" align="right">
						{totalPegawai}
					</TableCell>

				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default StatistikGolonganTable;