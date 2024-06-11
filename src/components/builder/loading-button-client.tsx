"use client";
import { ButtonProps, buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { RefreshCwIcon } from "lucide-react";
import * as React from "react";
import { useFormStatus } from "react-dom";

interface LoadingButtonClientProps extends ButtonProps {
    pending: boolean;
    asChild?: boolean;
    icon?: React.ReactNode;
}

const LoadingButtonClient = React.forwardRef<HTMLButtonElement, LoadingButtonClientProps>(
    ({ pending, className, variant, size, asChild = false, icon, ...props }, ref) => {
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
LoadingButtonClient.displayName = "LoadingButtonClient";

export { LoadingButtonClient };

