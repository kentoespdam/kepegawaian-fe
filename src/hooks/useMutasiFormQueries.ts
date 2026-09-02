import { useQuery } from "@tanstack/react-query";
import { masterKeys } from "@/hooks/keys/master-keys";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { api } from "@/lib/api/client";
import type { RiwayatMutasiQuery, SingleResultRiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";
import type { SingleResultPegawaiResponseMutasiContext } from "@/types/pegawai/pegawai";

// ── FK normalizer ──

export function normalizeFk(d: RiwayatMutasiQuery | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		nomorSk: d.skMutasi?.nomorSk ?? "",
		tanggalSk: d.skMutasi?.tanggalSk ?? "",
		tmtBerlaku: d.skMutasi?.tmtBerlaku ?? "",
		gajiPokok: String(d.skMutasi?.gajiPokok ?? "") || undefined,
		mkgTahun: String(d.skMutasi?.mkgTahun ?? "") || undefined,
		mkgBulan: String(d.skMutasi?.mkgBulan ?? "") || undefined,
		kenaikanBerikutnya: d.skMutasi?.kenaikanBerikutnya ?? "",
		mkgbTahun: String(d.skMutasi?.mkgbTahun ?? "") || undefined,
		mkgbBulan: String(d.skMutasi?.mkgbBulan ?? "") || undefined,
		updateMaster: d.skMutasi?.updateMaster ?? false,
		notes: d.notes ?? "",
		jenisMutasi: d.jenisMutasi ?? "",
		tanggalBerakhir: d.tanggalBerakhir ?? "",
		golonganId: String(d.golongan?.id ?? "") || undefined,
		organisasiId: String(d.organisasi?.id ?? "") || undefined,
		jabatanId: String(d.jabatan?.id ?? "") || undefined,
		profesiId: String(d.profesi?.id ?? "") || undefined,
		golonganLamaId: String(d.golonganLama?.id ?? "") || undefined,
		organisasiLamaId: String(d.organisasiLama?.id ?? "") || undefined,
		jabatanLamaId: String(d.jabatanLama?.id ?? "") || undefined,
		profesiLamaId: String(d.profesiLama?.id ?? "") || undefined,
	};
}

// ── Hook: cascade queries for mutasi form ──

export function useMutasiFormQueries(pegawaiId: string, editingId: string | null) {
	// Detail fetch
	const detailQuery = useQuery({
		queryKey: riwayatKeys.mutasi.detail(editingId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/mutasi/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data mutasi");
			const body = (await res.json()) as SingleResultRiwayatMutasiQuery;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	// Mutasi context (pegawai current state)
	const mutasiCtxQuery = useQuery({
		queryKey: riwayatKeys.mutasiContext(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/mutasi-context`);
			if (!res.ok) throw new Error("Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseMutasiContext;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});

	// FK options
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
	const orgOpts = useFkOptions("organisasi");

	return { detailQuery, mutasiCtxQuery, golonganOpts, orgOpts };
}

// ── Hook: cascade jabatan → profesi options ──

export function useJabatanProfesiCascade(organisasiId?: string, jabatanId?: string) {
	const jabQuery = useQuery({
		queryKey: masterKeys.list("jabatan", { organisasiId }),
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = ((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));

	const profesiQuery = useQuery({
		queryKey: masterKeys.list("profesi", { jabatanId }),
		queryFn: () => api.listBy<Record<string, unknown>>("profesi", "jabatan", String(jabatanId)),
		enabled: !!jabatanId,
		staleTime: 300_000,
	});
	const profesiOpts = ((profesiQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));

	return { jabQuery, jabOpts, profesiQuery, profesiOpts };
}
