"use client";

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { CloudOffIcon, MonitorCheckIcon } from "lucide-react";
import { checkToken, renewToken } from "./action";

const RenewComponent = () => {
	const query = useQuery({
		queryKey: ["renew-token"],
		queryFn: async () => {
			if (!checkToken()) await renewToken();
			return null;
		},
		refetchInterval: 1000 * 10,
	});
	if (query.isLoading || query.isFetching)
		return <CloudOffIcon className="animate-pulse text-warning-foreground" />;
	if (query.isError) return <CloudOffIcon className="text-error" />;
	return (
		<div>
			<MonitorCheckIcon className="text-primary w-4 h-4" />
		</div>
	);
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const RenewAuthToken = () => {
	return (
		<QueryClientProvider client={queryClient}>
				<RenewComponent />
		</QueryClientProvider>
	);
};

export default RenewAuthToken;
