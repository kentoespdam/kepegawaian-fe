import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import Fieldset from "@components/ui/fieldset";
import { getDataById } from "@helpers/action";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import InformasiUmum from "./informasi-umum";
import InformasiAkademik from "./informasi-akademik";
import InformasiKepegawaian from "./informasi-kepegawaian";

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
                <CardTitle>Ringkasan Data Karyawan</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <InformasiUmum pegawai={pegawai} bio={bio.data} />
                <InformasiAkademik bio={bio.data} />
                <InformasiKepegawaian pegawai={pegawai} />
            </CardContent>
        </Card>
    );
}

export default RingkasanBiodata;