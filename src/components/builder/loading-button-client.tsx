"use client";
import { type ButtonProps, buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { RefreshCwIcon } from "lucide-react";
import * as React from "react";

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
                className={cn(buttonVariants({ variant, size, className }), pending ? "cursor-not-allowed bg-secondary" : "")}
                ref={ref}
                disabled={pending}
                {...props}
            >
                {pending ? (
                    <RefreshCwIcon className={cn("mr-0 animate-spin", props.title ? "mr-2" : "")} />
                ) : icon ? (
                    <div className={cn("mr-0", props.title ? "mr-2" : "")}>{icon}</div>
                ) : null}
                {props.title}
            </Comp>
        );
    },
);
LoadingButtonClient.displayName = "LoadingButtonClient";

export { LoadingButtonClient };

