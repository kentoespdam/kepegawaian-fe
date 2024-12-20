"use client"

import type { SaveErrorStatus } from "@_types/index";
import type { Jabatan } from "@_types/master/jabatan";
import AlertBuilder from "@components/builder/alert";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputTextComponent from "@components/form/input";
import SelectJabatanComponent from "@components/form/jabatan";
import SelectLevelComponent from "@components/form/level";
import SelectOrganisasiComponent from "@components/form/organisasi";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { saveJabatan } from "./action";

const JabatanFormComponent = ({ data }: { data?: Jabatan }) => {
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)
    const [errState, setErrState] = useState<SaveErrorStatus>({ success: false })
    const { push } = useRouter()
    const [parentLevelId, setParentLevelId] = useState(data?.parent?.level.id)
    let ulang = 1

    const mutation = useMutation({
        mutationFn: saveJabatan,
        onSuccess: (data, variable, context) => {
            if (!data.success) {
                if (ulang === 2) {
                    setErrState(data)
                    return
                }
                if (data.error?.message === "Full authentication is required to access this resource") {
                    mutation.mutate(variable)
                    ulang++
                }

            }
            push(`/master/jabatan?${search.toString()}`)
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(new FormData(e.currentTarget))
    }
    return (
        <>
            {errState?.error ? (
                <div className="mb-2">
                    {Object.entries(errState.error).map(([key, value]) => (
                        <AlertBuilder
                            key={key}
                            message={String(value)}
                            variant="destructive"
                            untitled
                        />
                    ))}
                </div>
            ) : null}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-1.5">
                    <SelectJabatanComponent
                        label="Parent Jabatan"
                        id="parentId"
                        defaultValue={String(data?.parent ? data.parent.id : "")}
                        onSelect={setParentLevelId}
                        required />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <SelectLevelComponent
                        label="Level"
                        id="levelId"
                        parentLevelId={parentLevelId}
                        defaultValue={String(data ? data.level.id : "")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <SelectOrganisasiComponent
                        label="Organisasi"
                        id="organisasiId"
                        parentLevelId={parentLevelId}
                        defaultValue={String(data ? data.organisasi.id : "")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent
                        label="Nama"
                        id="nama"
                        required
                        defaultValue={String(data ? data.nama : "")} />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/jabatan" className={cn(buttonVariants({
                        variant: "destructive"
                    }))} >
                        Cancel
                    </Link>
                    <LoadingButtonClient pending={mutation.isPending} title="Save" icon={<SaveIcon />} />
                    <input type="hidden" name="id" value={data?.id} />
                </div>
            </form>
        </>
    );
}

export default JabatanFormComponent;