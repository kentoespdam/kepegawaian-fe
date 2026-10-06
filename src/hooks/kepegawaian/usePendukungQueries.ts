"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type {
	PageResultPageKartuIdentitasQuery,
	SingleResultKartuIdentitasDetail,
} from "@/types/profil/kartu-identitas";
import type { PageResultPageKeahlianQuery, SingleResultKeahlianDetail } from "@/types/profil/keahlian";
import type { PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail } from "@/types/profil/keluarga";
import type { PageResultPagePelatihanQuery, SingleResultPelatihanDetail } from "@/types/profil/pelatihan";
import type { PageResultPagePendidikanQuery, SingleResultPendidikanQuery } from "@/types/profil/pendidikan";
import type {
	PageResultPagePengalamanKerjaQuery,
	SingleResultPengalamanKerjaDetail,
} from "@/types/profil/pengalaman-kerja";

export function usePendukungList(pegawaiId: string, kategori: string) {
	return useQuery({
		queryKey: [...riwayatKeys.all, "pendukung", pegawaiId, kategori],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/pendukung/${kategori}`);
			throwIfNotOk(res, `Gagal memuat data ${kategori}`);
			const body = (await res.json()) as { data: unknown };
			return body.data;
		},
	});
}

export function usePendukungDetail(pegawaiId: string, kategori: string, id: string | null) {
	return useQuery({
		queryKey: [...riwayatKeys.all, "pendukung", pegawaiId, kategori, id],
		queryFn: async () => {
			if (!id) return null;
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/pendukung/${kategori}/${id}`);
			throwIfNotOk(res, `Gagal memuat detail ${kategori}`);
			const body = (await res.json()) as { data: unknown };
			return body.data;
		},
		enabled: !!id,
	});
}

export function useKartuIdentitasList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.kartuIdentitas.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			const jenisKartuId = queryParams.jenisKartuId ?? queryParams.jenisKartu;
			if (jenisKartuId) params.jenisKartuId = String(jenisKartuId);
			if (queryParams.nomorKartu) params.nomorKartu = String(queryParams.nomorKartu);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/kartu-identitas?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kartu identitas");
			const body = (await res.json()) as PageResultPageKartuIdentitasQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useKartuIdentitasDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.kartuIdentitas.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/kartu-identitas/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail kartu identitas");
			const body = (await res.json()) as SingleResultKartuIdentitasDetail;
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function usePendidikanList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.pendidikan.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			if (queryParams.institusi) params.institusi = String(queryParams.institusi);
			if (queryParams.jenjangId) params.jenjangId = String(queryParams.jenjangId);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pendidikan?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pendidikan");
			const body = (await res.json()) as PageResultPagePendidikanQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function usePendidikanDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.pendidikan.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/pendidikan/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail pendidikan");
			const body = (await res.json()) as SingleResultPendidikanQuery;
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function usePengalamanKerjaList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.pengalamanKerja.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			const namaPerusahaan = queryParams.namaPerusahaan ?? queryParams.perusahaan;
			if (namaPerusahaan) params.namaPerusahaan = String(namaPerusahaan);
			if (queryParams.jabatan) params.jabatan = String(queryParams.jabatan);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pengalaman-kerja?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pengalaman kerja");
			const body = (await res.json()) as PageResultPagePengalamanKerjaQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function usePengalamanKerjaDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.pengalamanKerja.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/pengalaman-kerja/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail pengalaman kerja");
			const body = (await res.json()) as SingleResultPengalamanKerjaDetail;
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function usePelatihanList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.pelatihan.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			const nama = queryParams.nama ?? queryParams.namaPelatihan;
			if (nama) params.nama = String(nama);
			if (queryParams.jenisPelatihanId) params.jenisPelatihanId = String(queryParams.jenisPelatihanId);
			if (queryParams.lembaga) params.lembaga = String(queryParams.lembaga);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pelatihan?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pelatihan");
			const body = (await res.json()) as PageResultPagePelatihanQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function usePelatihanDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.pelatihan.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/pelatihan/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail pelatihan");
			const body = (await res.json()) as SingleResultPelatihanDetail;
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useKeahlianList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.keahlian.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			const jenisKeahlianId = queryParams.jenisKeahlianId ?? queryParams.keahlian;
			if (jenisKeahlianId) params.jenisKeahlianId = String(jenisKeahlianId);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keahlian?${qs}`);
			throwIfNotOk(res, "Gagal memuat data keahlian");
			const body = (await res.json()) as PageResultPageKeahlianQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useKeahlianDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.keahlian.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/keahlian/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail keahlian");
			const body = (await res.json()) as SingleResultKeahlianDetail;
			return body.data;
		},
		enabled: !!editingId,
	});
}

export function useKeluargaList(pegawaiId: string, queryParams: Record<string, unknown>, nik?: string) {
	return useQuery({
		queryKey: profilKeys.keluarga.list(pegawaiId, { ...queryParams, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: Number(queryParams.page ?? 1), size: Number(queryParams.size ?? 10) }),
				biodataId: nik ?? "",
			};
			const hubunganKeluarga = queryParams.hubunganKeluarga ?? queryParams.hubunganId;
			if (hubunganKeluarga) params.hubunganKeluarga = String(hubunganKeluarga);
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keluarga?${qs}`);
			throwIfNotOk(res, "Gagal memuat data keluarga");
			const body = (await res.json()) as PageResultPageProfilKeluargaQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

export function useKeluargaDetail(editingId: string | null) {
	return useQuery({
		queryKey: profilKeys.keluarga.detail(editingId),
		queryFn: async () => {
			if (!editingId) return null;
			const res = await fetch(`/api/proxy/profil/keluarga/${editingId}`);
			throwIfNotOk(res, "Gagal memuat detail keluarga");
			const body = (await res.json()) as SingleResultProfilKeluargaDetail;
			return body.data;
		},
		enabled: !!editingId,
	});
}
