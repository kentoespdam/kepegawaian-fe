"use client"

import { RefNonPegawai, RefPegawai } from "@_types/pegawai";
import PegawaiActionComponent from "@components/kepegawaian/data_pegawai/add/action";
import PegawaiBiodataComponent from "@components/kepegawaian/data_pegawai/add/biodata";
import PegawaiDetailComponent from "@components/kepegawaian/data_pegawai/add/detail_pegawai";
import ReferensiPegawaiComponent from "@components/kepegawaian/data_pegawai/add/referensi";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import { useForm } from "react-hook-form";


const PegawaiForm = () => {
    const store = useAddBiodataStore()
    const form = store.referensi === "biodata" ?
        useForm<RefNonPegawai>({ resolver: zodResolver(RefNonPegawai) }) :
        useForm<RefPegawai>({ resolver: zodResolver(RefPegawai) })

    const onSubmit = (values: RefNonPegawai | RefPegawai) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <ReferensiPegawaiComponent form={form} />

                <PegawaiDetailComponent form={form} />

                <PegawaiBiodataComponent form={form} />

                <PegawaiActionComponent pending={false} />
            </form>
        </Form>
    )

}

export default PegawaiForm;