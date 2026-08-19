"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SECTIONS } from "@/config/dashboard-sections";
import { dashboardKeys } from "@/hooks/keys/dashboard-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { useSelfKeahlianMutation } from "@/hooks/useSelfKeahlianMutation";
import { useSelfKeluargaMutation } from "@/hooks/useSelfKeluargaMutation";
import { useSelfPelatihanMutation } from "@/hooks/useSelfPelatihanMutation";
import { useSelfPendidikanMutation } from "@/hooks/useSelfPendidikanMutation";
import { useSelfPengalamanKerjaMutation } from "@/hooks/useSelfPengalamanKerjaMutation";
import type { SelfProfilCrud } from "@/hooks/useSelfProfilMutation";
import { fetchSection } from "@/lib/kepegawaian-formatters";

// ponytail: shared accordion trigger className — hover bg + padding + chevron tint
export const ACCORDION_TRIGGER_AFF =
	"px-5 py-3 hover:bg-muted/50 data-[state=open]:bg-muted/20 **:data-[slot=accordion-trigger-icon]:text-primary";

type DashboardQuery = ReturnType<
	typeof useQuery<{
		rows: Record<string, unknown>[];
		total: number;
		totalPages: number;
		page: number;
		first: boolean;
		last: boolean;
	}>
>;

export interface UseDashboardSectionsReturn {
	queries: Record<string, DashboardQuery>;
	onPageChange: (id: string, page: number) => void;
	onSizeChange: (id: string, size: number) => void;
	crudMap: Record<string, SelfProfilCrud | undefined>;
	fkOptions: Record<string, { value: string; label: string }[]>;
	openValues: string[];
	setOpenValues: React.Dispatch<React.SetStateAction<string[]>>;
	pageMap: Record<string, number>;
	sizeMap: Record<string, number>;
}

