"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { BiodataPatchRequest } from "@/types/profil/biodata";

function extractErrorMessage(body: Record<string, unknown>): string {
	// Spring Boot ProblemDetail RFC 7807: { detail, title }
	if (typeof body.detail === "string" && body.detail.length > 0) return body.detail;
	if (typeof body.title === "string" && body.title.length > 0) return body.title;
	// Custom app errors: { message }
	if (typeof body.message === "string" && body.message.length > 0) return body.message;
	return "Gagal menyimpan biodata";
}

function patchBiodata({ nik, data }: { nik: string; data: BiodataPatchRequest }) {
	return fetch(`/api/proxy/profil/biodata/${nik}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).then(async (res) => {
		if (!res.ok) {
			const body: Record<string, unknown> = await res.json().catch(() => ({}));
			throw new Error(extractErrorMessage(body));
		}
	});
}

export function useBiodataMutation(nik: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchBiodata,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["biodata", nik] });
			toast.success("Biodata berhasil diperbarui");
		},
	});
}
