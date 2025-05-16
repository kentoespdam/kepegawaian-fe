"use client";
import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const Layout = ({ children }: ChildrenNode) => {
	return (
		<CustomQueryProvider queryClient={queryClient}>
			<div dir="ltr" data-aria-orientation="horizontal" className="max-w-full">
				{children}
			</div>
		</CustomQueryProvider>
	);
};

export default Layout;
