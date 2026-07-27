"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { BiodataPatchRequest } from "@/types/profil/biodata";

function patchBiodata({ nik, data }: { nik: string; data: BiodataPatchRequest }) {
	return fetch(`/api/proxy/profil/biodata/${nik}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).then(async (res) => {
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			throw new Error((body as { message?: string }).message ?? "Gagal menyimpan biodata");
		}
	});
}

export function useBiodataMutation(nik: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchBiodata,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["/api/proxy/profil/biodata", nik] });
			toast.success("Biodata berhasil diperbarui");
		},
	});
}
