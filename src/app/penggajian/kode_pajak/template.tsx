"use client";
import CustomQueryProvider from "@components/providers/query";
import { Toaster } from "@components/ui/sonner";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const Template = ({ children }: ChildrenNode) => {
	return (
		<CustomQueryProvider queryClient={queryClient}>
			<div dir="ltr" data-aria-orientation="horizontal" className="max-w-full">
				{children}
				<Toaster richColors />
			</div>
		</CustomQueryProvider>
	);
};

export default Template;
