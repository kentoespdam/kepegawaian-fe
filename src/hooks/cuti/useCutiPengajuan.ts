"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cutiKeys } from "@/hooks/keys/cuti-keys";
import { apiErrorMessage, throwIfNotOk } from "@/lib/utils";
import type { ListResultCutiJenisMiniResponse } from "@/types/cuti/jenis";
import type { CutiKuotaSisa } from "@/types/cuti/kuota";
import type { CutiPengajuanResponse, PageResultPageCutiPengajuanResponse } from "@/types/cuti/pengajuan";

export function useCutiPengajuanList(params: {
	pegawaiId: number | null;
	tahun: number;
	page: number;
	size: number;
	tahunMasuk?: number;
	jenisPengajuanCuti?: string;
	approvalCutiStatus?: string;
}) {
	return useQuery({
		queryKey: cutiKeys.pengajuan.list({
			pegawaiId: params.pegawaiId,
			tahun: params.tahun,
			page: params.page,
			size: params.size,
			tahunMasuk: params.tahunMasuk,
			jenisPengajuanCuti: params.jenisPengajuanCuti,
			approvalCutiStatus: params.approvalCutiStatus,
		}),
		queryFn: async () => {
			const queryParams: Record<string, string> = {
				page: String(params.page - 1),
				size: String(params.size),
				tahun: String(params.tahun),
				pegawaiId: String(params.pegawaiId),
			};
			if (params.tahunMasuk) queryParams.tahunMasuk = String(params.tahunMasuk);
			if (params.jenisPengajuanCuti) queryParams.jenisPengajuanCuti = params.jenisPengajuanCuti;
			if (params.approvalCutiStatus) queryParams.approvalCutiStatus = params.approvalCutiStatus;
			const qs = new URLSearchParams(queryParams).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pengajuan cuti");
			const body = (await res.json()) as PageResultPageCutiPengajuanResponse;
			return body.data;
		},
		enabled: params.pegawaiId != null,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});
}

export function useCutiKuotaByPegawai(pegawaiId: number | null, tahun: number) {
	return useQuery({
		queryKey: cutiKeys.kuota.detail(pegawaiId, tahun),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/cuti/kuota/pegawai/${pegawaiId}/${tahun}/sisa`);
			if (!res.ok) throw new Error("Gagal memuat kuota cuti");
			const body = (await res.json()) as { data?: CutiKuotaSisa };
			return body.data;
		},
		enabled: pegawaiId != null,
		staleTime: 60_000,
	});
}

export function useCancelCutiMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, alasan }: { id: number; alasan?: string }) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const res = await fetch(`/api/proxy/cuti/pengajuan/${id}/cancel`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ csrfToken: csrfBody.data ?? "", alasan: alasan ?? "Dibatalkan pemohon" }),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal membatalkan pengajuan"));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.pengajuan.all() });
		},
	});
}

export function useJenisCutiList() {
	return useQuery({
		queryKey: cutiKeys.jenisList(),
		queryFn: async () => {
			const res = await fetch("/api/proxy/cuti/jenis/list");
			if (!res.ok) throw new Error("Gagal memuat jenis cuti");
			const body = (await res.json()) as ListResultCutiJenisMiniResponse;
			return body.data ?? [];
		},
		staleTime: 300_000,
	});
}

export function useHariKerjaQuery(tanggalMulai?: string, tanggalSelesai?: string) {
	return useQuery({
		queryKey: cutiKeys.totalHariKerja(tanggalMulai ?? "", tanggalSelesai ?? ""),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/cuti/pengajuan/${tanggalMulai}/${tanggalSelesai}/total-hari-kerja`);
			if (!res.ok) throw new Error("Gagal menghitung hari kerja");
			const body = (await res.json()) as { data?: number };
			return body.data ?? 0;
		},
		enabled: !!tanggalMulai && !!tanggalSelesai && tanggalSelesai >= tanggalMulai,
		staleTime: 60_000,
	});
}

export function useSaveCutiMutation(pegawaiId: number, editing: CutiPengajuanResponse | null) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (values: {
			jenisCutiId: number;
			subJenisCutiId?: number;
			tanggalMulai: string;
			tanggalSelesai: string;
			jumlahHariKerja: number;
			alasan: string;
		}) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const body = {
				csrfToken: csrfBody.data ?? "",
				pegawaiId,
				jenisCutiId: values.jenisCutiId,
				subJenisCutiId: values.subJenisCutiId,
				tanggalMulai: values.tanggalMulai,
				tanggalSelesai: values.tanggalSelesai,
				jumlahHariKerja: values.jumlahHariKerja,
				alasan: values.alasan,
			};
			const res = await fetch(`/api/proxy/cuti/pengajuan${editing?.id ? `/${editing.id}` : ""}`, {
				method: editing?.id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal menyimpan pengajuan"));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.pengajuan.all() });
		},
	});
}

export function useKlaimCutiMutation(pegawaiId: number) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (values: {
			pengajuanId: number;
			tanggalMulai: string;
			tanggalSelesai: string;
			jumlahHariKerja: number;
			alasan: string;
		}) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const body = {
				csrfToken: csrfBody.data ?? "",
				pegawaiId,
				tanggalMulai: values.tanggalMulai,
				tanggalSelesai: values.tanggalSelesai,
				jumlahHariKerja: values.jumlahHariKerja,
				alasan: values.alasan,
			};
			const res = await fetch(`/api/proxy/cuti/pengajuan/${values.pengajuanId}/klaim`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal mengajukan klaim cuti"));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.pengajuan.all() });
		},
	});
}
