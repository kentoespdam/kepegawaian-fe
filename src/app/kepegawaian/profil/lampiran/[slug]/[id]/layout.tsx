"use client";
import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";
import { QueryClient } from "@tanstack/react-query";
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const LampiranProfilLayout = ({ children }: ChildrenNode) => {
	return (
		<CustomQueryProvider queryClient={queryClient}>
			{children}
		</CustomQueryProvider>
	);
};

export default LampiranProfilLayout;
