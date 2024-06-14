"use client";
import type { SaveErrorStatus } from "@_types/index";
import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";
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
import { saveJenisPelatihan } from "./action";

type JenisPelatihanFormComponentProps = {
    data?: JenisPelatihan
}
const JenisPelatihanFormComponent = ({ data }: JenisPelatihanFormComponentProps) => {
    const [errState, setErrState] = useState<SaveErrorStatus | null>(null)
    const { push } = useRouter()

    const mutation = useMutation({
        mutationFn: saveJenisPelatihan,
        onSuccess: (result: SaveErrorStatus) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push("/master/jenis_pelatihan")
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
                        label="Nama Jenis Kartu Identitas"
                        defaultValue={data?.nama}
                        required
                    />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/jenis_pelatihan" className={cn(buttonVariants({
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

export default JenisPelatihanFormComponent;