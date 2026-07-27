"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fromPage, toApiParams } from "@/lib/paging";
import type { Page } from "@/types/_shared";

// ponytail: helpers
function t(s: unknown): string {
	if (s == null) return "-";
	if (typeof s === "object" && "nama" in (s as object)) return String((s as { nama?: string }).nama ?? "-");
	return String(s);
}
function val(s: unknown): string {
	if (s == null) return "-";
	return String(s);
}
function rp(n: unknown): string {
	if (n == null || n === "") return "-";
	const v = Number(n);
	if (!Number.isFinite(v)) return val(n);
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(v);
}
function boolStr(s: unknown): string {
	if (s === true) return "Ya";
	if (s === false) return "Tidak";
	return "-";
}
function jenisSk(s: unknown): string {
	if (s == null) return "-";
	const raw = typeof s === "object" && "nama" in (s as object) ? (s as { nama?: string }).nama : String(s);
	if (!raw) return "-";
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
	return map[raw] ?? raw;
}
function jenisMutasi(s: unknown): string {
	const map: Record<string, string> = {
		PENGANGKATAN_PERTAMA: "Pengangkatan Pertama",
		MUTASI_LOKER: "Mutasi Lokasi Kerja",
		MUTASI_JABATAN: "Mutasi Jabatan",
		MUTASI_GOLONGAN: "Mutasi Golongan",
		MUTASI_GAJI: "Mutasi Gaji",
		MUTASI_GAJI_BERKALA: "Mutasi Gaji Berkala",
		TERMINASI: "Terminasi",
	};
	return map[val(s)] ?? val(s);
}
function hubunganKeluarga(s: unknown): string {
	const map: Record<string, string> = {
		SUAMI: "Suami",
		ISTRI: "Istri",
		AYAH: "Ayah",
		IBU: "Ibu",
		ANAK: "Anak",
		SAUDARA: "Saudara",
	};
	return map[val(s)] ?? val(s);
}

// ponytail: section column defs — one per section, used both in useQuery and rendering
interface SectionConf {
	id: string;
	label: string;
	buildUrl: (pegawaiId: number, nik: string | null, params: Record<string, string>) => string;
	columns: Column<Record<string, unknown>>[];
	isSingleItem?: boolean; // non-paginated endpoint (penggajian)
}

