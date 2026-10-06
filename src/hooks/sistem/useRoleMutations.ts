"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";

export function useRoleMutations(
	roleFormRole: PrefRole | null,
	onDeleteSuccess?: () => void,
	onDeleteError?: (msg: string) => void,
	onSaveSuccess?: () => void,
	onSaveError?: (msg: string) => void,
) {
	const qc = useQueryClient();

	const deleteRoleMutation = useMutation({
		mutationFn: async (roleId: string) => {
			const res = await fetch(`/api/proxy/system/roles/${roleId}`, { method: "DELETE" });
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal menghapus role");
			}
		},
		onSuccess: () => {
			toast.success("Role berhasil dihapus");
			if (onDeleteSuccess) onDeleteSuccess();
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => {
			if (onDeleteError) onDeleteError(e.message);
		},
	});

	const saveRoleMutation = useMutation({
		mutationFn: async (data: { id: string; description?: string }) => {
			const res = await fetch(`/api/proxy/system/roles${roleFormRole ? `/${roleFormRole.id}` : ""}`, {
				method: roleFormRole ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(roleFormRole ? { description: data.description } : data),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal menyimpan role");
			}
		},
		onSuccess: () => {
			toast.success("Role berhasil disimpan");
			if (onSaveSuccess) onSaveSuccess();
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => {
			if (onSaveError) onSaveError(e.message);
		},
	});

	return {
		deleteRoleMutation,
		saveRoleMutation,
	};
}
