import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { masterKeys } from "@/hooks/keys/master-keys";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";

export const TERMINASI_TABS = [
	{
		id: "calon-pensiun",
		label: "Calon Pensiun",
		endpoint: "/api/proxy/kepegawaian/riwayat/terminasi/calon-pensiun",
	},
	{
		id: "terminasi",
		label: "Sudah Terminasi",
		endpoint: "/api/proxy/kepegawaian/riwayat/terminasi",
	},
] as const;

export type TerminasiTabId = (typeof TERMINASI_TABS)[number]["id"];

export function useTerminasiTable() {
	const sp = useSearchParams();
	const router = useRouter();

	const tab = (sp.get("tab") as TerminasiTabId) ?? "calon-pensiun";
	const activeTab = TERMINASI_TABS.find((t) => t.id === tab) ?? TERMINASI_TABS[0];

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;
	const tahunPensiun = sp.get("tahunPensiun") ?? String(new Date().getFullYear());
	const alasanTerminasiId = sp.get("alasanTerminasiId") ?? undefined;

	const filter: Record<string, string> = {};
	if (tab === "calon-pensiun") filter.tahunPensiun = tahunPensiun;
	if (tab === "terminasi") {
		filter.tahunTerminasi = tahunPensiun;
		if (alasanTerminasiId) filter.alasanTerminasiId = alasanTerminasiId;
	}

	const params = { ...filter, ...toApiParams({ page, size, sortBy, sortDir }) };

	const query = useQuery({
		queryKey: [activeTab.endpoint, params],
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

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/terminasi?${p.toString()}`);
	};

	// ponytail: alasan-berhenti list for filter dropdown — shared between table filter and form
	const alasanQuery = useQuery({
		queryKey: masterKeys.list("alasan-berhenti"),
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/alasan-berhenti/list");
			if (!res.ok) return [] as Array<{ id: number; nama: string }>;
			const body = await res.json();
			return (body.data ?? []) as Array<{ id: number; nama: string }>;
		},
		staleTime: 300_000,
	});

	const alasanOptions = (alasanQuery.data ?? []).map((i) => ({
		value: String(i.id),
		label: i.nama,
	}));

	return {
		tab,
		page,
		size,
		sortBy,
		sortDir,
		tahunPensiun,
		alasanTerminasiId,
		query,
		pageView,
		alasanOptions,
		alasanLoading: alasanQuery.isPending,
		nav,
	};
}
