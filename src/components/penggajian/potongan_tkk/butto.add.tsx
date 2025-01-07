"use client"
import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const RefPotonganTkkAddButton = () => {
    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const callbackUrl = btoa(search.toString()) ?? ""
    return (
        <TooltipBuilder text="Add Ref Potongan TKK" delayDuration={100}>
            <ButtonLink
                href={`/penggajian/potongan_tkk/add?callback=${callbackUrl}`}
                icon={<PlusCircleIcon className=" h-5 w-5" />}
                variant={"ghost"}
                className="text-primary hover:opacity-75"
                size={"icon"} />
        </TooltipBuilder>
    );
}

export default RefPotonganTkkAddButton;