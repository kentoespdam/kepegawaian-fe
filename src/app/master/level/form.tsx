"use client";
import { SaveErrorStatus } from "@_types/index";
import { Level } from "@_types/master/level";
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
import { saveLevel } from "./action";

type LevelFormComponentProps = {
    data?: Level
}
const LevelFormComponent = ({ data }: LevelFormComponentProps) => {
    const [errState, setErrState] = useState<SaveErrorStatus | null>(null)
    const { push } = useRouter()

    const mutation = useMutation({
        mutationFn: saveLevel,
        onSuccess: (result: SaveErrorStatus) => {
            if (!result.success) {
                setErrState(result)
                return
            }
            push("/master/level")
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
                        label="Nama Level"
                        defaultValue={data?.nama}
                        required
                    />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Link href="/master/level" className={cn(buttonVariants({
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

export default LevelFormComponent;