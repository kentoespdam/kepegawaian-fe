import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

interface SanksiPayload {
	kode: string;
	keterangan: string;
	jenisSpId: number;
}

/**
 * Mutation hook untuk CRUD sanksi dari konteks page jenis-sp.
 *
 * Berbeda dengan `useBadgeMutations` (nested path), sanksi menggunakan
 * endpoint direct CRUD /master/sanksi dengan `jenisSpId` di body.
 * Invalidasi queryKey ["jenis-sp"] agar tabel beserta badge sanksi-nya refresh.
 */
export function useSanksiMutations(jenisSpId: number) {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: { kode: string; keterangan: string }) =>
			api.create<SanksiPayload>("sanksi", { ...data, jenisSpId }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["jenis-sp"] }),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: { kode: string; keterangan: string } }) =>
			api.update<SanksiPayload>("sanksi", id, { ...data, jenisSpId }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["jenis-sp"] }),
	});

	const remove = useMutation({
		mutationFn: (id: string) => api.remove("sanksi", id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["jenis-sp"] }),
	});

	return { create, update, remove };
}
