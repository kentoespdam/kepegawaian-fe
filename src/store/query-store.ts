import type { BaseResult } from "@_types/index";
import {
	useMutation,
	useQueryClient,
	type QueryKey,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useGlobalMutation<TData, TVariables>({
	mutationFunction,
	queryKeys,
	redirectTo,
}: {
	mutationFunction: (variables: TVariables) => Promise<TData>;
	queryKeys: QueryKey[];
	redirectTo?: string;
}) {
	const { push } = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: mutationFunction,
		onSuccess: (data) => {
			const result = data as BaseResult<unknown>;
			if (result.status !== 200 && result.status !== 201)
				throw new Error(JSON.stringify(result));
			toast.success(`${result.status} Success`, {
				description: result.message,
				className: "bg-primary text-primary-foreground",
			});
			for (const queryKey of queryKeys) {
				queryClient.invalidateQueries({ queryKey });
			}
			if (redirectTo) push(redirectTo);
		},
		onError: (error) => {
			const result = JSON.parse(error.message) as BaseResult<unknown>;
			if (result.status === 401) {
				result.message = "Network Error. please try again";
			}
			if (result.errors)
				for (const message of result.errors) {
					toast.error(`Error ${result.status}`, {
						description: message,
						duration: 3000,
					});
				}
		},
	});

	return mutation;
}
