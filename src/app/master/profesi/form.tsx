"use client"

import type { SaveErrorStatus } from "@_types/index";
import type { Profesi } from "@_types/master/profesi";
import AlertBuilder from "@components/builder/alert";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputTextComponent from "@components/form/input";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveProfesi } from "./action";
import SelectLevelComponent from "@components/form/level";
import TextAreaComponent from "@components/form/textarea";

const ProfesiFormComponent = ({ data }: { data?: Profesi }) => {
    const [errState, setErrState] = useState<SaveErrorStatus>({ success: false })
    const { push } = useRouter()
    const qc = useQueryClient()

    const mutation = useMutation({
        mutationFn: saveProfesi,
        onSuccess: (result) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            qc.invalidateQueries({ queryKey: ["profesi"] })

            push('/master/profesi')
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
                    <SelectLevelComponent
                        label="Level"
                        id="levelId"
                        required
                        defaultValue={String(data ? data.level.id : "")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent label="Nama" id="nama"
                        required
                        defaultValue={String(data ? data.nama : "")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <TextAreaComponent
                        label="Detail"
                        id="detail"
                        defaultValue={String(data ? data.detail : "")}
                        required
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <TextAreaComponent
                        label="Resiko"
                        id="resiko"
                        defaultValue={String(data ? data.resiko : "")}
                        required
                    />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/profesi" className={cn(buttonVariants({
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

export default ProfesiFormComponent;