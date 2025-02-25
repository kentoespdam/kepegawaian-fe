import { useQueryClient } from "@tanstack/react-query";
import TooltipBuilder from "../tooltip";
import { LoadingButtonClient } from "../loading-button-client";
import { RefreshCcwIcon } from "lucide-react";

interface RefreshSearchComponentProps {
    pending?: boolean;
    qkey?: string[]
}
const RefreshSearchComponent = ({ pending, qkey }: RefreshSearchComponentProps) => {
    const qc = useQueryClient()

    const refreshSearch = () => {
        qc.invalidateQueries({
            queryKey: qkey
        })
     }

    return (
        <TooltipBuilder
            text="Refresh"
            className="bg-primary text-primary-foreground"
        >
            <LoadingButtonClient
                pending={pending ?? false}
                variant="outline"
                size="icon"
                icon={<RefreshCcwIcon className="text-primary" />}
                onClick={refreshSearch}
            />
        </TooltipBuilder>
    );
}

export default RefreshSearchComponent;