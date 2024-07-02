import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import Fieldset from "@components/ui/fieldset";
import { getDataById } from "@helpers/action";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface InformasiUmumContentProps {
    field: string
    value?: string
}
const InformasiUmumContent = (props: InformasiUmumContentProps) => {
    return (
        <div className="w-full grid grid-cols-2 items-top gap-1 text-[.775rem]">
            <div className="border-l-4 border-l-primary pl-1 flex justify-between">
                <span>{props.field}</span> <span>:</span>
            </div>
            <div>{props.value ?? ""}</div>
        </div>
    )
}

const RingkasanBiodata = () => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const { pegawaiId, pegawaiNik } = useRingkasanPegawaiStore()

    const qc = useQueryClient()
    const qs = qc.getQueryState<Pageable<Pegawai>>(["data-pegawai", params.toString()])
    const bio = useQuery({
        queryKey: ["biodata", pegawaiNik],
        queryFn: async () => await getDataById<Biodata>({
            path: "profil/biodata",
            id: String(pegawai?.biodata.nik),
            isRoot: true
        }),
        enabled: !!pegawaiNik
    })

    const pegawai = qs?.data?.content.find(pegawai => pegawai.id === pegawaiId)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daftar Biodata</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Fieldset title="Informasi Umum">
                    <div className="w-full grid gap-1">
                        <InformasiUmumContent field="NIPAM" value={pegawai?.nipam} />
                        <InformasiUmumContent field="Nama Lengkap" value={pegawai?.biodata.nama} />
                        <InformasiUmumContent field="Jenis Kelamin" value={bio.data?.jenisKelamin.replace("_", " ")} />
                        <InformasiUmumContent field="Tempat Lahir" value={bio.data?.tempatLahir} />
                        <InformasiUmumContent field="Tanggal Lahir" value={bio.data?.tanggalLahir} />
                        <InformasiUmumContent field="Status Perkawinan" value={bio.data?.statusKawin.replace("_", " ")} />
                        <InformasiUmumContent field="Alamat" value={bio.data?.alamat} />
                        <InformasiUmumContent field="No KTP" value={bio.data?.nik} />
                        <InformasiUmumContent field="Agama" value={bio.data?.agama} />
                        <InformasiUmumContent field="Telp" value={bio.data?.telp} />
                        <InformasiUmumContent field="Email" value={""} />
                        <InformasiUmumContent field="Kode Pajak" value={""} />
                        <InformasiUmumContent field="Nama Ibu Kandung" value={bio.data?.ibuKandung} />
                    </div>
                </Fieldset>
                <Fieldset title="Informasi Akademik">
                    <div className="w-full grid gap-1">
                        <InformasiUmumContent field="Pendidikan Terakhir" value={bio.data?.pendidikanTerakhir.nama} />
                        <InformasiUmumContent field="Lembaga Pendidikan" value={""} />
                        <InformasiUmumContent field="Tahun Kelulusan" value={""} />
                    </div>
                </Fieldset>
                <Fieldset title="Informasi Kepegawaian">
                    <div className="w-full grid gap-1">
                    <InformasiUmumContent field="Status" value={pegawai?.statusPegawai.nama} />
                    <InformasiUmumContent field="Pangkat Golongan" value={`${pegawai?.golongan.golongan} - ${pegawai?.golongan.pangkat}`} />
                    <InformasiUmumContent field="TMT Golongan" value={pegawai?.tanggalTmtSk} />
                    <InformasiUmumContent field="Masa Kerja Golongan" value={""} />
                    <InformasiUmumContent field="Unit Kerja" value={pegawai?.organisasi.nama} />
                    </div>
                </Fieldset>
            </CardContent>
        </Card>
    );
}

export default RingkasanBiodata;