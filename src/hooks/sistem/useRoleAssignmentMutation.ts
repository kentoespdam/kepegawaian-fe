"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";

export function useRoleAssignmentMutation(onSuccessCallback?: () => void) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async ({ userId, roles }: { userId: string; roles: PrefRole[] }) => {
			const res = await fetch(`/api/proxy/system/users/pref/${userId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(roles),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal memperbarui role");
			}
		},
		onSuccess: () => {
			toast.success("Role user diperbarui");
			if (onSuccessCallback) onSuccessCallback();
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
		onError: (e: Error) => toast.error(e.message),
	});
}
