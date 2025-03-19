import type { Pageable } from "@_types/index";
import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import Fieldset from "@components/ui/fieldset";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { dateToIndonesian, hitungSisaBulanHari } from "@helpers/string";
import { useQuery } from "@tanstack/react-query";

const RiwayatMutasiBody = ({ data }: { data: Pageable<RiwayatKontrak> }) => {
	return data.content.map((item) => {
		const umur = hitungSisaBulanHari(
			new Date().toISOString(),
			item.tanggalSelesai,
		);

		return (
			<TableRow key={item.id}>
				<TableCell className="border-x whitespace-nowrap">
					{item.nomorKontrak}
				</TableCell>
				<TableCell className="border-x whitespace-nowrap">
					{dateToIndonesian(item.tanggalMulai)}
				</TableCell>
				<TableCell className="border-x whitespace-nowrap">
					{dateToIndonesian(item.tanggalSelesai)}
				</TableCell>
				<TableCell className="border-x whitespace-nowrap">
					{umur.bulan < 0 ? 0 : umur.bulan} Bulan {umur.bulan < 0 ? 0 : umur.hari} Hari
				</TableCell>
			</TableRow>
		);
	});
};
const RiwayatKontrakForm = ({ pegawaiId }: { pegawaiId: number }) => {
	const query = useQuery({
		queryKey: ["riwayat-kontrak", pegawaiId],
		queryFn: () =>
			getPageData<RiwayatKontrak>({
				path: `kepegawaian/riwayat/kontrak/pegawai/${pegawaiId}`,
				isRoot: true,
			}),
	});
	return (
		<Fieldset title="Riwayat Kontrak">
			<div className="w-full h-36 scroll-auto overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center bg-primary text-primary-foreground border-x rounded-ss-lg border-l-0">
								Nomor Kontrak
							</TableHead>
							<TableHead className="text-center bg-primary text-primary-foreground border-x">
								Tanggal Mulai
							</TableHead>
							<TableHead className="text-center bg-primary text-primary-foreground border-x">
								Tanggal Selesai
							</TableHead>
							<TableHead className="text-center bg-primary text-primary-foreground border-x rounded-se-lg border-r-0">
								Sisa Masa Aktif
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{query.isLoading ? (
							<TableRow>
								<TableCell colSpan={4}>Loading data</TableCell>
							</TableRow>
						) : query.isError || !query.data ? (
							<TableRow>
								<TableCell colSpan={4}>Data Not Found!</TableCell>
							</TableRow>
						) : (
							<RiwayatMutasiBody data={query.data} />
						)}
					</TableBody>
				</Table>
			</div>
		</Fieldset>
	);
};

export default RiwayatKontrakForm;
