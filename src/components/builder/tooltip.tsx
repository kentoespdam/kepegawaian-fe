import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { cn } from "@lib/utils";

type TooltipProps = {
    text: string;
    children: React.ReactNode;
    className?: string;
};

const TooltipBuilder = ({ text, children, className }: TooltipProps) => (
    <TooltipProvider delayDuration={0}>
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className={cn(className)}>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default TooltipBuilder 
