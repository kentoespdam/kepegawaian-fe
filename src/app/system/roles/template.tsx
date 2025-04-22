"use client"
import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const Template = ({ children }: ChildrenNode) => {
    return (
        <CustomQueryProvider queryClient={queryClient}>
            {children}
            <Toaster richColors />
        </CustomQueryProvider>
    );
}

export default Template;