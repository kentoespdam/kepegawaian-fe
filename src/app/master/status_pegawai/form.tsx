"use client"
import type { StatusPegawai } from "@_types/master/status_pegawai";
import AlertBuilder from "@components/builder/alert";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputTextComponent from "@components/form/input";
import { Button } from "@components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { BanIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveStatusPegawai } from "./action";

type StatusPegawaiFormProps = {
    data?: StatusPegawai
}
const StatusPegawaiForm = ({ data }: StatusPegawaiFormProps) => {
    const { push } = useRouter()
    const [errState, setErrState] = useState<{ success: boolean, error?: Record<string, unknown> } | null>(null)
    const mutation = useMutation({
        mutationFn: saveStatusPegawai,
        onSuccess: (result) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push("/master/status_pegawai")
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
                    <InputTextComponent
                        id="nama"
                        label="Nama"
                        required
                        defaultValue={data?.nama}
                    />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => push("/master/status_pegawai")}
                    >
                        <BanIcon className="mr-2" /> <span>Cancel</span>
                    </Button>
                    <LoadingButtonClient pending={mutation.isPending} title="Save" icon={<SaveIcon />} />
                    <input type="hidden" name="id" value={data?.id} />
                </div>
            </form>
        </>
    );
}

export default StatusPegawaiForm;