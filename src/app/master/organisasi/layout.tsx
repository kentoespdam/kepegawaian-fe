"use client"
import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const Layout = ({ children }: ChildrenNode) => {
    return (
        <CustomQueryProvider queryClient={queryClient}>
            {children}
        </CustomQueryProvider>
    );
}

export default Layout;