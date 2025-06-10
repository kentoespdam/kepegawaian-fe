import type { Pendidikan } from "@_types/profil/pendidikan";
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
import { useQuery } from "@tanstack/react-query";
import { GraduationCapIcon } from "lucide-react";

const CvRightPendidikan = ({ nik }: { nik: string }) => {
	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ["pendidikan", nik],
		queryFn: () =>
			getPageData<Pendidikan>({
				path: `profil/pendidikan/${nik}/biodata`,
				isRoot: true,
			}),

		enabled: !!nik,
	});
	return (
		<div className="grid gap-2">
			<div className="w-full flex gap-2 items-center bg-gray-900 text-white pl-1">
				<GraduationCapIcon className="w-4 h-4" />
				<span>Data Riwayat Pendidikan</span>
			</div>
			<Table className="border-y mb-4">
				<TableHeader>
					<TableRow>
						<TableHead className="text-black font-bold">Tingkat</TableHead>
						<TableHead className="text-black font-bold">
							Lembaga pendidikan
						</TableHead>
						<TableHead className="text-black font-bold">Lulus</TableHead>
						<TableHead className="text-black font-bold">Jurusan</TableHead>
						<TableHead className="text-black font-bold">Gelar</TableHead>
					</TableRow>
				</TableHeader>
				{isLoading ||
				isFetching ||
				isError ||
				!data ||
				data.content.length === 0 ? (
					<LoadingTable
						columns={4}
						isLoading={isLoading}
						isFetching={isFetching}
					/>
				) : (
					<TableBody>
						{data?.content.map((pendidikan) => (
							<TableRow key={pendidikan.id}>
								<TableCell>{pendidikan.jenjangPendidikan.nama}</TableCell>
								<TableCell>{pendidikan.institusi}</TableCell>
								<TableCell>{pendidikan.tahunLulus}</TableCell>
								<TableCell>{pendidikan.jurusan}</TableCell>
								<TableCell>{pendidikan.gelarBelakang}</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default CvRightPendidikan;
