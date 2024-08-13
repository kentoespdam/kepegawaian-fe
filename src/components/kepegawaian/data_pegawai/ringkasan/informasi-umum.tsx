import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";
import type { Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";

interface InformasiUmumProps {
    pegawai?: Pegawai
    bio?: Biodata
}
const InformasiUmum = ({ pegawai, bio }: InformasiUmumProps) => {

    return (
        <Fieldset title="Informasi Umum">
            <div className="grid gap-1">
                <RingkasanContent field="NIPAM" value={pegawai?.nipam} />
                <RingkasanContent field="Nama Lengkap" value={pegawai?.biodata.nama} />
                <RingkasanContent field="Jenis Kelamin" value={bio?.jenisKelamin.replace("_", " ")} />
                <RingkasanContent field="Tempat Lahir" value={bio?.tempatLahir} />
                <RingkasanContent field="Tanggal Lahir" value={bio?.tanggalLahir} />
                <RingkasanContent field="Status Perkawinan" value={bio?.statusKawin.replace("_", " ")} />
                <RingkasanContent field="Alamat" value={bio?.alamat} />
                <RingkasanContent field="No KTP" value={bio?.nik} />
                <RingkasanContent field="Agama" value={bio?.agama} />
                <RingkasanContent field="Telp" value={bio?.telp} />
                <RingkasanContent field="Email" value={""} />
                <RingkasanContent field="Kode Pajak" value={""} />
                <RingkasanContent field="Nama Ibu Kandung" value={bio?.ibuKandung} />
            </div>
        </Fieldset>
    );
}

export default InformasiUmum;