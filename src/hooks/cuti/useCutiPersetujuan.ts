"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cutiKeys } from "@/hooks/keys/cuti-keys";
import { toApiParams } from "@/lib/paging";
import { apiErrorMessage, throwIfNotOk } from "@/lib/utils";
import type { PageResultPageCutiApprovalMiniResponse } from "@/types/cuti/approval";
import type { PageResultPageCutiApprovalChainResponse } from "@/types/cuti/pengajuan";

export function useCutiPersetujuanList(params: {
	pegawaiId: number | null;
	jabatanId: number | null;
	tahun: number;
	page: number;
	size: number;
	statusParam: string;
	readWriteStatus: string;
}) {
	return useQuery({
		queryKey: cutiKeys.persetujuan.list({
			jabatanId: params.jabatanId,
			tahun: params.tahun,
			page: params.page,
			size: params.size,
			statusParam: params.statusParam,
			readWriteStatus: params.readWriteStatus,
		}),
		queryFn: async () => {
			const apiParams: Record<string, string> = {
				...toApiParams({ page: params.page, size: params.size }),
				tahun: String(params.tahun),
				picSaatIniId: String(params.jabatanId),
				approvalCutiStatus: params.statusParam,
			};
			if (params.readWriteStatus) apiParams.readWriteStatus = params.readWriteStatus;
			const qs = new URLSearchParams(apiParams).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/approval?${qs}`);
			throwIfNotOk(res, "Gagal memuat data persetujuan");
			const body = (await res.json()) as PageResultPageCutiApprovalChainResponse;
			return body.data;
		},
		enabled: params.pegawaiId != null && params.jabatanId != null,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});
}

export function useCutiDetailApproval(cutiId: number) {
	return useQuery({
		queryKey: cutiKeys.approvalHistory(cutiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/cuti/approval/${cutiId}?size=100`);
			throwIfNotOk(res, "Gagal memuat riwayat approval");
			const body = (await res.json()) as PageResultPageCutiApprovalMiniResponse;
			return body.data?.content ?? [];
		},
		enabled: cutiId > 0,
		staleTime: 30_000,
		gcTime: 300_000,
	});
}

export function useCutiApprovalMutation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({
			cutiId,
			action,
			catatan,
		}: {
			cutiId: number;
			action: "APPROVE" | "REJECT";
			catatan: string;
		}) => {
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const endpoint = action === "APPROVE" ? "approve" : "reject";
			const res = await fetch(`/api/proxy/cuti/pengajuan/${cutiId}/${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ csrfToken: csrfBody.data ?? "", catatan }),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, `Gagal ${action === "APPROVE" ? "menyetujui" : "menolak"} cuti`));
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: cutiKeys.persetujuan.all() });
		},
	});
}
