import type { Pageable } from "@_types/index";
import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface FormRiwayatMutasiWarnigSpProps {
	riwayatSp?: Pageable<RiwayatSp>;
}
const FormRiwayatMutasiWarnigSp = ({
	riwayatSp,
}: FormRiwayatMutasiWarnigSpProps) => {
	if (!riwayatSp || riwayatSp.empty) return null;
	const now = new Date();
	const tahun = now.getFullYear();
	const filteredRiwayatSp = riwayatSp.content.filter((item) => {
		const tgl = new Date(item.tanggalEksekusiSanksi);
		const tahunSanksi = tgl.getFullYear();
		return tahunSanksi === tahun && item.jenisSp.id > 1;
	});
	if (filteredRiwayatSp.length === 0) return null;
	return filteredRiwayatSp.map((item) => (
		<Alert key={item.id} variant="destructive">
			<AlertCircleIcon className="h-4 w-4" />
			<AlertTitle>
				({item.jenisSp.kode}) {item.jenisSp.nama} - (
				<span className="font-bold">{item.tanggalEksekusiSanksi}</span>)
			</AlertTitle>
			<AlertDescription>{item.sanksi.keterangan}</AlertDescription>
		</Alert>
	));
};

export default FormRiwayatMutasiWarnigSp;
