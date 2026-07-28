"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { CrudForm, type FormField } from "@/components/crud-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBiodataMutation } from "@/hooks/useBiodataMutation";
import { cn, formatDate } from "@/lib/utils";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import type { BiodataDashboardResponse, BiodataPatchRequest, PendidikanDashboard } from "@/types/profil/biodata";
import { ENUMS } from "../data/tambah/constants";

// ponytail: shared afordansi trigger className
const ACCORDION_TRIGGER_AFF =
	"px-5 py-3 hover:bg-muted/50 data-[state=open]:bg-muted/20 **:data-[slot=accordion-trigger-icon]:text-primary";

export function SectionLeftPanel({ pegawai, nik }: { pegawai: PegawaiResponseDetail; nik: string | null }) {
	const [openValues, setOpenValues] = useState<string[]>(["data-pribadi"]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const biodataMutation = useBiodataMutation(nik ?? "");

	const biodataFormSchema = z.object({
		nik: z.string().optional(),
		nama: z.string().min(1, "Nama wajib diisi"),
		jenisKelamin: z.string().optional(),
		tempatLahir: z.string().optional(),
		tanggalLahir: z.string().optional(),
		agama: z.string().optional(),
		statusKawin: z.string().optional(),
		ibuKandung: z.string().optional(),
		telp: z
			.string()
			.optional()
			.refine((v) => !v || /^[0-9+\-\s()]{7,20}$/.test(v), "Format nomor telepon tidak valid"),
		alamat: z.string().optional(),
	});

	const editFormFields: FormField[] = [
		{ name: "nik", label: "NIK", type: "text", required: false },
		{ name: "nama", label: "Nama", type: "text", required: true },
		{
			name: "jenisKelamin",
			label: "Jenis Kelamin",
			type: "select",
			required: false,
			options: [...ENUMS.jenisKelamin],
		},
		{ name: "tempatLahir", label: "Tempat Lahir", type: "text", required: false },
		{ name: "tanggalLahir", label: "Tanggal Lahir", type: "date", required: false },
		{ name: "agama", label: "Agama", type: "select", required: false, options: [...ENUMS.agama] },
		{
			name: "statusKawin",
			label: "Status Kawin",
			type: "select",
			required: false,
			options: [...ENUMS.statusKawin],
		},
		{ name: "ibuKandung", label: "Ibu Kandung", type: "text", required: false },
		{ name: "telp", label: "Telp", type: "text", required: false },
		{ name: "alamat", label: "Alamat", type: "textarea", required: false },
	];

	const handleEditSubmit = async (data: Record<string, unknown>) => {
		setFormError(null);
		try {
			const payload: Record<string, unknown> = {};
			for (const [key, v] of Object.entries(data)) {
				if (key === "nik") continue;
				if (v === "" || v === undefined) continue;
				payload[key] = v;
			}
			await biodataMutation.mutateAsync({ nik: nik ?? "", data: payload as BiodataPatchRequest });
			setDialogOpen(false);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			setFormError(msg);
		}
	};

	const biodata = useQuery({
		queryKey: ["biodata", nik, "dashboard"],
		queryFn: async () => {
			if (!nik) return null;
			const res = await fetch(`/api/proxy/profil/biodata/${nik}/dashboard`);
			if (!res.ok) return null;
			const body = await res.json();
			return (body.data as BiodataDashboardResponse) ?? null;
		},
		enabled: !!nik,
		staleTime: 60_000,
	});

	const d = biodata.data;
	const nama = pegawai.biodata?.nama ?? d?.nama ?? "-";
	const nipam = pegawai.nipam ?? "-";
	const jabatan = pegawai.jabatan?.nama ?? "-";
	const fotoProfil = pegawai.biodata?.fotoProfil;

	return (
		<div className="rounded-lg border bg-card shadow-sm">
			{/* Header identitas — always visible */}
			<div className="flex items-center gap-4 px-5 py-4 border-b border-border">
				<div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
					{fotoProfil ? (
						<Image src={fotoProfil} alt="" width={56} height={56} className="size-full object-cover" unoptimized />
					) : (
						<span className="text-lg font-semibold">{nama.charAt(0)}</span>
					)}
				</div>
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-foreground truncate">{nama}</h3>
					<p className="text-xs text-muted-foreground tabular-nums">{nipam}</p>
					<p className="text-xs text-muted-foreground truncate">{jabatan}</p>
				</div>
			</div>

			{/* Accordion */}
			<Accordion className="px-5 py-1" value={openValues} onValueChange={setOpenValues} multiple>
				{/* Data Pribadi */}
				<AccordionItem value="data-pribadi">
					<AccordionTrigger className={ACCORDION_TRIGGER_AFF}>
						<span className="inline-flex items-center gap-2">
							Data Pribadi
							{d?.changedStatus && (
								<Tooltip>
									<TooltipTrigger render={<span />}>
										<Badge variant="outline" className="gap-1 text-warning border-warning/30 bg-warning/5">
											<Clock className="size-3" />
											Menunggu
										</Badge>
									</TooltipTrigger>
									<TooltipContent side="top" align="center">
										Perubahan biodata sedang menunggu persetujuan admin
									</TooltipContent>
								</Tooltip>
							)}
						</span>
					</AccordionTrigger>
					<AccordionContent>
						{!nik ? (
							<p className="text-sm text-muted-foreground italic">Tidak ada data</p>
						) : biodata.isPending ? (
							<p className="text-sm text-muted-foreground italic">Memuat...</p>
						) : d ? (
							<>
								{nik && (
									<div className="flex items-center justify-end mb-2">
										<button
											type="button"
											onClick={() => setDialogOpen(true)}
											className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
										>
											<Pencil className="size-3" />
											Edit Profil
										</button>
									</div>
								)}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<Field label="NIK" value={d.nik} />
									<Field label="Nama" value={d.nama} />
									<Field label="Jenis Kelamin" value={labelJk(d.jenisKelamin)} />
									<Field label="Tempat Lahir" value={d.tempatLahir} />
									<Field label="Tanggal Lahir" value={formatDate(d.tanggalLahir)} />
									<Field label="Agama" value={d.agama ? labelAgama(d.agama) : undefined} />
									<Field label="Status Kawin" value={d.statusKawin ? labelKawin(d.statusKawin) : undefined} />
									<Field label="Pendidikan Terakhir" value={formatPendidikan(d.detailPendidikanTerakhir)} />
									<Field label="Ibu Kandung" value={d.ibuKandung} />
									<Field label="Email" value={d.email} />
									<Field label="Kode Pajak" value={d.kodePajak} />
									<Field label="Telp" value={d.noTelp} />
									<Field label="Alamat" value={d.alamat} className="sm:col-span-2" />
								</div>
							</>
						) : (
							<p className="text-sm text-muted-foreground italic">Data tidak tersedia</p>
						)}
					</AccordionContent>
				</AccordionItem>

				{/* Data Kepegawaian */}
				<AccordionItem value="data-kepegawaian">
					<AccordionTrigger className={ACCORDION_TRIGGER_AFF}>Data Kepegawaian</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Field
								label="Status Pegawai"
								value={pegawai.statusPegawai ? labelStatus(pegawai.statusPegawai) : undefined}
							/>
							<Field
								label="Status Kerja"
								value={pegawai.statusKerja ? labelStatusKerja(pegawai.statusKerja) : undefined}
								// ponytail: badge semantik — sinyal visual tanpa menambah warna baru
								badgeClass={statusKerjaColor(pegawai.statusKerja)}
							/>
							<Field label="Organisasi" value={pegawai.organisasi?.nama} />
							<Field label="Jabatan" value={pegawai.jabatan?.nama} />
							<Field label="Profesi" value={pegawai.profesi?.nama} />
							<Field
								label="Golongan"
								value={
									pegawai.golongan?.golongan
										? `${pegawai.golongan.golongan} (${pegawai.golongan.pangkat ?? ""})`
										: undefined
								}
							/>
							<Field label="Grade" value={pegawai.grade?.grade ? `Grade ${pegawai.grade.grade}` : undefined} />
							<Field label="TMT Kerja" value={formatDate(pegawai.tmtKerja)} />
							<Field label="TMT Pensiun" value={formatDate(pegawai.tmtPensiun)} />
							<Field
								label="Masa Kerja"
								value={pegawai.mkgTahun != null ? `${pegawai.mkgTahun} th ${pegawai.mkgBulan ?? 0} bln` : undefined}
							/>
							<Field label="Gaji Pokok" value={pegawai.gajiPokok != null ? formatRp(pegawai.gajiPokok) : undefined} />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Edit Profil Dialog */}
			<Dialog
				open={dialogOpen}
				onOpenChange={(v) => {
					if (!v) {
						setDialogOpen(false);
						setFormError(null);
					}
				}}
			>
				<DialogContent className="flex flex-col max-h-[85dvh] sm:max-w-lg p-0 gap-0 overflow-hidden">
					<DialogHeader className="shrink-0 px-4 pt-4">
						<DialogTitle>Edit Profil</DialogTitle>
					</DialogHeader>
					<div className="flex-1 overflow-y-auto px-4 pb-0 [&>form]:flex [&>form]:flex-1 [&>form]:flex-col [&>form>div:last-of-type]:mt-auto [&>form>div:last-of-type]:sticky [&>form>div:last-of-type]:bottom-0 [&>form>div:last-of-type]:bg-popover [&>form>div:last-of-type]:pt-4 [&>form>div:last-of-type]:pb-4 [&>form>div:last-of-type]:border-t [&>form>div:last-of-type]:border-border [&>form>div:last-of-type]:-mx-4 [&>form>div:last-of-type]:px-4">
						<CrudForm
							schema={biodataFormSchema as never}
							fields={editFormFields}
							defaultValues={
								d
									? ({
											nik: d.nik ?? "",
											nama: d.nama ?? "",
											jenisKelamin: d.jenisKelamin ?? "",
											tempatLahir: d.tempatLahir ?? "",
											tanggalLahir: d.tanggalLahir ?? "",
											agama: d.agama ?? "",
											statusKawin: d.statusKawin ?? "",
											ibuKandung: d.ibuKandung ?? "",
											telp: d.noTelp ?? "",
											alamat: d.alamat ?? "",
										} as Record<string, unknown>)
									: undefined
							}
							onSubmit={handleEditSubmit}
							onCancel={() => {
								setDialogOpen(false);
								setFormError(null);
							}}
							error={formError}
							submitLabel="Simpan Biodata"
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function Field({
	label,
	value,
	className,
	badgeClass,
}: {
	label: string;
	value?: string | null;
	className?: string;
	badgeClass?: string;
}) {
	return (
		<div className={className}>
			<p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
			<p className={cn("text-sm", badgeClass)}>{value ?? "-"}</p>
		</div>
	);
}

function statusKerjaColor(s?: string): string | undefined {
	if (s === "KARYAWAN_AKTIF") return "text-success";
	if (s === "BERHENTI_OR_KELUAR") return "text-destructive";
	if (s === "DIRUMAHKAN") return "text-warning";
	return undefined;
}

function labelJk(s?: string): string {
	if (s === "LAKI_LAKI") return "Laki-laki";
	if (s === "PEREMPUAN") return "Perempuan";
	return s ?? "-";
}

function labelAgama(s: string): string {
	const map: Record<string, string> = {
		ISLAM: "Islam",
		KRISTEN: "Kristen",
		KATOLIK: "Katolik",
		HINDU: "Hindu",
		BUDHA: "Buddha",
		KONGHUCHU: "Konghuchu",
		ALIRAN_KEPERCAYAAN: "Aliran Kepercayaan",
		LAINNYA: "Lainnya",
	};
	return map[s] ?? s;
}

function labelKawin(s: string): string {
	const map: Record<string, string> = {
		BELUM_KAWIN: "Belum Kawin",
		KAWIN: "Kawin",
		JANDA_DUDA: "Janda/Duda",
		MENIKAH_SEKANTOR: "Menikah Satu Kantor",
		TIDAK_TAHU: "Tidak Tahu",
	};
	return map[s] ?? s;
}

function labelStatus(s: string): string {
	const map: Record<string, string> = {
		KONTRAK: "Kontrak",
		CAPEG: "CPNS",
		PEGAWAI: "Pegawai Tetap",
		HONORER: "Honorer",
		CALON_HONORER: "Calon Honorer",
		NON_PEGAWAI: "Non-Pegawai",
	};
	return map[s] ?? s;
}

function labelStatusKerja(s: string): string {
	const map: Record<string, string> = {
		KARYAWAN_AKTIF: "Aktif",
		BERHENTI_OR_KELUAR: "Berhenti / Keluar",
		DIRUMAHKAN: "Dirumahkan",
	};
	return map[s] ?? s;
}

function formatPendidikan(p?: PendidikanDashboard): string | undefined {
	if (!p) return undefined;
	const parts = [p.tingkat, p.jurusan, p.institusi, p.tahunLulus ? String(p.tahunLulus) : undefined].filter(Boolean);
	return parts.length > 0 ? parts.join(" — ") : undefined;
}

function formatRp(n: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(n);
}
