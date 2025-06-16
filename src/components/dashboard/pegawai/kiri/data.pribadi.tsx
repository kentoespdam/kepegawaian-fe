import { getStatusKawinLabel } from "@_types/enums/status_kawin";
import type { PegawaiDetail } from "@_types/pegawai";
import type { Pendidikan } from "@_types/profil/pendidikan";
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
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";

type KiriDataPribadiProps = {
	pegawai: PegawaiDetail;
};
const KiriDataPribadi = ({ pegawai }: KiriDataPribadiProps) => {
	const { data: pendidikanTerakhir } = useQuery({
		queryKey: ["pendidikan-terakhir", pegawai.biodata.nik],
		queryFn: async () =>
			await getPageDataEnc<Pendidikan>({
				path: encodeString(`profil/pendidikan/${pegawai.biodata.nik}/biodata`),
				isRoot: true,
				searchParams: "isLatest=true",
			}),
	});

	return (
		<AccordionItem value="data-pribadi">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Pribadi
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="flex justify-between p-2">
					<span className="font-semibold">Status :</span>
				</div>
				<Table className="border border-l-4">
					<TableHeader>
						<TableRow>
							<TableHead
								colSpan={3}
								className="h-auto font-semibold p-1 text-primary"
							>
								Data Pribadi
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								NIK / NIPAM
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.nipam}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Nama Lengkap</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.nama}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Jenis Kelamin
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.jenisKelamin === "LAKI_LAKI"
									? "Pria"
									: "Wanita"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Tempat Lahir</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.tempatLahir}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Tgl. Lahir</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.tanggalLahir}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Status Perkawinan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{getStatusKawinLabel(pegawai.biodata.statusKawin)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Alamat</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.alamat}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								No. Identitas
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.nik}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Agama</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.agama.replace("_", " ")}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								No. Handphone
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.telp}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Email</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.email}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Kode Pajak</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.kodePajak?.kode}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Nama Ibu Kandung
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pegawai.biodata.ibuKandung}
							</TableCell>
						</TableRow>
					</TableBody>
					<TableHeader>
						<TableRow>
							<TableHead
								colSpan={3}
								className="h-auto font-semibold p-1 text-primary border-t"
							>
								Pendidikan Terakhir
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="p-1 align-text-top">Tingkat</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pendidikanTerakhir?.content.length === 0
									? "-"
									: pendidikanTerakhir?.content[0].jenjangPendidikan.nama}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">Jurusan</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pendidikanTerakhir?.content.length === 0
									? "-"
									: pendidikanTerakhir?.content[0].jurusan}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Lembaga Pendidikan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pendidikanTerakhir?.content.length === 0
									? "-"
									: pendidikanTerakhir?.content[0].institusi}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="p-1 align-text-top">
								Tahun Kelulusan
							</TableCell>
							<TableCell className="p-1 align-text-top">:</TableCell>
							<TableCell className="p-1 align-text-top">
								{pendidikanTerakhir?.content.length === 0
									? "-"
									: pendidikanTerakhir?.content[0].tahunLulus}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KiriDataPribadi;
