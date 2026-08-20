"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CrudForm } from "@/components/crud-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { biodataFormSchema, editFormFields } from "@/config/profil/biodata.config";
import { dashboardKeys } from "@/hooks/keys/dashboard-keys";
import { ACCORDION_TRIGGER_AFF } from "@/hooks/useDashboardSections";
import { useSelfBiodataMutation } from "@/hooks/useSelfBiodataMutation";
import {
	formatPendidikan,
	labelAgama,
	labelJk,
	labelKawin,
	labelStatus,
	labelStatusKerja,
	statusKerjaColor,
	valueFromLabel,
} from "@/lib/enum-labels";
import { ENUMS } from "@/lib/enums";
import { cn, formatDate, rupiah } from "@/lib/utils";
import type { BiodataPatchRequest } from "@/types/admin/profil";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import type { BiodataDashboardResponse } from "@/types/profil/biodata";

export function SectionLeftPanel({ pegawai, nik }: { pegawai: PegawaiResponseDetail; nik: string | null }) {
	const [openValues, setOpenValues] = useState<string[]>(["data-pribadi"]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const biodataMutation = useSelfBiodataMutation();

	const handleEditSubmit = async (data: Record<string, unknown>) => {
		setFormError(null);
		try {
			const payload: Record<string, unknown> = {};
			for (const [key, v] of Object.entries(data)) {
				if (key === "nik") continue;
				if (v === "" || v === undefined) continue;
				payload[key] = v;
			}
			await biodataMutation.mutateAsync(payload as BiodataPatchRequest);
			setDialogOpen(false);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			setFormError(msg);
		}
	};

	const biodata = useQuery({
		queryKey: dashboardKeys.biodata(nik),
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
		<div className="rounded-2xl border border-border/60 bg-muted/20 p-1.5 shadow-xs">
			<div className="rounded-[calc(1rem-0.25rem)] border border-border/40 bg-card shadow-2xs overflow-hidden">
				{/* Header identitas — always visible */}
				<div className="flex items-center gap-4 px-5 py-4 border-b border-border/60 bg-muted/10">
					<div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary ring-2 ring-primary/20">
						{fotoProfil ? (
							<Image src={fotoProfil} alt="" width={56} height={56} className="size-full object-cover" unoptimized />
						) : (
							<span className="text-lg font-semibold">{nama.charAt(0)}</span>
						)}
					</div>
					<div className="min-w-0">
						<h3 className="text-sm font-bold text-foreground truncate">{nama}</h3>
						<p className="text-xs text-muted-foreground tabular-nums font-mono">{nipam}</p>
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
									{nik && !d.changedStatus && (
										<div className="flex items-center justify-end mb-2">
											<button
												type="button"
												onClick={() => setDialogOpen(true)}
												className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary hover:bg-primary/20 transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
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
								<Field label="Gaji Pokok" value={pegawai.gajiPokok != null ? rupiah(pegawai.gajiPokok) : undefined} />
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

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
				<DialogContent className="flex flex-col max-h-[85dvh] sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl border border-border/60">
					<DialogHeader className="shrink-0 px-4 pt-4 pb-2 shadow">
						<DialogTitle>Edit Profil</DialogTitle>
					</DialogHeader>
					<div className="py-2 flex-1 overflow-y-auto px-4 pb-0 [&>form]:flex [&>form]:flex-1 [&>form]:flex-col [&>form>div:last-of-type]:mt-auto [&>form>div:last-of-type]:sticky [&>form>div:last-of-type]:bottom-0 [&>form>div:last-of-type]:bg-popover [&>form>div:last-of-type]:pt-4 [&>form>div:last-of-type]:pb-4 [&>form>div:last-of-type]:border-t [&>form>div:last-of-type]:border-border [&>form>div:last-of-type]:-mx-4 [&>form>div:last-of-type]:px-4">
						<CrudForm
							schema={biodataFormSchema as never}
							fields={editFormFields}
							defaultValues={
								d
									? ({
											nik: d.nik ?? "",
											nama: d.nama ?? "",
											jenisKelamin: valueFromLabel(d.jenisKelamin, ENUMS.jenisKelamin),
											tempatLahir: d.tempatLahir ?? "",
											tanggalLahir: d.tanggalLahir ?? "",
											agama: valueFromLabel(d.agama, ENUMS.agama),
											statusKawin: valueFromLabel(d.statusKawin, ENUMS.statusKawin),
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
			<p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">{label}</p>
			<p className={cn("text-sm tabular-nums font-medium", badgeClass)}>{value ?? "-"}</p>
		</div>
	);
}
