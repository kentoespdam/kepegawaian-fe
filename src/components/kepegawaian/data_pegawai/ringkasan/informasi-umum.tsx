import type { PegawaiRingkas } from "@_types/pegawai";
import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";

interface InformasiUmumProps {
    pegawai?: PegawaiRingkas
}
const InformasiUmum = ({ pegawai }: InformasiUmumProps) => {

    return (
        <Fieldset title="Informasi Umum">
            <div className="grid gap-1">
                <RingkasanContent field="NIPAM" value={pegawai?.nipam} />
                <RingkasanContent field="Nama Lengkap" value={pegawai?.nama} />
                <RingkasanContent field="Jenis Kelamin" value={pegawai?.jenisKelamin} />
                <RingkasanContent field="Tempat Lahir" value={pegawai?.tempatLahir} />
                <RingkasanContent field="Tanggal Lahir" value={pegawai?.tanggalLahir} />
                <RingkasanContent field="Status Perkawinan" value={pegawai?.statusKawin.replace("_", " ")} />
                <RingkasanContent field="Alamat" value={pegawai?.alamat} />
                <RingkasanContent field="No KTP" value={pegawai?.nik} />
                <RingkasanContent field="Agama" value={pegawai?.agama} />
                <RingkasanContent field="Telp" value={pegawai?.telp} />
                <RingkasanContent field="Email" value={pegawai?.email} />
                <RingkasanContent field="Kode Pajak" value={pegawai?.kodePajak} />
                <RingkasanContent field="Nama Ibu Kandung" value={pegawai?.ibuKandung} />
            </div>
        </Fieldset>
    );
}

export default InformasiUmum;