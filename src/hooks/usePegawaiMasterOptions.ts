import { useQuery } from "@tanstack/react-query";

export function usePajakOptions() {
	const query = useQuery({
		queryKey: ["gaji-pendapatan-non-pajak", "list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/penggajian/pendapatan-non-pajak/list");
			if (!res.ok) throw new Error("Gagal memuat data pajak");
			const body = await res.json();
			return body.data as Record<string, unknown>[];
		},
		staleTime: 300_000,
	});
	return ((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.kode ?? ""),
	}));
}

function useEnumOptions(url: string, queryKey: string) {
	const query = useQuery({
		queryKey: [queryKey, "list"],
		queryFn: async () => {
			const res = await fetch(url);
			if (!res.ok) throw new Error("Gagal memuat data");
			const body = await res.json();
			return (body.data ?? []) as { id?: string; nama?: string }[];
		},
		staleTime: 300_000,
	});
	return (query.data ?? []).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));
}

export function useStatusPegawaiOptions() {
	return useEnumOptions("/api/proxy/master/status-pegawai/list", "status-pegawai");
}

export function useStatusKerjaOptions() {
	return useEnumOptions("/api/proxy/master/status-kerja/list", "status-kerja");
}
