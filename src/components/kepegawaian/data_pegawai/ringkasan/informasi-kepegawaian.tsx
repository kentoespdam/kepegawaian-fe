import type { Pegawai } from "@_types/pegawai";
import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";

interface InformasiKepegawaianProps {
    pegawai?: Pegawai
}
const InformasiKepegawaian = ({ pegawai }: InformasiKepegawaianProps) => {
    return (
        <Fieldset title="Informasi Kepegawaian">
            <div className="w-full grid gap-1">
                <RingkasanContent field="Status" value={pegawai?.statusPegawai.nama} />
                <RingkasanContent field="Pangkat Golongan" value={`${pegawai?.golongan.golongan} - ${pegawai?.golongan.pangkat}`} />
                <RingkasanContent field="TMT Golongan" value={pegawai?.tanggalTmtSk} />
                <RingkasanContent field="Masa Kerja Golongan" value={""} />
                <RingkasanContent field="Unit Kerja" value={pegawai?.organisasi.nama} />
                <RingkasanContent field="Jabatan" value={""} />
                <RingkasanContent field="Tgl. Mulai Kerja" value={""} />
                <RingkasanContent field="Tgl. Pengangkatan" value={""} />
                <RingkasanContent field="TMT Pensiun" value={""} />
                <RingkasanContent field="Status BPJS Kesehatan" value={""} />
                <RingkasanContent field="ID Mesin Absen" value={""} />
                <RingkasanContent field="No Kontrak" value={""} />
                <RingkasanContent field="No NPWP" value={""} />
                <RingkasanContent field="No Jamsostek" value={""} />
                <RingkasanContent field="No BPJS Kes" value={""} />
                <RingkasanContent field="ID Card" value={""} />
            </div>
        </Fieldset>
    );
}

export default InformasiKepegawaian;