"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cutiKeys } from "@/hooks/keys/cuti-keys";
import { toApiParams } from "@/lib/paging";
import { apiErrorMessage, throwIfNotOk } from "@/lib/utils";
import type { CutiKuotaPegawaiResponse, CutiKuotaResponse } from "@/types/cuti/kuota";

export function useCutiKuotaList(params: { tahun: number; nama: string; nipam: string; page: number; size: number }) {
	return useQuery({
		queryKey: cutiKeys.kuota.list({
			tahun: params.tahun,
			nama: params.nama,
			nipam: params.nipam,
			page: params.page,
			size: params.size,
		}),
		queryFn: async () => {
			const queryParams: Record<string, string> = {
				...toApiParams({ page: params.page, size: params.size }),
				tahun: String(params.tahun),
			};
			if (params.nama) queryParams.nama = params.nama;
			if (params.nipam) queryParams.nipam = params.nipam;
			const qs = new URLSearchParams(queryParams).toString();
			const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kuota");
			const body = (await res.json()) as { data: CutiKuotaPegawaiResponse };
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});
}

export function useDeleteKuotaMutation(onSuccessCallback?: () => void, onErrorCallback?: (err: Error) => void) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await fetch(`/api/proxy/cuti/kuota/${id}`, { method: "DELETE" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menghapus kuota"));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.kuota.all() });
			onSuccessCallback?.();
		},
		onError: (e: Error) => {
			onErrorCallback?.(e);
		},
	});
}

export function useImportKuotaMutation(onSuccessCallback?: () => void) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ tahun, file }: { tahun: number; file: File }) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const fd = new FormData();
			fd.append("tahun", String(tahun));
			fd.append("file", file);
			if (csrfBody.data) fd.append("csrfToken", csrfBody.data);

			const res = await fetch("/api/proxy/cuti/kuota/import", {
				method: "POST",
				body: fd,
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal mengimpor kuota cuti"));
			}
			return (await res.json()) as { data?: { totalBerhasil?: number; totalGagal?: number; pesan?: string } };
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.kuota.all() });
			onSuccessCallback?.();
		},
	});
}

export function useSaveKuotaMutation(editing: CutiKuotaResponse | null, onSuccessCallback?: () => void) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (values: {
			pegawaiId: number;
			tahun: number;
			kuota: number;
			kuotaTambahan: number;
			keterangan?: string;
		}) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const body = {
				csrfToken: csrfBody.data ?? "",
				pegawaiId: values.pegawaiId,
				tahun: values.tahun,
				kuota: values.kuota,
				kuotaTambahan: values.kuotaTambahan,
				keterangan: values.keterangan,
			};
			const res = await fetch(`/api/proxy/cuti/kuota${editing?.id ? `/${editing.id}` : ""}`, {
				method: editing?.id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal menyimpan kuota cuti"));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.kuota.all() });
			onSuccessCallback?.();
		},
	});
}

export function usePegawaiSearchQuery(search: string) {
	return useQuery({
		queryKey: ["pegawai-search", search],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/list?size=20&search=${encodeURIComponent(search)}`);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = (await res.json()) as {
				data?: {
					content?: Array<{
						id: number;
						nama: string;
						nipam: string;
						statusPegawai?: string;
						jabatan?: { nama?: string };
					}>;
				};
			};
			return body.data?.content ?? [];
		},
		enabled: search.length >= 2,
		staleTime: 30_000,
	});
}
