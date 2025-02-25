"use client";
import { type PegawaiDetail, ProfilGajiPegawaiSchema } from "@_types/pegawai";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProfilGajiDataSk from "./data_sk";
import { useProfilGajiPegawaiStore } from "@store/kepegawaian/profil_gaji";
import { useEffect } from "react";
import ProfilGajiVariableGaji from "./variable_gaji";
import TooltipBuilder from "@components/builder/tooltip";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { Button } from "@components/ui/button";
import { SaveIcon } from "lucide-react";
import { useGlobalMutation } from "@store/query-store";
import { useRouter, useSearchParams } from "next/navigation";
import { patchProfilGajiPegawai } from "./action";
import InputZod from "@components/form/zod/input";

interface EditProfilGajiFormProps {
    pegawai: PegawaiDetail
}
const EditProfilGajiFormComponent = (props: EditProfilGajiFormProps) => {
    const { pegawai } = props
    const router = useRouter()
    const params = useSearchParams()
    const callback = params.get("callbackUrl") ? atob(params.get("callbackUrl") as string) : ""

    const { defaultValues, setDefaultValues } = useProfilGajiPegawaiStore(state => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<ProfilGajiPegawaiSchema>({
        resolver: zodResolver(ProfilGajiPegawaiSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: patchProfilGajiPegawai,
        queryKeys: [["data_pegawai", callback]],
        redirectTo: `/kepegawaian/data_pegawai?${callback}`
    })

    const submitHandler = (values: ProfilGajiPegawaiSchema) => {
        mutation.mutate(values)
    }

    const cancelHandler = () => {
        form.reset()
        router.back()
    }

    useEffect(() => setDefaultValues(pegawai), [setDefaultValues, pegawai])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}
                className="grid gap-4">
                <InputZod id="id" label="ID" form={form} className="hidden" />
                <ProfilGajiDataSk form={form} />
                <ProfilGajiVariableGaji form={form} />
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
    );
}

export default EditProfilGajiFormComponent;