import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";
import type { Biodata } from "@_types/profil/biodata";

interface InformasiAkademikProps {
    bio?: Biodata
}
const InformasiAkademik = ({ bio }: InformasiAkademikProps) => {
    return (
        <Fieldset title="Informasi Akademik">
            <div className="w-full grid gap-1">
                <RingkasanContent field="Pendidikan Terakhir" value={bio?.pendidikanTerakhir.nama} />
                <RingkasanContent field="Lembaga Pendidikan" value={""} />
                <RingkasanContent field="Tahun Kelulusan" value={""} />
            </div>
        </Fieldset>
    );
}

export default InformasiAkademik;