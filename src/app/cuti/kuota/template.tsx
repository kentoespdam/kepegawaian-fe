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

const TemplateDashboard = ({ children }: ChildrenNode) => {
	return (
		<CustomQueryProvider queryClient={queryClient}>
			{children}
			<Toaster richColors />
		</CustomQueryProvider>
	);
};

export default TemplateDashboard;
