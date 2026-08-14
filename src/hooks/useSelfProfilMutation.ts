"use client";

import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/** Hasil mutation CRUD self-service satu entitas profil (create/update/remove). */
export interface SelfProfilCrud {
	create: UseMutationResult<void, Error, Record<string, unknown>>;
	update: UseMutationResult<void, Error, { id: string | number } & Record<string, unknown>>;
	remove: UseMutationResult<void, Error, string | number>;
}

interface Options {
	url: {
		post: string;
		put: (id: string | number) => string;
		delete: (id: string | number) => string;
	};
	queryKey: string[];
	label: string;
	nik: string | null;
}

/**
 * Mutation CRUD self-service entitas profil (keluarga/pendidikan/pengalaman/keahlian/pelatihan).
 * Semua request via endpoint self `/profil/{entity}/...` → selalu masuk approval queue
 * (changedStatus=true). biodataId di-inject dari sesi (nik) — BUKAN dari input user.
 * Error ditampilkan inline di form (catch mutateAsync), bukan toast.
 */
export function useSelfProfilMutation({ url, queryKey, label, nik }: Options): SelfProfilCrud {
	const queryClient = useQueryClient();
	const invalidate = () => queryClient.invalidateQueries({ queryKey });

	return {
		create: useMutation({
			mutationFn: (data: Record<string, unknown>) =>
				selfProfilRequest(
					url.post,
					{ method: "POST", body: JSON.stringify({ ...data, biodataId: nik }) },
					`Gagal menyimpan ${label}`,
				),
			onSuccess: () => {
				invalidate();
				toast.success(`${label} dikirim untuk persetujuan`);
			},
		}),
		update: useMutation({
			mutationFn: ({ id, ...data }: { id: string | number } & Record<string, unknown>) =>
				selfProfilRequest(
					url.put(id),
					{ method: "PUT", body: JSON.stringify({ ...data, biodataId: nik }) },
					`Gagal menyimpan ${label}`,
				),
			onSuccess: () => {
				invalidate();
				toast.success(`${label} dikirim untuk persetujuan`);
			},
		}),
		remove: useMutation({
			mutationFn: (id: string | number) =>
				selfProfilRequest(url.delete(id), { method: "DELETE" }, `Gagal menghapus ${label}`),
			onSuccess: () => {
				invalidate();
				toast.success(`Pengajuan hapus ${label} dikirim untuk persetujuan`);
			},
		}),
	};
}

async function selfProfilRequest(url: string, init: RequestInit, fallback: string): Promise<void> {
	const res = await fetch(url, init);
	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
		throw new Error(extractErrorMessage(body, fallback));
	}
}

function extractErrorMessage(body: Record<string, unknown>, fallback: string): string {
	// Spring Boot ProblemDetail RFC 7807: { detail, title }
	if (typeof body.detail === "string" && body.detail.length > 0) return body.detail;
	if (typeof body.title === "string" && body.title.length > 0) return body.title;
	// Custom app errors: { message } atau { errors }
	if (typeof body.message === "string" && body.message.length > 0) return body.message;
	const errors = body.errors;
	if (typeof errors === "string" && errors.length > 0) return errors;
	if (Array.isArray(errors) && errors.length > 0) return String(errors[0]);
	return fallback;
}
