"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";

export function useRoleManagement(roleFormRole?: PrefRole | null) {
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
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
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
			toast.success(roleFormRole ? "Role berhasil diperbarui" : "Role baru berhasil dibuat");
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
	});

	const toggleSingleMutation = useMutation({
		mutationFn: async ({ roleId, permName, assign }: { roleId: string; permName: string; assign: boolean }) => {
			const res = await fetch(`/api/proxy/system/roles/${roleId}/permissions/${permName}`, {
				method: assign ? "POST" : "DELETE",
			});
			if (!res.ok && res.status !== 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? (assign ? "Gagal menetapkan permission" : "Gagal mencabut permission"));
			}
		},
		onSuccess: (_d, { permName, assign, roleId }) => {
			toast.success(
				assign
					? `Hak akses ${permName} berhasil diberikan ke role ${roleId}`
					: `Hak akses ${permName} berhasil dicabut dari role ${roleId}`,
			);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
	});

	return {
		deleteRoleMutation,
		saveRoleMutation,
		toggleSingleMutation,
	};
}
