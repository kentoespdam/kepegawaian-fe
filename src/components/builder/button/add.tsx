import Link from "next/link";
import TooltipBuilder from "../tooltip";
import { Button } from "@components/ui/button";
import { CirclePlusIcon } from "lucide-react";

const ButtonAddBuilder = ({ href, msg }: { href: string, msg: string }) => {
    return (
        <TooltipBuilder text={msg} className="bg-primary">
            <Link href={href}>
                <Button
                    variant="ghost"
                    className="p-0 w-6 h-6 rounded-full text-primary hover:bg-primary hover:text-primary-foreground"
                >
                    <CirclePlusIcon />
                </Button>
            </Link>
        </TooltipBuilder>
    );
}

export default ButtonAddBuilder;