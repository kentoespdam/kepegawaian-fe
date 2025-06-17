import {
	type StatusPegawai,
	statusPegawaiName,
} from "@_types/master/status_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { tanggalIndonesia } from "@helpers/tanggal";
import { useQuery } from "@tanstack/react-query";

const KiriDataKepegawaian = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	const {
		data: statusPegawaiList,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["status-pegawai"],
		queryFn: async () =>
			await getListDataEnc<StatusPegawai>({
				path: encodeString("status-pegawai"),
			}),
	});
	const tglMulaiKerja = new Date(pegawai.tmtKerja ?? "");
	const timeDiff = Date.now() - tglMulaiKerja.getTime();
	const masaKerjaTahun = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
	const totalMasaKerjaBulan = Math.floor(timeDiff / (1000 * 3600 * 24) / 30);
	const masaKerjaBulan = totalMasaKerjaBulan - masaKerjaTahun * 12;

	return isLoading || isFetching ? null : (
		<AccordionItem value="data-kepegawaian">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Kepegawaian
			</AccordionTrigger>
			<AccordionContent className="grid border-t">
				<Table className="border-l-4 text-xs">
					<TableHeader>
						<TableRow>
							<TableHead
								colSpan={3}
								className="h-auto font-semibold p-1 text-primary"
							>
								Data Kepegawaian
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="p-1 align-text-top">Status</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{statusPegawaiName(
									statusPegawaiList ?? [],
									pegawai.statusPegawai,
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Unit Kerja</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.organisasi.nama}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Jabatan</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.jabatan.nama}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Pangkat Golongan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.golongan.golongan}-{pegawai.golongan.pangkat}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">TMT Golongan</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{tanggalIndonesia(pegawai.skGolongan?.tmtBerlaku)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Masa Kerja Golongan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.mkgTahun} Thn - {pegawai.mkgBulan} Bln
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Tgl. Mulai Kerja
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{tanggalIndonesia(pegawai.tmtKerja ?? "")}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Tgl. Pengangkatan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{tanggalIndonesia(pegawai.skPegawai?.tmtBerlaku ?? "")}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Masa Kerja Keseluruhan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{masaKerjaTahun} Thn - {masaKerjaBulan} Bln
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Status BPJS</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.isAskes ? "Ya" : "Tidak"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								ID Mesin Absen
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.absensiId}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								ID Mesin Absen
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{
									pegawai.biodata.kartuIdentitas.find(
										(item) => item.jenisKartu.nama === "NPWP",
									)?.nomorKartu
								}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KiriDataKepegawaian;
