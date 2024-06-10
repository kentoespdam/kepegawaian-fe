"use client";
import { ButtonProps, buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { RefreshCwIcon } from "lucide-react";
import * as React from "react";
import { useFormStatus } from "react-dom";

interface LoadingButtonProps extends ButtonProps {
    asChild?: boolean;
    icon?: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
    ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
        const { pending } = useFormStatus();
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={pending}
                {...props}
            >
                {pending ? (
                    <RefreshCwIcon className="mr-2 animate-spin" />
                ) : icon ? (
                    <div className="mr-2">{icon}</div>
                ) : null}
                {props.title}
            </Comp>
        );
    },
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };

