import type { Pageable } from "@_types/index";
import type { PengalamanKerja } from "@_types/profil/pengalaman_kerja";
import LoadingTable from "@components/builder/table/loading";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { FileStackIcon } from "lucide-react";

const CvRightPrestasiTableBody = ({
	data,
}: { data: Pageable<PengalamanKerja> }) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

const CvRightPrestasi = ({ nik }: { nik: string }) => {
	// const { data, isLoading, isFetching } = useQuery({
	// 	queryKey: ["pengalaman-kerja", nik],
	// 	queryFn: () =>
	// 		getPageDataEnc<PengalamanKerja>({
	// 			path: encodeString(`profil/pengalaman/${nik}/biodata`),
	// 			isRoot: true,
	// 		}),
	// 	enabled: !!nik,
	// });
	return (
		<div className="grid gap-2">
			<div className="w-full flex gap-2 items-center bg-gray-900 text-white px-2 py-1">
				<FileStackIcon className="w-4 h-4" />
				<span>Data Prestasi</span>
			</div>
			<Table className="border-y mb-4">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black font-bold">
							Tanggal Diperoleh
						</TableHead>
						<TableHead className="text-black font-bold">
							Nama Penghargaan
						</TableHead>
						<TableHead className="text-black font-bold">
							Diberikan Oleh
						</TableHead>
						<TableHead className="text-black font-bold">Keterangan</TableHead>
					</TableRow>
				</TableHeader>
				{/* {data && !data.empty ? (
					<CvRightPrestasiTableBody data={data} />
				) : ( */}
				<LoadingTable columns={4} isLoading={false} />
				{/* )} */}
			</Table>
		</div>
	);
};

export default CvRightPrestasi;
