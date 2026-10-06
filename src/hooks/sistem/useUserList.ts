"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import { toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type { PageResultPageUserResponse, UserPatchStatusRequest } from "@/types/system/users";

export function useUserList(page: number, size: number, nipam: string, nama: string, onToggleSuccess?: () => void) {
	const qc = useQueryClient();

	const query = useQuery({
		queryKey: systemKeys.users.list({ page, size, nipam, nama }),
		queryFn: async () => {
			const params: Record<string, string> = toApiParams({ page, size });
			if (nipam) params.nipam = nipam;
			if (nama) params.nama = nama;
			const res = await fetch(`/api/proxy/system/users?${new URLSearchParams(params).toString()}`);
			throwIfNotOk(res, "Gagal memuat user");
			return ((await res.json()) as PageResultPageUserResponse).data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const toggleStatusMutation = useMutation({
		mutationFn: async ({ userId, status }: { userId: string; status: boolean }) => {
			const payload: UserPatchStatusRequest = { status };
			const res = await fetch(`/api/proxy/system/users/${userId}/status`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal mengubah status");
			}
		},
		onSuccess: () => {
			toast.success("Status user diperbarui");
			if (onToggleSuccess) onToggleSuccess();
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
	});

	return {
		query,
		toggleStatusMutation,
	};
}
