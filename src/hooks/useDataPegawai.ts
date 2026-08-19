"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { pegawaiKeys } from "@/hooks/keys/pegawai-keys";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type { PegawaiResponseRingkasan } from "@/types/pegawai/pegawai";

export const TABS = [
	{ id: "aktif", label: "Aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "KARYAWAN_AKTIF" } },
	{ id: "nonaktif", label: "Non-aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "BERHENTI_OR_KELUAR" } },
	{ id: "nonpegawai", label: "Non-pegawai", endpoint: "/api/proxy/profil/biodata", filter: { isPegawai: "false" } },
] as const;

export const FILTER_PARAMS = [
	"nama",
	"nipam",
	"nik",
	"statusPegawai",
	"jabatanId",
	"organisasiId",
	"profesiId",
	"golonganId",
	"gradeId",
	"statusKerja",
	"jenisKelamin",
] as const;

export function useDataPegawai() {
	const sp = useSearchParams();
	const router = useRouter();
	const tab = (sp.get("tab") as (typeof TABS)[number]["id"]) ?? "aktif";
	const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;

	const filterValues: Record<string, string> = {};
	for (const key of FILTER_PARAMS) {
		const val = sp.get(key);
		if (val) filterValues[key] = val;
	}

	const hasActiveFilter = Object.keys(filterValues).length > 0;

	const params = {
		...activeTab.filter,
		...filterValues,
		...toApiParams({ page, size, sortBy, sortDir }),
	};

	const [selectedId, setSelectedId] = useState<string | number | null>(null);

	const query = useQuery({
		queryKey: pegawaiKeys.list(params),
		queryFn: async () => {
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`${activeTab.endpoint}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const ringkasanQuery = useQuery({
		queryKey: pegawaiKeys.ringkasan(selectedId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${selectedId}/ringkasan`);
			throwIfNotOk(res, "Gagal memuat ringkasan");
			const body = await res.json();
			return body.data as PegawaiResponseRingkasan;
		},
		enabled: !!selectedId,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		setSelectedId(null);
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		const p = new URLSearchParams();
		p.set("tab", tab);
		p.set("page", "1");
		p.set("size", String(size));
		router.replace(`/kepegawaian/data?${p.toString()}`);
	};

	return {
		tab,
		activeTab,
		page,
		size,
		sortBy,
		sortDir,
		filterValues,
		hasActiveFilter,
		selectedId,
		setSelectedId,
		query,
		ringkasanQuery,
		pageView,
		nav,
		onFilterChange,
		onReset,
	};
}
