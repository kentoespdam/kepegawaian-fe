import type { BaseResult } from "@_types/index";
import { useToast } from "@components/ui/use-toast";
import {
	type QueryKey,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function useGlobalMutation<TData, TVariables>({
	mutationFunction,
	queryKeys,
}: {
	mutationFunction: (variables: TVariables) => Promise<TData>;
	queryKeys: QueryKey[];
}) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: mutationFunction,
		onSuccess: (data) => {
			const result = data as BaseResult<TData>;
			toast({
				title: `${result.status} Success`,
				description: result.message,
				className: "bg-primary text-primary-foreground",
			});
			for (const queryKey of queryKeys) {
				queryClient.invalidateQueries({ queryKey });
			}
		},
		onError: (error) => {
			const result = JSON.parse(error.message) as BaseResult<TData>;
			toast({
				title: `${result.status} Error`,
				description: result.message,
				variant: "destructive",
			});
		},
	});
}
