import { createContext, useContext } from "react";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";

interface BatchState {
	data: GajiBatchRootResponse | undefined;
	isPending: boolean;
	isError: boolean;
	error: Error | null;
}

const BatchContext = createContext<BatchState>({
	data: undefined,
	isPending: true,
	isError: false,
	error: null,
});

export function BatchProvider({ children, value }: { children: React.ReactNode; value: BatchState }) {
	return <BatchContext.Provider value={value}>{children}</BatchContext.Provider>;
}

export function useBatchContext(): BatchState {
	return useContext(BatchContext);
}
