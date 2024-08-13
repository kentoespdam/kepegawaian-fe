"use client";
import { ResetIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { LoadingButtonClient } from "../loading-button-client";
import TooltipBuilder from "../tooltip";
import { useQueryClient } from "@tanstack/react-query";

type ResetSearchComponentProps = {
    pending?: boolean
    isFetching?: boolean
    isLoading?: boolean
}
const ResetSearchComponent = (props: ResetSearchComponentProps) => {
    const { replace } = useRouter()
    const pathname = usePathname()

    const qc=useQueryClient()

    const clearSearch = () => {
        qc.invalidateQueries()
        replace(pathname);
    };

    return (
        <TooltipBuilder text="Clear Search" className="bg-destructive text-destructive-foreground">
            <LoadingButtonClient
                pending={props.pending ?? false}
                variant="outline"
                type="reset"
                size="icon"
                icon={<ResetIcon className="text-destructive" />}
                onClick={clearSearch}
            />

        </TooltipBuilder>
    );
}

export default ResetSearchComponent;