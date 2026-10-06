"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";

export function useRolePermissionMutation(
	role: PrefRole | null,
	onPendingChange: (updater: (prev: Set<string>) => Set<string>) => void,
) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async ({ permName, assign }: { permName: string; assign: boolean }) => {
			if (!role) return;
			onPendingChange((prev) => new Set(prev).add(permName));
			const res = await fetch(`/api/proxy/system/roles/${role.id}/permissions/${permName}`, {
				method: assign ? "POST" : "DELETE",
			});
			if (!res.ok && res.status !== 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? (assign ? "Gagal menetapkan permission" : "Gagal mencabut permission"));
			}
		},
		onSuccess: (_d, { permName, assign }) => {
			toast.success(
				assign
					? `Hak akses ${permName} berhasil diberikan ke role ${role?.id}`
					: `Hak akses ${permName} berhasil dicabut dari role ${role?.id}`,
			);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => toast.error(e.message),
		onSettled: (_d, _e, { permName }) => {
			onPendingChange((prev) => {
				const next = new Set(prev);
				next.delete(permName);
				return next;
			});
		},
	});
}
