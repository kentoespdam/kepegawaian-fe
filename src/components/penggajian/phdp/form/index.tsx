"use client";
import { PhdpSchema, type Phdp } from "@_types/penggajian/phdp";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePhdpStore } from "@store/penggajian/phdp";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { savePhdp } from "../action";
import TextAreaZod from "@components/form/zod/textarea";

interface PhdpFormProps {
    data?: Phdp
}
const PhdpFormComponent = ({ data }: PhdpFormProps) => {
    const router = useRouter()
    const { defaultValues, setDefaultValues } = usePhdpStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<PhdpSchema>({
        resolver: zodResolver(PhdpSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: savePhdp,
        queryKeys: [["phdp"]],
        redirectTo: "/penggajian/phdp"
    })

    const onSubmit = (values: PhdpSchema) => {
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
                <InputZod id="urut" label="urut" form={form} type="number" />
                <TextAreaZod id="kondisi" label="Kondisi" form={form} />
                <TextAreaZod id="formula" label="Formula" form={form} />
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

export default PhdpFormComponent;