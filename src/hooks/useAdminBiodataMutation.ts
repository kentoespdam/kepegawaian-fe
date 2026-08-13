"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { BiodataPatchRequest } from "@/types/admin/profil";

/** PATCH /admin/profil/{nik} — edit biodata oleh HRD/ADMIN, langsung stable (tanpa approval queue). */
export function useAdminBiodataMutation(nik: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: BiodataPatchRequest) =>
			fetch(`/api/proxy/admin/profil/${nik}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then(async (res) => {
				if (!res.ok) {
					const body: Record<string, unknown> = await res.json().catch(() => ({}));
					throw new Error(extractErrorMessage(body));
				}
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["biodata", nik] });
			toast.success("Biodata berhasil diperbarui");
		},
	});
}

function extractErrorMessage(body: Record<string, unknown>): string {
	// Spring Boot ProblemDetail RFC 7807: { detail, title }
	if (typeof body.detail === "string" && body.detail.length > 0) return body.detail;
	if (typeof body.title === "string" && body.title.length > 0) return body.title;
	// Custom app errors: { message }
	if (typeof body.message === "string" && body.message.length > 0) return body.message;
	return "Gagal menyimpan biodata";
}
