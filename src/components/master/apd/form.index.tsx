"use client"

import { type Apd, ApdSchema } from "@_types/master/apd";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApdStore } from "@store/master/apd";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveApd } from "./action";

interface ApdFormComponentProps {
    profesiId?: number,
    data?: Apd
}
const ApdFormComponent = ({ profesiId, data }: ApdFormComponentProps) => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const callbackUrl = search.get("callback") ? atob(search.get("callback") as string) : ""
    const router = useRouter()

    const { defaultValues, setDefaultValues } = useApdStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<ApdSchema>({
        resolver: zodResolver(ApdSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveApd,
        queryKeys: [["apd"]],
        redirectTo: search.get("callback") ? callbackUrl : "/master/apd"
    })

    const onSubmit = (values: ApdSchema) => {
        mutation.mutate(values)
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    useEffect(() => setDefaultValues({ data: data, profesiId: profesiId }), [setDefaultValues, data, profesiId])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid gap-2"
            >
                <InputZod type="number" id="id" label="ID" form={form} />
                <InputZod type="number" id="profesiId" label="Profesi ID" form={form} />
                <InputZod id="nama" label="Nama Apd" form={form} />
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
    )

}

export default ApdFormComponent;