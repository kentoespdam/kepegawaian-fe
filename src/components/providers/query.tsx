"use client"

import type { ChildrenNode } from "@lib/index";
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const CustomQueryProvider = ({ queryClient, children }: { queryClient: QueryClient } & ChildrenNode) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default CustomQueryProvider;