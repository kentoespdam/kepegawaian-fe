"use client"

import { ConditionalSchema, type RefPegawai } from "@_types/pegawai";
import type { BiodataSchema } from "@_types/profil/biodata";
import PegawaiActionComponent from "@components/kepegawaian/data_pegawai/add/action";
import PegawaiBiodataComponent from "@components/kepegawaian/data_pegawai/add/biodata";
import PegawaiDetailComponent from "@components/kepegawaian/data_pegawai/add/detail_pegawai";
import ReferensiPegawaiComponent from "@components/kepegawaian/data_pegawai/add/referensi";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import { useOrgJab } from "@store/org-jab";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { saveKepegawaian } from "../action";

type PegawaiFormProps = {
    pegawai?: z.infer<typeof RefPegawai>
    biodata?: z.infer<typeof BiodataSchema>
}

const PegawaiForm = ({ pegawai, biodata }: PegawaiFormProps) => {
    const { setOrganisasiId, organisasiId } = useOrgJab()
    if (pegawai) {
        setOrganisasiId(pegawai?.organisasiId ?? 0)
    }
    const store = useAddBiodataStore()
    const form = useForm<z.infer<typeof ConditionalSchema>>({
        resolver: zodResolver(ConditionalSchema),
        defaultValues: {
            referensi: "pegawai",
            nik: biodata?.nik ?? "1234567890123456",
            nama: biodata?.nama ?? "BAGUS SUDRAJAT",
            jenisKelamin: biodata?.jenisKelamin ?? "LAKI_LAKI",
            tempatLahir: biodata?.tempatLahir ?? "BANYUMAS",
            tanggalLahir: biodata?.tanggalLahir ?? "1990-08-08",
            alamat: biodata?.alamat ?? "PURWOKERTO",
            telp: biodata?.telp ?? "085123456789",
            agama: biodata?.agama ?? 1,
            ibuKandung: biodata?.ibuKandung ?? "BIYUNGE",
            pendidikanTerakhirId: biodata?.pendidikanTerakhirId ?? 7,
            golonganDarah: biodata?.golonganDarah ?? "O",
            statusKawin: biodata?.statusKawin ?? 0,
            notes: biodata?.notes ?? "",
            nipam: "1234567890",
            noSk: "",
            organisasiId: organisasiId,
        }
    })

    const mutation = useMutation({
        mutationFn: saveKepegawaian
    })

    const onSubmit = (values: z.infer<typeof ConditionalSchema>) => {
        mutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <ReferensiPegawaiComponent form={form} />
                {store.referensi === "pegawai" ?
                    <PegawaiDetailComponent form={form} /> : null}

                <PegawaiBiodataComponent form={form} />

                <PegawaiActionComponent pending={false} />
            </form>
        </Form>
    )

}

export default PegawaiForm;