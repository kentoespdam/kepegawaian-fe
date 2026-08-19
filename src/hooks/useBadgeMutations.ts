import { useMutation, useQueryClient } from "@tanstack/react-query";
import { masterKeys } from "@/hooks/keys/master-keys";
import { api } from "@/lib/api/client";

export function useBadgeMutations(entity: "apd" | "alat-kerja", profesiId: number) {
	const qc = useQueryClient();
	const path = `profesi/${profesiId}/${entity}`;

	const create = useMutation({
		mutationFn: (data: { nama: string }) => api.create(path, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("profesi") }),
	});
	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: { nama: string } }) => api.update(path, id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("profesi") }),
	});
	const remove = useMutation({
		mutationFn: (id: string) => api.remove(path, id),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("profesi") }),
	});

	return { create, update, remove };
}
