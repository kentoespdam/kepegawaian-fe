import type { StatistikGolongan } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

interface StatistikGolonganTableProps {
	data: StatistikGolongan[];
}
const StatistikGolonganTable = ({
	data,
}: StatistikGolonganTableProps) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="bg-primary">
					<TableHead className="border text-center text-primary-foreground" rowSpan={2}>
						NO
					</TableHead>
					<TableHead className="border text-center text-primary-foreground" rowSpan={2}>
						GOL.
					</TableHead>
					<TableHead className="border text-center text-primary-foreground" rowSpan={2}>
						PANGKAT
					</TableHead>
					<TableHead className="border text-center text-primary-foreground" colSpan={2}>
						JENIS KELAMIN
					</TableHead>
					<TableHead className="border text-center text-primary-foreground" rowSpan={2}>
						TOTAL
					</TableHead>
				</TableRow>
				<TableRow className="bg-primary">
					<TableHead className="border text-center text-primary-foreground">LK</TableHead>
					<TableHead className="border text-center text-primary-foreground">PR</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow key={item.golongan}>
						<TableCell className="border" align="right">
							{urut++}
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
                        {data.reduce((acc, item) => acc + item.total, 0)}
                    </TableCell>

                </TableRow>
            </TableFooter>
		</Table>
	);
};

export default StatistikGolonganTable;
