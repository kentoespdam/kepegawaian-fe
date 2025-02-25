"use client"
import { RefPotonganTkkSchema, type RefPotonganTkk } from "@_types/penggajian/ref_potongan_tkk";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import SelectLevelZod from "@components/form/zod/level";
import SelectStatusPegawaiZod from "@components/form/zod/status-pegawai";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRefPotonganTkkStore } from "@store/penggajian/ref_potongan_tkk";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveRefPotonganTkk } from "./action";

interface RefPotonganTkkFormProps {
    data?: RefPotonganTkk
}
const RefPotonganTkkFormComponent = ({ data }: RefPotonganTkkFormProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const callbackUrl = atob(params.get("callback") as string ?? "")

    const { defaultValues, setDefaultValues } = useRefPotonganTkkStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<RefPotonganTkkSchema>({
        resolver: zodResolver(RefPotonganTkkSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveRefPotonganTkk,
        queryKeys: [["ref_potongan_tkk"]],
        redirectTo: `/penggajian/potongan_tkk?${callbackUrl}`,
    })

    const onSubmit = (values: RefPotonganTkkSchema) => {
        mutation.mutate(values)
        // console.dir(values, { depth: 2 })
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    useEffect(() => {
        setDefaultValues(data)
    }, [setDefaultValues, data])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid grid-cols-2 gap-2">
                <InputZod id="id" label="ID" form={form} className="hidden" />
                <SelectStatusPegawaiZod id="statusPegawai" label="Status Pegawai" form={form} />
                <SelectLevelZod id="levelId" label="Level" form={form} />
                <SelectGolonganZod id="golonganId" label="Golongan" form={form} />
                <InputZod type="number" id="nominal" label="Nominal" form={form} />
                <div className="mt-2 flex col-span-2 gap-2 justify-end">
                    <LoadingButtonClient
                        pending={mutation.isPending}
                        type="submit"
                        title="Save"
                        icon={<SaveIcon />} />
                    <Button type="reset" variant="destructive" onClick={cancelHandler}>Batal</Button>
                </div>
            </form>
        </Form>
    );
}

export default RefPotonganTkkFormComponent;