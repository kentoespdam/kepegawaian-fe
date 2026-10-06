"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { AuthPostRequest } from "@/types/system/users";

export function useCreateUser(onSuccessCallback?: () => void) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (data: AuthPostRequest) => {
			const res = await fetch("/api/proxy/system/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal membuat user");
			}
		},
		onSuccess: () => {
			toast.success("User dibuat");
			if (onSuccessCallback) onSuccessCallback();
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
	});
}
