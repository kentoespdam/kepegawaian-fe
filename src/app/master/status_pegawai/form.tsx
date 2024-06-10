"use client"
import { StatusPegawai } from "@_types/master/status_pegawai";
import { LoadingButton } from "@components/builder/loading-button";
import InputTextComponent from "@components/form/input";
import { Button } from "@components/ui/button";
import { BanIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { saveStatusPegawai } from "./action";
import AlertBuilder from "@components/builder/alert";

type StatusPegawaiFormProps = {
    data?: StatusPegawai
}
const StatusPegawaiForm = ({ data }: StatusPegawaiFormProps) => {
    const [state, action] = useFormState(saveStatusPegawai, null)
    const { push } = useRouter()
    return (
        <>
            {state && state.error !== undefined ? (
                <div className="mb-2">
                    {Object.entries(state.error).map(([key, value]) => (
                        <AlertBuilder
                            key={key}
                            message={String(value)}
                            variant="destructive"
                            untitled
                        />
                    ))}
                </div>
            ) : null}

            <form className="space-y-4 md:space-y-6" action={action}>
                <div className="grid w-full items-center gap-1.5">
                    <InputTextComponent
                        id="nama"
                        label="Nama"
                        defaultValue={data?.nama}
                    />
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => push("/master/status_pegawai")}
                    >
                        <BanIcon className="mr-2" /> Cancel
                    </Button>
                    <LoadingButton title="Save" icon={<SaveIcon />} />
                    <input type="hidden" name="id" value={data?.id} />
                </div>
            </form>
        </>
    );
}

export default StatusPegawaiForm;