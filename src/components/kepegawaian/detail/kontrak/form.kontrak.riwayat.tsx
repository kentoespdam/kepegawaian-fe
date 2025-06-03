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
import { dateToIndonesian } from "@helpers/string";
import { hitungSisaBulanHari } from "@helpers/tanggal";
import { useQuery } from "@tanstack/react-query";

const RiwayatMutasiBody = ({
	data,
	riwayatKontrak,
}: { data: Pageable<RiwayatKontrak>; riwayatKontrak?: RiwayatKontrak }) => {
	return data.content.map((item) => {
		const umur = hitungSisaBulanHari(
			new Date().toISOString(),
			item.tanggalSelesai,
		);

		return item.nomorKontrak !== riwayatKontrak?.nomorKontrak ? (
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
					{umur.bulan < 0 ? 0 : umur.bulan} Bulan{" "}
					{umur.bulan < 0 ? 0 : umur.hari} Hari
				</TableCell>
			</TableRow>
		) : null;
	});
};
const RiwayatKontrakForm = ({
	pegawaiId,
	riwayatKontrak,
}: { pegawaiId: number; riwayatKontrak?: RiwayatKontrak }) => {
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
					<TableBody className="border-b">
						{query.isLoading || query.isError || !query.data ? (
							<TableRow>
								<TableCell colSpan={4}>
									{query.isLoading ? "Loading data" : "Data Not Found!"}
								</TableCell>
							</TableRow>
						) : (
							<RiwayatMutasiBody
								data={query.data}
								riwayatKontrak={riwayatKontrak}
							/>
						)}
					</TableBody>
				</Table>
			</div>
		</Fieldset>
	);
};

export default RiwayatKontrakForm;
