import Link from "next/link";
import TooltipBuilder from "../tooltip";
import { Button } from "@components/ui/button";
import { PencilIcon } from "lucide-react";

type ButtonEditBuilderProps = {
    href: string
    msg: string
}

const ButtonEditBuilder = (props: ButtonEditBuilderProps) => {
    return (
        <TooltipBuilder text={props.msg} className="bg-warning text-warning-foreground">
            <Link href={props.href}>
                <Button variant="ghost" size="icon" className="p-0 h-7 w-7">
                    <PencilIcon className="h-5 w-5 text-warning" aria-hidden="true" />
                </Button>
            </Link>
        </TooltipBuilder>
    );
}

export default ButtonEditBuilder;