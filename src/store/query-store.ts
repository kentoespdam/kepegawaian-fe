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

	const mutation = useMutation({
		mutationFn: mutationFunction,
		onSuccess: (data) => {
			const result = data as BaseResult<unknown>;
			if (result.status !== 200 && result.status !== 201)
				throw new Error(JSON.stringify(result));
			toast({
				title: `${result.status} Success`,
				description: result.message,
				className: "bg-primary text-primary-foreground",
			});
			for (const queryKey of queryKeys) {
				queryClient.invalidateQueries({ queryKey });
			}
		},
		onError: (error, variables) => {
			const result = JSON.parse(error.message) as BaseResult<unknown>;
			if(result.status===401){
				result.message="Network Error. please try again"
			}
			toast({
				title: `${result.status} Error`,
				description: result.message,
				variant: "destructive",
			});
		},
	});

	return mutation;
}
