import { useMutation, useQueryClient } from "@tanstack/react-query";
import { masterKeys } from "@/hooks/keys/master-keys";
import { api } from "@/lib/api/client";

/**
 * Full payload untuk create/update sanksi — selaras dengan SanksiPostRequest.
 * `jenisSpId` diisi otomatis oleh hook dari konteks jenis-sp.
 */
export interface FullSanksiPayload {
	kode: string;
	keterangan: string;
	jenisSpId: number;
	potTkk?: boolean;
	jmlPotTkk?: number;
	isPendingPangkat?: boolean;
	isPendingGaji?: boolean;
	isTurunPangkat?: boolean;
	isTurunJabatan?: boolean;
	isSuspension?: boolean;
	isTerminateDh?: boolean;
	isTerminateTh?: boolean;
}

/**
 * Mutation hook untuk CRUD sanksi dari konteks page jenis-sp.
 *
 * Mengirim payload {@link FullSanksiPayload} (kode, keterangan, boolean flags)
 * ke endpoint direct CRUD `/master/sanksi` dengan `jenisSpId` di body.
 * Invalidasi queryKey ["jenis-sp"] agar tabel beserta badge sanksi-nya refresh.
 */
export function useSanksiMutations(jenisSpId: number) {
	const qc = useQueryClient();

	const create = useMutation({
		mutationFn: (data: Omit<FullSanksiPayload, "jenisSpId">) =>
			api.create<FullSanksiPayload>("sanksi", { ...data, jenisSpId }),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("jenis-sp") }),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Omit<FullSanksiPayload, "jenisSpId"> }) =>
			api.update<FullSanksiPayload>("sanksi", id, { ...data, jenisSpId }),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("jenis-sp") }),
	});

	const remove = useMutation({
		mutationFn: (id: string) => api.remove("sanksi", id),
		onSuccess: () => qc.invalidateQueries({ queryKey: masterKeys.all("jenis-sp") }),
	});

	return { create, update, remove };
}
