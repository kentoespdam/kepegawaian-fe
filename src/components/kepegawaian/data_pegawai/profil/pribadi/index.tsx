"use client"
import { ProfilPribadiSchema, type PegawaiDetail } from "@_types/pegawai";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { patchProfilPribadi } from "./action";
import BiodataComponent from "./bio";
import ProfilKepegawaianComponent from "./kepegawaian";

interface EditProfilPribadiFormProps {
    pegawai: PegawaiDetail
}
const EditProfilPribadiFormComponent = ({ pegawai }: EditProfilPribadiFormProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const callback = params.get("callbackUrl") ? atob(params.get("callbackUrl") as string) : ""

    const { defaultValues, setDefaultValues } = useProfilPribadiStore(state => ({
        defaultValues: state.defaultValues,
        setDefaultValues: state.setDefaultValues
    }))

    const form = useForm<ProfilPribadiSchema>({
        resolver: zodResolver(ProfilPribadiSchema),
        defaultValues: defaultValues,
        values: defaultValues
    })

    const mutation = useGlobalMutation({
        mutationFunction: patchProfilPribadi,
        queryKeys: [["data_pegawai", callback]],
        redirectTo: `/kepegawaian/data_pegawai?${callback}`
    })

    const submitHandler = (values: ProfilPribadiSchema) => {
        // console.dir(values, { depth: 2 })
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
                className="grid gap-2">
                <InputZod id="id" label="ID" form={form} className="hidden" />
                <BiodataComponent form={form} />
                <ProfilKepegawaianComponent form={form} />
                <Fieldset title="Data Absesnsi">
                    <InputZod type="number" id="absensiId" label="ID Absensi" form={form} />
                </Fieldset>
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

export default EditProfilPribadiFormComponent;