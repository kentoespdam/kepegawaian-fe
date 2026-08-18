"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { useState } from "react";
import type { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { keahlianCrudConfig } from "@/config/profil/keahlian.config";
import { keluargaCrudConfig } from "@/config/profil/keluarga.config";
import { pelatihanCrudConfig } from "@/config/profil/pelatihan.config";
import { pendidikanCrudConfig } from "@/config/profil/pendidikan.config";
import { pengalamanKerjaCrudConfig } from "@/config/profil/pengalaman-kerja.config";
import { useFkOptions } from "@/hooks/useFkOptions";
import { useSelfKeahlianMutation } from "@/hooks/useSelfKeahlianMutation";
import { useSelfKeluargaMutation } from "@/hooks/useSelfKeluargaMutation";
import { useSelfPelatihanMutation } from "@/hooks/useSelfPelatihanMutation";
import { useSelfPendidikanMutation } from "@/hooks/useSelfPendidikanMutation";
import { useSelfPengalamanKerjaMutation } from "@/hooks/useSelfPengalamanKerjaMutation";
import type { SelfProfilCrud } from "@/hooks/useSelfProfilMutation";
import { fromPage, toApiParams } from "@/lib/paging";
import { cn, formatDate, throwIfNotOk } from "@/lib/utils";
import type { Page } from "@/types/_shared";
import { SectionCrudSlot } from "./section-crud-slot";

// ponytail: shared afordansi trigger className — hover bg + padding + chevron tint
const ACCORDION_TRIGGER_AFF =
	"px-5 py-3 hover:bg-muted/50 data-[state=open]:bg-muted/20 **:data-[slot=accordion-trigger-icon]:text-primary";

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
		SK_CAPEG: "Calon Pegawai",
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

// ponytail: SP severity tint
function spSeverity(s: unknown): string {
	// ponytail: naive heuristic — SP3/P3/BERAT = destructive, SP2/P2 = warning, others = default
	const raw = String(s ?? "").toLowerCase();
	if (raw.includes("3") || raw.includes("berat")) return "text-destructive";
	if (raw.includes("2") || raw.includes("sedang")) return "text-warning";
	return "";
}

// ponytail: section column defs — one per section, used both in useQuery and rendering
interface CrudConfig {
	label: string;
	formSchema: z.ZodType;
	formFields: FormField[];
	/** FK combobox: field name → master entity slug (options di-fetch via /master/{entity}/list). */
	fkSources?: { field: string; entity: string }[];
	defaultValues: (row: Record<string, unknown>) => Record<string, unknown>;
}

export interface SectionConf {
	id: string;
	label: string;
	buildUrl: (pegawaiId: number, nik: string | null, params: Record<string, string>) => string;
	columns: Column<Record<string, unknown>>[];
	isSingleItem?: boolean; // non-paginated endpoint (penggajian)
	crudConfig?: CrudConfig; // ada = section editable self-service; tanpa = read-only
}

const SECTIONS: SectionConf[] = [
	{
		id: "keluarga",
		label: "Data Keluarga",
		buildUrl: (_, nik, p) => `/api/proxy/profil/keluarga?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama", primary: true },
			{ id: "hubunganKeluarga", header: "Hubungan", cell: (r) => hubunganKeluarga(r.hubunganKeluarga) },
			{ id: "tanggalLahir", header: "Tgl Lahir", cell: (r) => formatDate(r.tanggalLahir) },
			{ id: "tanggungan", header: "Tanggungan", cell: (r) => boolStr(r.tanggungan) },
		],
		crudConfig: keluargaCrudConfig,
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
		crudConfig: pendidikanCrudConfig,
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
		crudConfig: pengalamanKerjaCrudConfig,
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
		crudConfig: keahlianCrudConfig,
	},
	{
		id: "pelatihan",
		label: "Data Pelatihan",
		buildUrl: (_, nik, p) => `/api/proxy/profil/pelatihan?biodataId=${nik}&${new URLSearchParams(p)}`,
		columns: [
			{ id: "nama", header: "Nama Pelatihan", primary: true },
			{ id: "lembaga", header: "Lembaga" },
			{ id: "tanggalMulai", header: "Tgl Mulai", cell: (r) => formatDate(r.tanggalMulai) },
			{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (r) => formatDate(r.tanggalSelesai) },
		],
		crudConfig: pelatihanCrudConfig,
	},
	{
		id: "mutasi",
		label: "Riwayat Mutasi",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/mutasi/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "jenisMutasi", header: "Jenis", primary: true, cell: (r) => jenisMutasi(r.jenisMutasi) },
			{ id: "namaOrganisasi", header: "Organisasi" },
			{ id: "namaJabatan", header: "Jabatan" },
			{ id: "tmtBerlaku", header: "TMT", cell: (r) => formatDate(r.tmtBerlaku) },
		],
	},
	{
		id: "sk",
		label: "Riwayat SK",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sk/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSk", header: "No. SK", primary: true },
			{ id: "jenisSk", header: "Jenis", cell: (r) => jenisSk(r.jenisSk) },
			{ id: "tanggalSk", header: "Tgl. SK", cell: (r) => formatDate(r.tanggalSk) },
			{ id: "tmtBerlaku", header: "TMT", cell: (r) => formatDate(r.tmtBerlaku) },
		],
	},
	{
		id: "kontrak",
		label: "Riwayat Kontrak",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorKontrak", header: "No. Kontrak", primary: true },
			{ id: "tanggalMulai", header: "Tgl Mulai", cell: (r) => formatDate(r.tanggalMulai) },
			{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (r) => formatDate(r.tanggalSelesai) },
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
			{
				id: "penghasilanBersihFinal",
				header: "Penghasilan Bersih",
				// ponytail: emphasis angka bersih — semantik actionable
				cell: (r) => <span className="font-semibold text-foreground">{rp(r.penghasilanBersihFinal)}</span>,
			},
		],
		isSingleItem: true,
	},
	{
		id: "sp",
		label: "Riwayat Disiplin / SP",
		buildUrl: (id, _, p) => `/api/proxy/kepegawaian/riwayat/sp/pegawai/${id}?${new URLSearchParams(p)}`,
		columns: [
			{ id: "nomorSp", header: "No. SP", primary: true },
			{
				id: "jenisSp",
				header: "Jenis SP",
				// ponytail: tint severity sebagai sinyal, bukan dekorasi
				cell: (r) => <span className={cn(spSeverity(r.jenisSp), "font-medium")}>{t(r.jenisSp)}</span>,
			},
			{ id: "tanggalSp", header: "Tgl. SP", cell: (r) => formatDate(r.tanggalSp) },
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
		throwIfNotOk(res, "Gagal memuat data");
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

	// ponytail: mutation self-service per entitas editable (5 hook, dipilih via conf.id)
	const crudMap: Record<string, SelfProfilCrud | undefined> = {
		keluarga: useSelfKeluargaMutation(nik),
		pendidikan: useSelfPendidikanMutation(nik),
		"pengalaman-kerja": useSelfPengalamanKerjaMutation(nik),
		keahlian: useSelfKeahlianMutation(nik),
		pelatihan: useSelfPelatihanMutation(nik),
	};

	// ponytail: options FK combobox (list master kecil, staleTime 5m — sekali fetch, dipakai lintas section)
	const fkOptions: Record<string, { value: string; label: string }[]> = {
		"jenjang-pendidikan": useFkOptions("jenjang-pendidikan"),
		"jenis-keahlian": useFkOptions("jenis-keahlian"),
		"jenis-pelatihan": useFkOptions("jenis-pelatihan"),
	};

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
			<Accordion className="px-5 py-1" value={openValues} onValueChange={setOpenValues} multiple>
				{SECTIONS.map((conf) => {
					const q = queries[conf.id];
					const hasPending = (q.data?.rows ?? []).some((r) => Boolean(r.changedStatus));
					return (
						<AccordionItem key={conf.id} value={conf.id}>
							<AccordionTrigger className={ACCORDION_TRIGGER_AFF}>
								<span className="inline-flex items-center gap-2">
									{conf.label}
									{conf.crudConfig && hasPending && (
										<Badge variant="outline" className="gap-1 text-warning border-warning/30 bg-warning/5">
											<Clock className="size-3" />
											Menunggu
										</Badge>
									)}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								{openValues.includes(conf.id) && (
									<SectionCrudSlot
										conf={conf}
										q={q}
										crud={crudMap[conf.id]}
										fkOptions={fkOptions}
										nik={nik}
										size={sizeMap[conf.id] ?? 5}
										onPageChange={(np) => onPageChange(conf.id, np)}
										onSizeChange={(ns) => onSizeChange(conf.id, ns)}
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
