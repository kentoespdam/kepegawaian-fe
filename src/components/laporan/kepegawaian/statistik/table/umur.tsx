import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

const UmurTable1 = ({ data }: { data: StatistikUmurRoot }) => {
	let urut = 1;
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">NO</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">UMUR</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">JML</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.umur.map((item) => (
					<TableRow key={item.umur}>
						<TableCell className="border p-1" align="right" width={30}>
							{urut++}
						</TableCell>
						<TableCell className="border p-1 text-nowrap">
							{item.umur} Tahun
						</TableCell>
						<TableCell className="border p-1" align="right" width={50}>
							{item.total}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const UmurTable2 = ({ data }: { data: StatistikUmurRoot }) => {
	let urut = 1;
	return (
		<Table>
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">NO</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">UMUR</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">JML</TableHead>
					<TableHead className="text-center bg-primary text-primary-foreground border-x text-nowrap h-10">
						PERSEN
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.range.map((item) => (
					<TableRow key={item.range}>
						<TableCell className="border p-1" align="right" width={30}>
							{urut++}
						</TableCell>
						<TableCell className="border p-1">{item.range} Tahun</TableCell>
						<TableCell className="border p-1" align="right" width={50}>
							{item.total}
						</TableCell>
						<TableCell className="border p-1" align="right" width={50}>
							{item.persen}%
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const StatistikUmurTable = ({ data }: { data: StatistikUmurRoot }) => {
	return (
		<div className="w-full flex gap-2">
			<UmurTable1 data={data} />
			<UmurTable2 data={data} />
		</div>
	);
};

export default StatistikUmurTable;
