"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type {
	PageResultPageProfileUpdateQuery,
	SingleResultProfilUpdateDetailObject,
	StatusUpdateProfil,
} from "@/types/profil/profil-update";

export function useProfilApproval(
	page: number,
	size: number,
	nama: string,
	nipam: string,
	status: string,
	selectedId: number | null,
	pegawaiId: number | null,
	onSuccessApproval?: () => void,
) {
	const qc = useQueryClient();

	const query = useQuery({
		queryKey: profilKeys.update.list({ page, size, nama, nipam, status }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), approvalStatus: status };
			if (nama) params.nama = nama;
			if (nipam) params.nipam = nipam;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/profil-update?${qs}`);
			throwIfNotOk(res, "Gagal memuat antrian approval");
			const body = (await res.json()) as PageResultPageProfileUpdateQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const detailQuery = useQuery({
		queryKey: profilKeys.update.detail(selectedId),
		queryFn: async () => {
			if (selectedId == null) return null;
			const res = await fetch(`/api/proxy/profil/profil-update/${selectedId}`);
			throwIfNotOk(res, "Gagal memuat detail");
			const body = (await res.json()) as SingleResultProfilUpdateDetailObject;
			return body.data;
		},
		enabled: selectedId != null,
	});

	const approvalMutation = useMutation({
		mutationFn: async ({ id, approval }: { id: number; approval: StatusUpdateProfil }) => {
			const res = await fetch(`/api/proxy/profil/profil-update/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ approval, pegawaiId }),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal memproses approval");
			}
		},
		onSuccess: (_d, { approval }) => {
			toast.success(approval === "APPROVED" ? "Perubahan disetujui" : "Perubahan ditolak");
			if (onSuccessApproval) onSuccessApproval();
			qc.invalidateQueries({ queryKey: profilKeys.update.all() });
		},
	});

	return {
		query,
		detailQuery,
		approvalMutation,
	};
}
