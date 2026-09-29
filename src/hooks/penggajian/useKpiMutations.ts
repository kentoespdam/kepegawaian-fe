"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type {
	GajiKpiPostRequest,
	GajiKpiPutRequest,
	GajiKpiResponse,
	GajiKpiUploadResponse,
} from "@/types/penggajian/kpi";

export function useCreateKpi() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data: GajiKpiPostRequest) => penggajianApi.create<GajiKpiResponse>("kpi", data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.kpi.all() });
			toast.success("Data KPI berhasil disimpan");
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal menyimpan data KPI");
		},
	});
}

export function useUpdateKpi() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: GajiKpiPutRequest }) =>
			penggajianApi.update<GajiKpiResponse>("kpi", String(id), data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.kpi.all() });
			toast.success("Data KPI berhasil diperbarui");
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal memperbarui data KPI");
		},
	});
}

export function useDeleteKpi() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => penggajianApi.remove("kpi", String(id)),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.kpi.all() });
			toast.success("Data KPI berhasil dihapus");
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal menghapus data KPI");
		},
	});
}

export function useUploadKpi() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ file, periode }: { file: File; periode: string }) => penggajianApi.uploadKpi(file, periode),
		onSuccess: (data: GajiKpiUploadResponse) => {
			qc.invalidateQueries({ queryKey: penggajianKeys.kpi.all() });
			const total = data?.totalRows ?? 0;
			const ins = data?.inserted ?? 0;
			const upd = data?.updated ?? 0;
			toast.success(`Berhasil upload ${total} baris — ${ins} baru, ${upd} diperbarui`);
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal mengunggah file KPI");
		},
	});
}
