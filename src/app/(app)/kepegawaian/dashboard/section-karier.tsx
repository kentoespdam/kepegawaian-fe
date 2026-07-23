"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fromPage, toApiParams } from "@/lib/paging";
import { SectionCard } from "./_section-card";

// ponytail: all 4 queries parallel, each fetch page 0 size 5 (preview only)
const PREVIEW = { page: 1, size: 5 };

function useRiwayat(endpoint: string, pegawaiId: number) {
	const params = { ...toApiParams(PREVIEW), pegawaiId: String(pegawaiId) };
	return useQuery({
		queryKey: [endpoint, params],
		queryFn: async () => {
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`${endpoint}?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data");
			const body = await res.json();
			return body.data as never;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

type Row = { id?: number; [k: string]: unknown };

export function SectionKarier({ pegawaiId }: { pegawaiId: number }) {
	const sk = useRiwayat("/api/proxy/kepegawaian/riwayat/sk/pegawai", pegawaiId);
	const mutasi = useRiwayat("/api/proxy/kepegawaian/riwayat/mutasi/pegawai", pegawaiId);
	const kontrak = useRiwayat("/api/proxy/kepegawaian/riwayat/kontrak/pegawai", pegawaiId);
	const sp = useRiwayat("/api/proxy/kepegawaian/riwayat/sp/pegawai", pegawaiId);

	const skView = fromPage(sk.data);
	const mutasiView = fromPage(mutasi.data);
	const kontrakView = fromPage(kontrak.data);
	const spView = fromPage(sp.data);

	return (
		<SectionCard title="Riwayat Karier">
			<div className="space-y-6">
				{/* SK */}
				<SubSection
					title="Riwayat SK"
					loading={sk.isPending}
					rows={skView.rows as Row[]}
					cols={[
						{ h: "No. SK", v: (r) => String(r.nomorSk ?? "") },
						{ h: "Jenis", v: (r) => labelJenisSk(r.jenisSk as string) },
						{ h: "Tgl. SK", v: (r) => String(r.tanggalSk ?? "") },
						{ h: "TMT", v: (r) => String(r.tmtBerlaku ?? "") },
					]}
				/>
				{/* Mutasi */}
				<SubSection
					title="Riwayat Mutasi"
					loading={mutasi.isPending}
					rows={mutasiView.rows as Row[]}
					cols={[
						{ h: "Jenis", v: (r) => labelJenisMutasi(r.jenisMutasi as string) },
						{ h: "Organisasi", v: (r) => String(r.namaOrganisasi ?? "") },
						{ h: "Jabatan", v: (r) => String(r.namaJabatan ?? "") },
						{ h: "TMT", v: (r) => String(r.tmtBerlaku ?? "") },
					]}
				/>
				{/* Kontrak */}
				<SubSection
					title="Riwayat Kontrak"
					loading={kontrak.isPending}
					rows={kontrakView.rows as Row[]}
					cols={[
						{ h: "No. Kontrak", v: (r) => String(r.nomorKontrak ?? "") },
						{ h: "Tgl. Mulai", v: (r) => String(r.tanggalMulai ?? "") },
						{ h: "Tgl. Selesai", v: (r) => String(r.tanggalSelesai ?? "") },
					]}
				/>
				{/* SP */}
				<SubSection
					title="Riwayat Disiplin / SP"
					loading={sp.isPending}
					rows={spView.rows as Row[]}
					cols={[
						{ h: "No. SP", v: (r) => String(r.nomorSp ?? "") },
						{ h: "Jenis SP", v: (r) => String((r.jenisSp as { nama?: string })?.nama ?? "") },
						{ h: "Tgl. SP", v: (r) => String(r.tanggalSp ?? "") },
						{ h: "Sanksi", v: (r) => String((r.sanksi as { keterangan?: string })?.keterangan ?? "") },
					]}
				/>
			</div>
		</SectionCard>
	);
}

function SubSection({
	title,
	loading,
	rows,
	cols,
}: {
	title: string;
	loading: boolean;
	rows: Row[];
	cols: { h: string; v: (r: Row) => string }[];
}) {
	if (loading) {
		return (
			<div>
				<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
				<p className="text-sm text-muted-foreground italic">Memuat...</p>
			</div>
		);
	}
	if (rows.length === 0) {
		return (
			<div>
				<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
				<p className="text-sm text-muted-foreground italic">Tidak ada data</p>
			</div>
		);
	}
	return (
		<div>
			<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border">
							{cols.map((c) => (
								<th
									key={c.h}
									className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-3 whitespace-nowrap"
								>
									{c.h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((r, i) => (
							<tr key={r.id ?? i} className="border-b border-border last:border-0">
								{cols.map((c) => (
									<td key={c.h} className="py-1.5 pr-3 whitespace-nowrap text-foreground">
										{c.v(r)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function labelJenisSk(s: string): string {
	const map: Record<string, string> = {
		SK_KENAIKAN_PANGKAT_GOLONGAN: "Kenaikan Pangkat",
		SK_CAPEG: "CPNS",
		SK_PEGAWAI_TETAP: "Pegawai Tetap",
		SK_JABATAN: "Jabatan",
		SK_MUTASI: "Mutasi",
		SK_PENSIUN: "Pensiun",
		SK_LAINNYA: "Lainnya",
		SK_PENYESUAIAN_GAJI: "Penyesuaian Gaji",
		SK_KENAIKAN_GAJI_BERKALA: "Kenaikan Gaji Berkala",
	};
	return map[s] ?? s;
}

function labelJenisMutasi(s: string): string {
	const map: Record<string, string> = {
		PENGANGKATAN_PERTAMA: "Pengangkatan Pertama",
		MUTASI_LOKER: "Mutasi Lokasi Kerja",
		MUTASI_JABATAN: "Mutasi Jabatan",
		MUTASI_GOLONGAN: "Mutasi Golongan",
		MUTASI_GAJI: "Mutasi Gaji",
		MUTASI_GAJI_BERKALA: "Mutasi Gaji Berkala",
		TERMINASI: "Terminasi",
	};
	return map[s] ?? s;
}
