import type { PegawaiRingkas } from "@_types/pegawai";
import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";

interface InformasiAkademikProps {
	pegawai?: PegawaiRingkas;
}
const InformasiAkademik = ({ pegawai }: InformasiAkademikProps) => {
	return (
		<Fieldset title="Informasi Akademik">
			<div className="w-full grid gap-1">
				<RingkasanContent
					field="Pendidikan Terakhir"
					value={pegawai?.pendidikanTerakhir}
				/>
				<RingkasanContent field="Lembaga Pendidikan" value={pegawai?.lembagaPendidikan} />
				<RingkasanContent field="Tahun Kelulusan" value={pegawai?.tahunLulus?.toString() ?? "-"} />
			</div>
		</Fieldset>
	);
};

export default InformasiAkademik;
