"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";

export function useRiwayatList(pegawaiId: string, kategori: string) {
	return useQuery({
		queryKey: [...riwayatKeys.all, "riwayat", pegawaiId, kategori],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/riwayat/${kategori}`);
			throwIfNotOk(res, `Gagal memuat riwayat ${kategori}`);
			const body = await res.json();
			return body.data;
		},
	});
}

export function useRiwayatDetail(pegawaiId: string, kategori: string, id: string | null) {
	return useQuery({
		queryKey: [...riwayatKeys.all, "riwayat", pegawaiId, kategori, id],
		queryFn: async () => {
			if (!id) return null;
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/riwayat/${kategori}/${id}`);
			throwIfNotOk(res, `Gagal memuat detail riwayat ${kategori}`);
			const body = await res.json();
			return body.data;
		},
		enabled: !!id,
	});
}

export function useSkList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.sk.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				pegawaiId,
			};
			if (queryParams.nomorSk) params.nomorSk = String(queryParams.nomorSk);
			if (queryParams.jenisSkId) params.jenisSkId = String(queryParams.jenisSkId);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/riwayat/sk?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SK");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useSkDetail(editingId: string | null) {
	return useQuery({
		queryKey: riwayatKeys.sk.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/riwayat/sk/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail SK");
			const body = await res.json();
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useMutasiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.mutasi.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				pegawaiId,
			};
			if (queryParams.nomorSk) params.nomorSk = String(queryParams.nomorSk);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/riwayat/mutasi?${qs}`);
			throwIfNotOk(res, "Gagal memuat data mutasi");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useMutasiDetail(editingId: string | null) {
	return useQuery({
		queryKey: riwayatKeys.mutasi.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/riwayat/mutasi/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail mutasi");
			const body = await res.json();
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useMutasiContextData(pegawaiId: string) {
	return useQuery({
		queryKey: riwayatKeys.mutasiContext(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/mutasi-context`);
			throwIfNotOk(res, "Gagal memuat konteks mutasi");
			const body = await res.json();
			return body.data;
		},
		staleTime: 5 * 60_000,
	});
}

export function useSpList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.sp.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				pegawaiId,
			};
			if (queryParams.nomorSp) params.nomorSp = String(queryParams.nomorSp);
			if (queryParams.tingkatSpId) params.tingkatSpId = String(queryParams.tingkatSpId);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/riwayat/sp?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SP");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useSpDetail(editingId: string | null) {
	return useQuery({
		queryKey: riwayatKeys.sp.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/riwayat/sp/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail SP");
			const body = await res.json();
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useKontrakList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.kontrak.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				pegawaiId,
			};
			if (queryParams.nomorKontrak) params.nomorKontrak = String(queryParams.nomorKontrak);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/riwayat/kontrak?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kontrak");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useKontrakDetail(editingId: string | null) {
	return useQuery({
		queryKey: riwayatKeys.kontrak.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/riwayat/kontrak/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail kontrak");
			const body = await res.json();
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useCutiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.cuti.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				pegawaiId,
			};
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/riwayat/cuti?${qs}`);
			throwIfNotOk(res, "Gagal memuat data cuti");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useSkPegawaiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.sk.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
			};
			if (queryParams.nomorSk) params.nomorSk = String(queryParams.nomorSk);
			if (queryParams.jenisSkFilter) params.jenisSk = String(queryParams.jenisSkFilter);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sk/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SK");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useMutasiPegawaiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.mutasi.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
			};
			if (queryParams.nomorSk) params.nomorSk = String(queryParams.nomorSk);
			if (queryParams.jenisMutasiFilter) params.jenisMutasi = String(queryParams.jenisMutasiFilter);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/mutasi/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data mutasi");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useSpPegawaiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.sp.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
			};
			if (queryParams.nomorSp) params.nomorSp = String(queryParams.nomorSp);
			if (queryParams.tingkatSpId) params.tingkatSpId = String(queryParams.tingkatSpId);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SP");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useKontrakPegawaiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.kontrak.list(pegawaiId, queryParams),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
			};
			if (queryParams.nomorKontrak) params.nomorKontrak = String(queryParams.nomorKontrak);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kontrak");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useCutiPegawaiList(pegawaiId: string, queryParams: Record<string, unknown>) {
	return useQuery({
		queryKey: riwayatKeys.cuti.list(pegawaiId, queryParams),
		queryFn: async () => {
			const qs = new URLSearchParams({
				...toApiParams({
					page: Number(queryParams.page ?? 1),
					size: Number(queryParams.size ?? 10),
					sortBy: "tanggalMulai",
					sortDir: "desc",
				}),
				tahun: String(queryParams.tahun ?? new Date().getFullYear()),
			}).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/${pegawaiId}/pegawai?${qs}`);
			throwIfNotOk(res, "Gagal memuat data cuti");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useCutiKuotaPegawai(pegawaiId: string, tahun: number) {
	return useQuery({
		queryKey: ["cuti-kuota", pegawaiId, tahun],
		queryFn: async () => {
			const qs = new URLSearchParams({ pegawaiId, tahun: String(tahun) }).toString();
			const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
			throwIfNotOk(res, "Gagal memuat kuota cuti");
			const body = await res.json();
			return body.data;
		},
		staleTime: 30_000,
	});
}

export function useJenisSpList() {
	return useQuery({
		queryKey: ["jenis-sp-list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/jenis-sp/list");
			if (!res.ok) return [];
			const body = await res.json();
			return ((body.data ?? []) as Array<{ id: number; nama: string }>).map((i) => ({
				value: String(i.id),
				label: i.nama ?? "",
			}));
		},
		staleTime: 300_000,
	});
}

export function useSanksiList(jenisSpId: string | number | null) {
	return useQuery({
		queryKey: ["sanksi-by-jenis-sp", jenisSpId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/master/sanksi/jenis-sp/${jenisSpId}`);
			if (!res.ok) throw new Error("Gagal memuat sanksi");
			const body = await res.json();
			return ((body.data ?? []) as Array<{ id: number; keterangan: string }>).map((i) => ({
				value: String(i.id),
				label: i.keterangan ?? "",
			}));
		},
		enabled: !!jenisSpId,
		staleTime: 300_000,
	});
}

export function useSignerPegawaiSearch(debouncedSearch: string) {
	return useQuery({
		queryKey: ["pegawai-search", debouncedSearch],
		queryFn: async () => {
			const res = await fetch(
				`/api/proxy/pegawai/list?search=${encodeURIComponent(debouncedSearch)}&statusKerja=KARYAWAN_AKTIF`,
			);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = await res.json();
			return (body.data ?? []) as Record<string, unknown>[];
		},
		enabled: debouncedSearch.length >= 2,
		staleTime: 60_000,
	});
}
