"use client";
import { ParameterSettingSchema, type ParameterSetting } from "@_types/penggajian/parameter_setting";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParameterSettingStore } from "@store/penggajian/parameter_setting";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveParameterSetting } from "./action";

interface ParameterSettingFormProps {
    data?: ParameterSetting
}
const ParameterSettingFormComponent = ({ data }: ParameterSettingFormProps) => {
    const router = useRouter()
    const { defaultValues, setDefaultValues } = useParameterSettingStore((state) => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<ParameterSettingSchema>({
        resolver: zodResolver(ParameterSettingSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: saveParameterSetting,
        queryKeys: [["parameter_setting"]],
        redirectTo: "/penggajian/parameter_setting"
    })

    const onSubmit = (values: ParameterSettingSchema) => {
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

export default ParameterSettingFormComponent;