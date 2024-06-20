import type { ChildrenNode } from "@lib/index";
import { cn } from "@lib/utils";
import React from "react";

interface FieldSetProps extends ChildrenNode {
    title: string
    clasName?: string
}

const Fieldset = React.forwardRef<
    React.ElementRef<"fieldset">,
    React.ComponentPropsWithoutRef<"fieldset"> & FieldSetProps
>(({ children, title, clasName, ...props }, ref) => {
    return (
        <fieldset
            ref={ref}
            className={cn("grid rounded-lg border p-2 max-w-content", clasName)}
            {...props}
        >
            <legend className="-ml-1 px-1 text-sm font-medium">{title}</legend>
            <div className="p-2">
            {children}
            </div>
        </fieldset>
    );
})

export default Fieldset