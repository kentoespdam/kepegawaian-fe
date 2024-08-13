"use client"

import type { SaveErrorStatus } from "@_types/index";
import type { Golongan } from "@_types/master/golongan";
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
import { saveGolongan } from "./action";

const GolonganFormComponent = ({ data }: { data?: Golongan }) => {
    const [errState, setErrState] = useState<SaveErrorStatus>({ success: false })
    const { push } = useRouter()

    const mutation = useMutation({
        mutationFn: saveGolongan,
        onSuccess: (result) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push('/master/golongan')
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
                    <InputTextComponent label="Golongan" id="golongan"
                        defaultValue={data?.golongan} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent label="Pangkat" id="pangkat"
                        defaultValue={data?.pangkat} />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/golongan" className={cn(buttonVariants({
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

export default GolonganFormComponent;