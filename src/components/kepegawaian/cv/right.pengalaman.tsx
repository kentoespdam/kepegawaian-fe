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
import { getPageData } from "@helpers/action";
import { hitungUmur } from "@helpers/tanggal";
import { useQuery } from "@tanstack/react-query";
import { FileStackIcon } from "lucide-react";

const CvRightPengalamanKerja = ({ nik }: { nik: string }) => {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ["pengalaman-kerja", nik],
		queryFn: () =>
			getPageData<PengalamanKerja>({
				path: `profil/pengalaman/${nik}/biodata`,
				isRoot: true,
			}),

		enabled: !!nik,
	});
	return (
		<div className="grid gap-2">
			<div className="w-full flex gap-2 items-center bg-gray-900 text-white pl-1">
				<FileStackIcon className="w-4 h-4" />
				<span>Data Pengalaman Kerja</span>
			</div>
			<Table className="border-y mb-4">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black font-bold">Masa Kerja</TableHead>
						<TableHead className="text-black font-bold">
							Nama Perusahaan
						</TableHead>
						<TableHead className="text-black font-bold">Bidang</TableHead>
						<TableHead className="text-black font-bold">
							Posisi/Jabatan
						</TableHead>
					</TableRow>
				</TableHeader>
				{isLoading ||
				isFetching ||
				error ||
				!data ||
				data.content.length === 0 ? (
					<LoadingTable
						columns={4}
						isLoading={isLoading}
						isFetching={isFetching}
					/>
				) : (
					<TableBody>
						{data.content.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									{hitungUmur(item.tanggalMasuk, item.tanggalKeluar)}
								</TableCell>
								<TableCell>{item.namaPerusahaan}</TableCell>
								<TableCell>{item.typePerusahaan}</TableCell>
								<TableCell>{item.jabatan}</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default CvRightPengalamanKerja;
