"use client"
import { cn } from "@lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import Link from "next/link"
import React from "react"
import { buttonVariants } from "./button"
interface ButtonLinkProps extends
    React.LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
    href: string
    icon?: React.ReactNode
    asChild?: boolean
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
    ({ href, icon, className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : Link
        return (
            <Comp
                href={href}
                className={cn(buttonVariants({ variant, size, className }), `${icon ? "gap-1" : ""}`)}
                ref={ref}
                {...props}
            >
                {icon}
                {props.title}
            </Comp>
        )
    })

ButtonLink.displayName = "MyLink"

export { ButtonLink }
