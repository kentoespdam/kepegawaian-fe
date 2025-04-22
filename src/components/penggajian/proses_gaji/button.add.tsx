"use client";
import { GajiBatchRootSchema } from "@_types/penggajian/gaji_batch_root";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputFileZod from "@components/form/zod/file";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root";
import { useGlobalMutation } from "@store/query-store";
import { PlusCircleIcon, SaveIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { saveGajiBatchRoot } from "./action";
import type { Pegawai } from "@_types/pegawai";

interface AddProsesGajiButonProps {
    pegawai: Pegawai
}
const AddProsesGajiButon = ({ pegawai }: AddProsesGajiButonProps) => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)

    const { addOpen, setAddOpen } = useGajiBatchRootStore(state => ({
        addOpen: state.addOpen,
        setAddOpen: state.setAddOpen
    }))

    const today = new Date()
    const tahun = today.getFullYear()
    const bulan = today.getMonth() + 1

    const form = useForm<GajiBatchRootSchema>({
        resolver: zodResolver(GajiBatchRootSchema),
        defaultValues: {
            tahun: tahun.toString(),
            bulan: bulan < 10 ? `0${bulan}` : bulan.toString(),
            diProsesOleh: "",
            jabatanPemroses: "",
        },
        values: {
            tahun: tahun.toString(),
            bulan: bulan < 10 ? `0${bulan}` : bulan.toString(),
            diProsesOleh: pegawai?.biodata.nama,
            jabatanPemroses: pegawai?.jabatan.nama,
        },
    })
    const onClose = () => {
        form.reset()
        setAddOpen(false)
    }

    const mutation = useGlobalMutation({
        mutationFunction: saveGajiBatchRoot,
        queryKeys: [["gaji_batch_root", search.toString()]],
        actHandler: onClose
    })

    const onSubmit = (data: GajiBatchRootSchema) => {
        const formData = new FormData()
        if (data.fileName)
            formData.set("fileName", data.fileName[0], data.fileName[0].name)
        for (const key in data) {
            if (key === "fileName") continue
            formData.set(key, data[key as keyof GajiBatchRootSchema])
        }
        mutation.mutate(formData)
    }

    return (
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <TooltipBuilder text="Buat Proses Baru" delayDuration={100}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setAddOpen(true)}>
                        <PlusCircleIcon className="text-primary" />
                    </Button>
                </DialogTrigger>
            </TooltipBuilder>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Proses Baru</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-2">
                        <InputZod form={form} id="tahun" label="Tahun" />
                        <InputZod form={form} id="bulan" label="Bulan" />
                        <InputZod form={form} id="diProsesOleh" label="Di Proses Oleh" readonly />
                        <InputZod form={form} id="jabatanPemroses" label="Jabatan Pemroses" readonly />
                        <InputFileZod id="fileName" label="Lampiran Sk Terminasi" form={form} />
                        <div className="flex justify-end gap-2">
                            <LoadingButtonClient
                                type="submit"
                                title="Save"
                                pending={mutation.isPending}
                                icon={<SaveIcon />}
                            />
                            <Button type="reset" variant="destructive" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProsesGajiButon;