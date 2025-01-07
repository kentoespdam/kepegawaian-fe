import type { BaseResult } from "@_types/index";
import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
	type QueryKey,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GlobalMutationProps<TData, TVariables> {
	mutationFunction: (variables: TVariables) => Promise<TData>;
	queryKeys: QueryKey[];
	redirectTo?: string;
	actHandler?: () => void;
}

export function useGlobalMutation<TData, TVariables>({
	mutationFunction,
	queryKeys,
	redirectTo,
	actHandler,
}: GlobalMutationProps<TData, TVariables>): UseMutationResult<
	TData,
	Error,
	TVariables,
	unknown
> {
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
			if (actHandler) actHandler();
		},
		onError: (error) => {
			const result = JSON.parse(error.message) as BaseResult<unknown>;
			if (result.status === 401)
				result.errors = "Network Error. please try again";

			if (result.errors && typeof result.errors === "object")
				for (const message of result.errors) {
					toast.error(`Error ${result.status}`, {
						description: message,
						duration: 3000,
					});
				}
			else
				toast.error(`Error ${result.status}`, {
					description: result.errors,
					duration: 3000,
				});
		},
	});

	return mutation;
}
