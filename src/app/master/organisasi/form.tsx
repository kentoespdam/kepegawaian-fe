"use client"

import type { SaveErrorStatus } from "@_types/index";
import type { Organisasi } from "@_types/master/organisasi";
import AlertBuilder from "@components/builder/alert";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputTextComponent from "@components/form/input";
import SelectLevelOrganisasiComponent from "@components/form/level-organisasi";
import SelectOrganisasiComponent from "@components/form/organisasi";
import { buttonVariants } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select";
import { cn } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveOrganisasi } from "./action";

const OrganisasiFormComponent = ({ data }: { data?: Organisasi }) => {
    const [errState, setErrState] = useState<SaveErrorStatus>({ success: false })
    const { push } = useRouter()

    const mutation = useMutation({
        mutationFn: saveOrganisasi,
        onSuccess: (result) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push('/master/organisasi')
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
                    <SelectOrganisasiComponent
                        label="Organisasi Induk"
                        id="parentId"
                        defaultValue={String(data?.parent ? data.parent.id : "")}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <SelectLevelOrganisasiComponent
                        id="levelOrganisasi"
                        val={String(data ? data.levelOrganisasi : "")}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent label="Nama" id="nama"
                        defaultValue={data ? data.nama : ""} />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/organisasi" className={cn(buttonVariants({
                        variant: "destructive"
                    }))} >
                        Cancel
                    </Link>
                    <LoadingButtonClient pending={mutation.isPending} title="Save" icon={<SaveIcon />} />
                    <input type="hidden" name="id" value={data ? data.id : "0"} />
                </div>
            </form>
        </>
    );
}

export default OrganisasiFormComponent;