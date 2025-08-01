import type { Keahlian } from "@_types/profil/keahlian";
import LoadingTable from "@components/builder/table/loading";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { TelescopeIcon } from "lucide-react";

const CvRightKeahlian = ({ nik }: { nik: string }) => {
	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ["keahlian", nik],
		queryFn: async () =>
			await getPageDataEnc<Keahlian>({
				path: encodeString(`profil/keahlian/${nik}/biodata`),
				isRoot: true,
			}),
		enabled: !!nik || nik === "",
	});
	return (
		<div className="grid gap-2">
			<div className="w-full flex gap-2 items-center bg-gray-900 text-white px-2 py-1">
				<TelescopeIcon className="w-4 h-4" />
				<span>Data Keahlian</span>
			</div>
			<Table className="border-y pb-4">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black font-bold">
							Jenis Keahlian
						</TableHead>
						<TableHead className="text-black font-bold">
							Tingkat Keahlian
						</TableHead>
						<TableHead className="text-black font-bold">Sertifikat</TableHead>
						<TableHead className="text-black font-bold">
							Lembaga Pemberi Sertifikat
						</TableHead>
						<TableHead className="text-black font-bold">Tahun</TableHead>
					</TableRow>
				</TableHeader>
				{isLoading ||
				isFetching ||
				isError ||
				!data ||
				data.content.length === 0 ? (
					<LoadingTable
						columns={5}
						isLoading={isLoading}
						isFetching={isFetching}
					/>
				) : (
					<TableBody>
						{data.content.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.jenisKeahlian.nama}</TableCell>
								<TableCell>{item.kualifikasi}</TableCell>
								<TableCell>{item.sertifikasi ? "Ya" : "Tidak"}</TableCell>
								<TableCell>{item.institusi}</TableCell>
								<TableCell>{item.tahun}</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default CvRightKeahlian;
