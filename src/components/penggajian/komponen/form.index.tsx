"use client";
import { KomponenGajiSchema, type KomponenGaji, type KomponenGajiMini } from "@_types/penggajian/komponen";
import type { ProfilGaji } from "@_types/penggajian/profil";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import SelectJenisGajiZod from "@components/form/zod/jenis_gaji";
import TextAreaZod from "@components/form/zod/textarea";
import YesNoZod from "@components/form/zod/yes-no";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKomponenGajiStore } from "@store/penggajian/komponen";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveKomponenGaji } from "./action";
import AvailableCodeButton from "./button.available.kode";

interface KomponenGajiFormComponentProps {
    availableCode: KomponenGajiMini[]
    profilGaji: ProfilGaji
    urut?: number
    komponenGaji?: KomponenGaji
}
const KomponenGajiFormComponent = ({ availableCode, profilGaji, urut, komponenGaji }: KomponenGajiFormComponentProps) => {
    const { defaultValues, setDefaultValues, setUrut } = useKomponenGajiStore();
    const router = useRouter()

    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const callbackUrl = search.get("callback") ? atob(search.get("callback") as string) : ""

    const form = useForm<KomponenGajiSchema>({
        resolver: zodResolver(KomponenGajiSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveKomponenGaji,
        queryKeys: [["komponen_gaji", profilGaji.id]],
        redirectTo: callbackUrl
    })

    const onSubmit = (data: KomponenGajiSchema) => {
        mutation.mutate(data)
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    const isReference = form.watch("isReference")

    useEffect(() => {
        setDefaultValues({
            profilGaji: profilGaji,
            urut: urut,
            val: komponenGaji
        })
    }, [
        setDefaultValues,
        profilGaji,
        urut,
        komponenGaji
    ])

    return (<Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2"
        >
            <InputZod id="id" label="ID" form={form} className="hidden" />
            <InputZod id="profilGajiId" label="Profil Gaji" form={form} className="hidden" />
            <InputZod id="profilGajiName" label="Profil Gaji" form={form} readonly />
            <div className="grid grid-cols-12 gap-2">
                <InputZod type="number" id="urut" label="Urut" form={form} className="col-span-1" />
                <InputZod id="kode" label="Kode" form={form} className="col-span-3" />
                <InputZod id="nama" label="Nama" form={form} className="col-span-8" />
            </div>
            <SelectJenisGajiZod id="jenisGaji" label="Jenis Gaji" form={form} />
            <InputZod type="number" id="nilai" label="Nilai" form={form} />
            <YesNoZod id="isReference" label="Is Reference" form={form} />
            <TextAreaZod id="formula" label="Formula" form={form} readonly={isReference} />
            <AvailableCodeButton availableCode={availableCode} form={form} currentCode={komponenGaji?.kode} />
            <div className="mt-2 flex gap-2 justify-end">
                <TooltipBuilder text="Save" delayDuration={100}>
                    <LoadingButtonClient
                        pending={mutation.isPending}
                        type="submit"
                        title="Save"
                        icon={<SaveIcon />} />
                </TooltipBuilder>
                <TooltipBuilder text="Cancel" delayDuration={100} className="bg-destructive text-destructive-foreground">
                    <Button
                        type="reset"
                        onClick={cancelHandler}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
                    >
                        Batal
                    </Button>
                </TooltipBuilder>
            </div>
        </form>
    </Form>
    )
}

export default KomponenGajiFormComponent;