const SECTIONS: SectionConf[] = [
	{
		id: "keluarga",
		label: "Data Keluarga",
		buildUrl: (_, nik, p) => `/api/proxy/profil/keluarga?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama", primary: true },
			{ id: "hubunganKeluarga", header: "Hubungan", cell: (r) => hubunganKeluarga(r.hubunganKeluarga) },
			{ id: "tanggalLahir", header: "Tgl Lahir", cell: (r) => val(r.tanggalLahir) },
			{ id: "tanggungan", header: "Tanggungan", cell: (r) => boolStr(r.tanggungan) },
		],
	},
	{
		id: "pendidikan",
		label: "Data Pendidikan",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pendidikan?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "institusi", header: "Institusi", primary: true },
			{ id: "jenjangPendidikan", header: "Jenjang", cell: (r) => t(r.jenjangPendidikan) },
			{ id: "jurusan", header: "Jurusan" },
			{ id: "tahunLulus", header: "Tahun Lulus", cell: (r) => val(r.tahunLulus) },
		],
	},
	{
		id: "pengalaman-kerja",
		label: "Data Pengalaman Kerja",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pengalaman-kerja?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "namaPerusahaan", header: "Perusahaan", primary: true },
			{ id: "jabatan", header: "Jabatan" },
			{ id: "tahunMasuk", header: "Tahun Masuk", cell: (r) => val(r.tahunMasuk) },
			{ id: "tahunKeluar", header: "Tahun Keluar", cell: (r) => val(r.tahunKeluar) },
		],
	},
	{
		id: "keahlian",
		label: "Data Keahlian",
		buildUrl: (_, nik, p) => `/api/proxy/profil/keahlian?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "jenisKeahlian", header: "Keahlian", primary: true, cell: (r) => t(r.jenisKeahlian) },
			{ id: "kualifikasi", header: "Kualifikasi" },
			{ id: "sertifikasi", header: "Sertifikasi", cell: (r) => boolStr(r.sertifikasi) },
			{ id: "tahun", header: "Tahun", cell: (r) => val(r.tahun) },
		],
	},
	{
		id: "pelatihan",
		label: "Data Pelatihan",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pelatihan?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama Pelatihan", primary: true },
			{ id: "lembaga", header: "Lembaga" },
			{ id: "tanggalMulai", header: "Tgl Mulai", cell: (r) => val(r.tanggalMulai) },
			{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (r) => val(r.tanggalSelesai) },
		],
	},
	{
		id: "mutasi",
		label: "Riwayat Mutasi",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/mutasi/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "jenisMutasi", header: "Jenis", primary: true, cell: (r) => jenisMutasi(r.jenisMutasi) },
			{ id: "namaOrganisasi", header: "Organisasi" },
			{ id: "namaJabatan", header: "Jabatan" },
			{ id: "tmtBerlaku", header: "TMT" },
		],
	},
	{
		id: "sk",
		label: "Riwayat SK",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sk/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSk", header: "No. SK", primary: true },
			{ id: "jenisSk", header: "Jenis", cell: (r) => jenisSk(r.jenisSk) },
			{ id: "tanggalSk", header: "Tgl. SK" },
			{ id: "tmtBerlaku", header: "TMT" },
		],
	},
	{
		id: "kontrak",
		label: "Riwayat Kontrak",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorKontrak", header: "No. Kontrak", primary: true },
			{ id: "tanggalMulai", header: "Tgl Mulai" },
			{ id: "tanggalSelesai", header: "Tgl Selesai" },
		],
	},
	{
		id: "penggajian",
		label: "Riwayat Penggajian",
		// ponytail: p omitted — non-paginated endpoint
		buildUrl: (id) => `/api/proxy/penggajian/batch/master/pegawai/${id}`,
		columns: [
			{ id: "periode", header: "Periode", primary: true },
			{ id: "gajiPokok", header: "Gaji Pokok", cell: (r) => rp(r.gajiPokok) },
			{ id: "penghasilanKotor", header: "Penghasilan Kotor", cell: (r) => rp(r.penghasilanKotor) },
			{ id: "totalPotongan", header: "Potongan", cell: (r) => rp(r.totalPotongan) },
			{ id: "pajak", header: "Pajak", cell: (r) => rp(r.pajak) },
			{ id: "penghasilanBersihFinal", header: "Penghasilan Bersih", cell: (r) => rp(r.penghasilanBersihFinal) },
		],
		isSingleItem: true,
	},
	{
		id: "sp",
		label: "Riwayat Disiplin / SP",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sp/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSp", header: "No. SP", primary: true },
			{ id: "jenisSp", header: "Jenis SP", cell: (r) => t(r.jenisSp) },
			{ id: "tanggalSp", header: "Tgl. SP" },
		],
	},
];

// ponytail: fetch function for one section, used by useQuery
function fetchSection(conf: SectionConf, pegawaiId: number, nik: string | null, page: number, size: number) {
	const params = { ...toApiParams({ page, size }) };
	const url = conf.buildUrl(pegawaiId, nik, params);
	return async (): Promise<{
		rows: Record<string, unknown>[];
		total: number;
		totalPages: number;
		page: number;
		first: boolean;
		last: boolean;
	}> => {
		const res = await fetch(url);
		if (!res.ok) throw new Error("Gagal memuat data");
		const body = await res.json();
		if (conf.isSingleItem) {
			const items = body.data ? (Array.isArray(body.data) ? body.data : [body.data]) : [];
			// ponytail: guard FINISHED only untuk penggajian
			const finished = (items as { status?: string }[]).filter((r) => r.status === "FINISHED");
			return {
				rows: finished as Record<string, unknown>[],
				total: finished.length,
				totalPages: 1,
				page: 1,
				first: true,
				last: true,
			};
		}
		const pv = fromPage(body.data as Page<unknown>);
		return {
			rows: pv.rows as Record<string, unknown>[],
			total: pv.total,
			totalPages: pv.totalPages,
			page: pv.page,
			first: pv.first,
			last: pv.last,
		};
	};
}

