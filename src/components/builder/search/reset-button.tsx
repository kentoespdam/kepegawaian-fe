"use client";
import { Button } from "@components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import TooltipBuilder from "../tooltip";

const ResetSearchComponent = () => {
    const { replace } = useRouter()
    const pathname = usePathname()

    const clearSearch = () => {
        replace(pathname);
    };


    return (
        <TooltipBuilder text="Clear Search" className="bg-destructive text-destructive-foreground">
            <Button variant="outline" type="reset" size="icon" onClick={clearSearch}>
                <ResetIcon className="text-destructive" />
            </Button>
        </TooltipBuilder>
    );
}

export default ResetSearchComponent;