export function useDashboardSections({
	pegawaiId,
	nik,
}: {
	pegawaiId: number;
	nik: string | null;
}): UseDashboardSectionsReturn {
	const [openValues, setOpenValues] = useState<string[]>(["keluarga"]);
	const [pageMap, setPageMap] = useState<Record<string, number>>({});
	const [sizeMap, setSizeMap] = useState<Record<string, number>>({});

	// ponytail: mutation self-service per entitas editable
	const crudMap: Record<string, SelfProfilCrud | undefined> = {
		keluarga: useSelfKeluargaMutation(nik),
		pendidikan: useSelfPendidikanMutation(nik),
		"pengalaman-kerja": useSelfPengalamanKerjaMutation(nik),
		keahlian: useSelfKeahlianMutation(nik),
		pelatihan: useSelfPelatihanMutation(nik),
	};

	// ponytail: FK options — staleTime 5m
	const fkOptions: Record<string, { value: string; label: string }[]> = {
		"jenjang-pendidikan": useFkOptions("jenjang-pendidikan"),
		"jenis-keahlian": useFkOptions("jenis-keahlian"),
		"jenis-pelatihan": useFkOptions("jenis-pelatihan"),
	};

	// ponytail: all 10 queries at top level, each enabled by open state
	const keluarga = useQuery({
		queryKey: dashboardKeys.section("keluarga", pegawaiId, nik, pageMap.keluarga ?? 1, sizeMap.keluarga ?? 5),
		queryFn: fetchSection(SECTIONS[0], pegawaiId, nik, pageMap.keluarga ?? 1, sizeMap.keluarga ?? 5),
		enabled: openValues.includes("keluarga"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pendidikan = useQuery({
		queryKey: dashboardKeys.section("pendidikan", pegawaiId, nik, pageMap.pendidikan ?? 1, sizeMap.pendidikan ?? 5),
		queryFn: fetchSection(SECTIONS[1], pegawaiId, nik, pageMap.pendidikan ?? 1, sizeMap.pendidikan ?? 5),
		enabled: openValues.includes("pendidikan"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pengalamanKerja = useQuery({
		queryKey: dashboardKeys.section(
			"pengalaman-kerja",
			pegawaiId,
			nik,
			pageMap["pengalaman-kerja"] ?? 1,
			sizeMap["pengalaman-kerja"] ?? 5,
		),
		queryFn: fetchSection(
			SECTIONS[2],
			pegawaiId,
			nik,
			pageMap["pengalaman-kerja"] ?? 1,
			sizeMap["pengalaman-kerja"] ?? 5,
		),
		enabled: openValues.includes("pengalaman-kerja"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const keahlian = useQuery({
		queryKey: dashboardKeys.section("keahlian", pegawaiId, nik, pageMap.keahlian ?? 1, sizeMap.keahlian ?? 5),
		queryFn: fetchSection(SECTIONS[3], pegawaiId, nik, pageMap.keahlian ?? 1, sizeMap.keahlian ?? 5),
		enabled: openValues.includes("keahlian"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pelatihan = useQuery({
		queryKey: dashboardKeys.section("pelatihan", pegawaiId, nik, pageMap.pelatihan ?? 1, sizeMap.pelatihan ?? 5),
		queryFn: fetchSection(SECTIONS[4], pegawaiId, nik, pageMap.pelatihan ?? 1, sizeMap.pelatihan ?? 5),
		enabled: openValues.includes("pelatihan"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const mutasi = useQuery({
		queryKey: dashboardKeys.section("mutasi", pegawaiId, nik, pageMap.mutasi ?? 1, sizeMap.mutasi ?? 5),
		queryFn: fetchSection(SECTIONS[5], pegawaiId, nik, pageMap.mutasi ?? 1, sizeMap.mutasi ?? 5),
		enabled: openValues.includes("mutasi"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const sk = useQuery({
		queryKey: dashboardKeys.section("sk", pegawaiId, nik, pageMap.sk ?? 1, sizeMap.sk ?? 5),
		queryFn: fetchSection(SECTIONS[6], pegawaiId, nik, pageMap.sk ?? 1, sizeMap.sk ?? 5),
		enabled: openValues.includes("sk"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const kontrak = useQuery({
		queryKey: dashboardKeys.section("kontrak", pegawaiId, nik, pageMap.kontrak ?? 1, sizeMap.kontrak ?? 5),
		queryFn: fetchSection(SECTIONS[7], pegawaiId, nik, pageMap.kontrak ?? 1, sizeMap.kontrak ?? 5),
		enabled: openValues.includes("kontrak"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const penggajian = useQuery({
		queryKey: dashboardKeys.section("penggajian", pegawaiId, nik, 1, 5),
		queryFn: fetchSection(SECTIONS[8], pegawaiId, nik, 1, 5),
		enabled: openValues.includes("penggajian"),
		staleTime: 30_000,
	});
	const sp = useQuery({
		queryKey: dashboardKeys.section("sp", pegawaiId, nik, pageMap.sp ?? 1, sizeMap.sp ?? 5),
		queryFn: fetchSection(SECTIONS[9], pegawaiId, nik, pageMap.sp ?? 1, sizeMap.sp ?? 5),
		enabled: openValues.includes("sp"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const queries: Record<string, DashboardQuery> = {
		keluarga,
		pendidikan,
		"pengalaman-kerja": pengalamanKerja,
		keahlian,
		pelatihan,
		mutasi,
		sk,
		kontrak,
		penggajian,
		sp,
	};

	const onPageChange = (id: string, page: number) => setPageMap((m) => ({ ...m, [id]: page }));
	const onSizeChange = (id: string, size: number) => setSizeMap((m) => ({ ...m, [id]: size }));

	return {
		queries,
		onPageChange,
		onSizeChange,
		crudMap,
		fkOptions,
		openValues,
		setOpenValues,
		pageMap,
		sizeMap,
	};
}
