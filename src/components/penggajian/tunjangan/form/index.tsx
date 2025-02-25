"use client"

import { TunjanganSchema, type Tunjangan } from "@_types/penggajian/tunjangan";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import SelectJenisTunjanganZod from "@components/form/zod/jenis-tunjangan";
import SelectLevelZod from "@components/form/zod/level";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTunjanganStore } from "@store/penggajian/tunjangan";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveTunjangan } from "../action";

interface TunjanganFormComponentProps {
    jenisTunjangan: string
    data?: Tunjangan
}
const TunjanganFormComponent = ({ jenisTunjangan, data }: TunjanganFormComponentProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const redirectTo = params.get("callback") ? atob(params.get("callback") as string) : ""
    const search = new URLSearchParams(redirectTo)
    search.delete("callback")
    const { defaultValues, setDefaultValues } = useTunjanganStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<TunjanganSchema>({
        resolver: zodResolver(TunjanganSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveTunjangan,
        queryKeys: [["tunjangan", search.toString()]],
        redirectTo: redirectTo
    })

    const onSubmit = (values: TunjanganSchema) => {
        mutation.mutate(values)
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    useEffect(() => setDefaultValues(jenisTunjangan, data), [setDefaultValues, jenisTunjangan, data])


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid gap-2">
                <InputZod id="id" label="Id" form={form} className="hidden" />
                <SelectJenisTunjanganZod id="jenisTunjangan" label="Jenis Tunjangan" form={form} />
                <SelectLevelZod id="levelId" label="Level" form={form} />
                <SelectGolonganZod id="golonganId" label="Golongan" form={form} />
                <InputZod type="number" id="nominal" label="Nominal" form={form} />
                <div className="mt-2 flex gap-2 justify-end">
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

export default TunjanganFormComponent;