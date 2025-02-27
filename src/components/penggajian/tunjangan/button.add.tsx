"use client"

import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const AddTunjanganButton = () => {
    const params = useSearchParams()
    const jenisTunjangan = params.get("jenisTunjangan")
    const search = new URLSearchParams(params)
    const callbackUrl = btoa(`/penggajian/tunjangan?${search.toString()}`)
    search.set("callback", callbackUrl)

    return (
        <TooltipBuilder text="Add Tunjangan" delayDuration={100}>
            <ButtonLink
                href={`/penggajian/tunjangan/${jenisTunjangan}/add?${search.toString()}`}
                icon={<PlusCircleIcon className=" h-5 w-5" />}
                variant={"ghost"}
                className="text-primary hover:opacity-75"
                size={"icon"} />
        </TooltipBuilder>
    );
}

export default AddTunjanganButton;