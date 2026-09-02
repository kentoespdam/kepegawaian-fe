"use client";

import { useQuery } from "@tanstack/react-query";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { throwIfNotOk } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";

/**
 * Fetches pegawai session data (nik) via shared cache key.
 * Used by all pendukung pages — one fetch, shared via queryKey.
 */
export function usePegawaiSession(pegawaiId: string) {
	return useQuery({
		queryKey: riwayatKeys.session(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/session`);
			throwIfNotOk(res, "Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseSession;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});
}
