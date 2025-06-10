import LoadingTable from "@components/builder/table/loading";
import { Table, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { FileStackIcon } from "lucide-react";

const CvRightPrestasi = ({ nik }: { nik: string }) => {
	// const { data, isLoading, isFetching, error } = useQuery({
	// 	queryKey: ["pengalaman-kerja", nik],
	// 	queryFn: () =>
	// 		getPageData<PengalamanKerja>({
	// 			path: `profil/pengalaman/${nik}/biodata`,
	// 			isRoot: true,
	// 		}),

	// 	enabled: !!nik,
	// });
	return (
		<div className="grid gap-2">
			<div className="w-full flex gap-2 items-center bg-gray-900 text-white pl-1">
				<FileStackIcon className="w-4 h-4" />
				<span>Data Pengalaman Kerja</span>
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
				<LoadingTable columns={4} isLoading={false} isFetching={false} />
			</Table>
		</div>
	);
};

export default CvRightPrestasi;
