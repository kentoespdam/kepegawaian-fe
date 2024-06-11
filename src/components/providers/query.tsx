"use client"

import { ChildrenNode } from "@lib/index";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
    defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})
const CustomQueryProvider = ({ children }: ChildrenNode) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default CustomQueryProvider;