export function SectionRightPanel({ pegawaiId, nik }: { pegawaiId: number; nik: string | null }) {
	const [openValues, setOpenValues] = useState<string[]>(["keluarga"]);
	const [pageMap, setPageMap] = useState<Record<string, number>>({});
	const [sizeMap, setSizeMap] = useState<Record<string, number>>({});

	// ponytail: all 10 hooks at top level, each enabled by open state (rules of hooks ✓)
	const keluarga = useQuery({
		queryKey: ["keluarga", pegawaiId, nik, pageMap.keluarga ?? 1, sizeMap.keluarga ?? 5],
		queryFn: fetchSection(SECTIONS[0], pegawaiId, nik, pageMap.keluarga ?? 1, sizeMap.keluarga ?? 5),
		enabled: openValues.includes("keluarga"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pendidikan = useQuery({
		queryKey: ["pendidikan", pegawaiId, nik, pageMap.pendidikan ?? 1, sizeMap.pendidikan ?? 5],
		queryFn: fetchSection(SECTIONS[1], pegawaiId, nik, pageMap.pendidikan ?? 1, sizeMap.pendidikan ?? 5),
		enabled: openValues.includes("pendidikan"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pengalamanKerja = useQuery({
		queryKey: ["pengalaman-kerja", pegawaiId, nik, pageMap["pengalaman-kerja"] ?? 1, sizeMap["pengalaman-kerja"] ?? 5],
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
		queryKey: ["keahlian", pegawaiId, nik, pageMap.keahlian ?? 1, sizeMap.keahlian ?? 5],
		queryFn: fetchSection(SECTIONS[3], pegawaiId, nik, pageMap.keahlian ?? 1, sizeMap.keahlian ?? 5),
		enabled: openValues.includes("keahlian"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const pelatihan = useQuery({
		queryKey: ["pelatihan", pegawaiId, nik, pageMap.pelatihan ?? 1, sizeMap.pelatihan ?? 5],
		queryFn: fetchSection(SECTIONS[4], pegawaiId, nik, pageMap.pelatihan ?? 1, sizeMap.pelatihan ?? 5),
		enabled: openValues.includes("pelatihan"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const mutasi = useQuery({
		queryKey: ["mutasi", pegawaiId, pageMap.mutasi ?? 1, sizeMap.mutasi ?? 5],
		queryFn: fetchSection(SECTIONS[5], pegawaiId, nik, pageMap.mutasi ?? 1, sizeMap.mutasi ?? 5),
		enabled: openValues.includes("mutasi"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const sk = useQuery({
		queryKey: ["sk", pegawaiId, pageMap.sk ?? 1, sizeMap.sk ?? 5],
		queryFn: fetchSection(SECTIONS[6], pegawaiId, nik, pageMap.sk ?? 1, sizeMap.sk ?? 5),
		enabled: openValues.includes("sk"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const kontrak = useQuery({
		queryKey: ["kontrak", pegawaiId, pageMap.kontrak ?? 1, sizeMap.kontrak ?? 5],
		queryFn: fetchSection(SECTIONS[7], pegawaiId, nik, pageMap.kontrak ?? 1, sizeMap.kontrak ?? 5),
		enabled: openValues.includes("kontrak"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
	const penggajian = useQuery({
		queryKey: ["penggajian", pegawaiId],
		queryFn: fetchSection(SECTIONS[8], pegawaiId, nik, 1, 5),
		enabled: openValues.includes("penggajian"),
		staleTime: 30_000,
	});
	const sp = useQuery({
		queryKey: ["sp", pegawaiId, pageMap.sp ?? 1, sizeMap.sp ?? 5],
		queryFn: fetchSection(SECTIONS[9], pegawaiId, nik, pageMap.sp ?? 1, sizeMap.sp ?? 5),
		enabled: openValues.includes("sp"),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const queries: Record<string, typeof keluarga> = {
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

	// ponytail: helper per-page change
	const onPageChange = (id: string, page: number) => setPageMap((m) => ({ ...m, [id]: page }));
	const onSizeChange = (id: string, size: number) => setSizeMap((m) => ({ ...m, [id]: size }));

	return (
		<div className="rounded-lg border bg-card shadow-sm">
			<Accordion value={openValues} onValueChange={setOpenValues} multiple>
				{SECTIONS.map((conf) => {
					const q = queries[conf.id];
					const s = sizeMap[conf.id] ?? 5;
					const view = q.data;
					return (
						<AccordionItem key={conf.id} value={conf.id}>
							<AccordionTrigger>{conf.label}</AccordionTrigger>
							<AccordionContent>
								{openValues.includes(conf.id) && (
									<DataTable<Record<string, unknown>>
										columns={conf.columns}
										data={view?.rows ?? []}
										isLoading={q.isPending}
										isPlaceholder={q.isPlaceholderData}
										isError={q.isError}
										error={q.error}
										onRetry={() => q.refetch()}
										emptyMessage="Tidak ada data"
										pagination={
											view ? (
												<DataTablePagination
													page={view.page}
													size={s}
													total={view.total}
													totalPages={view.totalPages}
													first={view.first}
													last={view.last}
													onPageChange={(np) => onPageChange(conf.id, np)}
													onSizeChange={(ns) => onSizeChange(conf.id, ns)}
												/>
											) : undefined
										}
									/>
								)}
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
}
