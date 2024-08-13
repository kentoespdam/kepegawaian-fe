"use client"

import type { SaveErrorStatus } from "@_types/index";
import type { AlatKerja } from "@_types/master/alat_kerja";
import AlertBuilder from "@components/builder/alert";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputTextComponent from "@components/form/input";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveAlatKerja } from "./action";
import SelectProfesiComponent from "@components/form/profesi";

const AlatKerjaFormComponent = ({ data }: { data?: AlatKerja }) => {
    const [errState, setErrState] = useState<SaveErrorStatus>({ success: false })
    const { push } = useRouter()

    const mutation = useMutation({
        mutationFn: saveAlatKerja,
        onSuccess: (result) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push('/master/alat_kerja')
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
                    <SelectProfesiComponent
                        label="Profesi"
                        id="profesiId"
                        defaultValue={String(data ? data.profesi.id : "")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent label="Nama" id="nama"
                        defaultValue={String(data ? data.nama : "")} />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/alat_kerja" className={cn(buttonVariants({
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

export default AlatKerjaFormComponent;