import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export function useBadgeMutations(entity: "apd" | "alat-kerja") {
	const qc = useQueryClient();
	const invalidateAll = () => {
		qc.invalidateQueries({ queryKey: ["profesi"] });
		qc.invalidateQueries({ queryKey: [entity] });
	};

	const create = useMutation({
		mutationFn: (data: { profesiId: number; nama: string }) => api.create(entity, data),
		onSuccess: invalidateAll,
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: { profesiId: number; nama: string } }) =>
			api.update(entity, id, data),
		onSuccess: invalidateAll,
	});
	const remove = useMutation({
		mutationFn: (id: string) => api.remove(entity, id),
		onSuccess: invalidateAll,
	});

	return { create, update, remove };
}
