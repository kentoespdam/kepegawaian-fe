"use client"

import { type PendapatanNonPajak, PendapatanNonPajakSchema } from "@_types/penggajian/pendapatan_non_pajak";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKodePajakStore } from "@store/penggajian/kode_pajak";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveKodePajak } from "../action";
import { Button } from "@components/ui/button";
import TextAreaZod from "@components/form/zod/textarea";

interface KodePajakFormComponentProps {
    data?: PendapatanNonPajak
}
const KodePajakFormComponent = ({ data }: KodePajakFormComponentProps) => {
    const router = useRouter()
    const { defaultValues, setDefaultValues } = useKodePajakStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<PendapatanNonPajakSchema>({
        resolver: zodResolver(PendapatanNonPajakSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveKodePajak,
        queryKeys: [["kode_pajak"]],
        redirectTo: "/penggajian/kode_pajak"
    })

    const onSubmit = (values: PendapatanNonPajakSchema) => {
        mutation.mutate(values)
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    useEffect(() => setDefaultValues(data), [setDefaultValues, data])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid gap-2">
                <InputZod id="id" label="Id" form={form} className="hidden" />
                <InputZod id="kode" label="Kode" form={form} readonly={!!data} />
                <InputZod type="number" id="nominal" label="Nominal" form={form} />
                <TextAreaZod id="notes" label="Notes" form={form} />
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

export default KodePajakFormComponent;