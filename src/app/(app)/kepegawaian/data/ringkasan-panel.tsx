"use client";

import { AlertTriangle, FileX2, FolderOpen, History, Pencil, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { labelAgama, labelJk, labelKawin, labelStatus } from "@/lib/enum-labels";
import { formatDate } from "@/lib/utils";
import type { PegawaiResponseRingkasan } from "@/types/pegawai/pegawai";

interface Props {
	selectedId: string | number | null;
	isPending: boolean;
	isError: boolean;
	error: Error | null;
	data: PegawaiResponseRingkasan | undefined;
	onRetry: () => void;
	onEditProfil: () => void;
	onEditGaji: () => void;
	onRiwayat: () => void;
	onPendukung: () => void;
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
	return (
		<div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-3 py-1.5 px-2 text-sm odd:bg-muted/40 rounded-sm">
			<span className="text-muted-foreground truncate">{label}</span>
			<span className="text-foreground font-medium text-right break-words">{value ?? "-"}</span>
		</div>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center gap-2 mb-2">
			<span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
				{children}
			</span>
			<div className="flex-1 h-px bg-border" />
		</div>
	);
}

function SectionSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-28 rounded-full" />
			{[3, 4, 5, 3, 4].map((w, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton baris
				<div
					key={i}
					className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-3 py-1.5 px-2 odd:bg-muted/40 rounded-sm"
				>
					<Skeleton className={`h-3.5 w-${w}/6`} />
					<Skeleton className="h-3.5 w-4/5 ml-auto" />
				</div>
			))}
		</div>
	);
}

/** Tombol aksi — 2×2 grid agar tidak terpotong di panel sempit */
function ActionButtons({
	onEditProfil,
	onEditGaji,
	onRiwayat,
	onPendukung,
}: Pick<Props, "onEditProfil" | "onEditGaji" | "onRiwayat" | "onPendukung">) {
	return (
		<div className="grid grid-cols-2 gap-2">
			<Button variant="outline" size="sm" onClick={onEditProfil} className="justify-start gap-1.5">
				<Pencil className="size-3.5 shrink-0" />
				Edit Profil
			</Button>
			<Button variant="outline" size="sm" onClick={onEditGaji} className="justify-start gap-1.5">
				<Wallet className="size-3.5 shrink-0" />
				Edit Gaji
			</Button>
			<Button variant="outline" size="sm" onClick={onRiwayat} className="justify-start gap-1.5">
				<History className="size-3.5 shrink-0" />
				Riwayat
			</Button>
			<Button variant="outline" size="sm" onClick={onPendukung} className="justify-start gap-1.5">
				<FolderOpen className="size-3.5 shrink-0" />
				Data Pendukung
			</Button>
		</div>
	);
}

export function RingkasanPanel({
	selectedId,
	isPending,
	isError,
	error,
	data,
	onRetry,
	onEditProfil,
	onEditGaji,
	onRiwayat,
	onPendukung,
}: Props) {
	const showActions = !!selectedId && !isError;

	if (!selectedId) {
		return (
			<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
				<FileX2 className="size-12 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">Pilih pegawai untuk melihat ringkasan</p>
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="space-y-5">
				{showActions && (
					<div className="grid grid-cols-2 gap-2">
						{[...Array(4)].map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: skeleton tombol
							<Skeleton key={i} className="h-7 w-full rounded-lg" />
						))}
					</div>
				)}
				<SectionSkeleton />
				<SectionSkeleton />
				<SectionSkeleton />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
				<div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
					<AlertTriangle className="size-6 text-destructive" />
				</div>
				<p className="text-sm font-medium text-foreground">Gagal memuat ringkasan</p>
				{error?.message && <p className="text-sm text-muted-foreground">{error.message}</p>}
				<Button variant="outline" size="sm" onClick={onRetry}>
					<RefreshCw className="mr-1.5 size-3.5" />
					Coba lagi
				</Button>
			</div>
		);
	}

	if (!data) return null;

	return (
		<div className="space-y-5">
			<ActionButtons
				onEditProfil={onEditProfil}
				onEditGaji={onEditGaji}
				onRiwayat={onRiwayat}
				onPendukung={onPendukung}
			/>

			{/* Informasi Umum */}
			<section>
				<SectionLabel>Informasi Umum</SectionLabel>
				<div className="space-y-0.5">
					<Field label="NIPAM" value={data.nipam} />
					<Field label="Nama" value={data.nama} />
					<Field label="Jenis Kelamin" value={labelJk(data.jenisKelamin)} />
					<Field label="Tempat Lahir" value={data.tempatLahir} />
					<Field label="Tanggal Lahir" value={formatDate(data.tanggalLahir)} />
					<Field label="Status Kawin" value={labelKawin(data.statusKawin)} />
					<Field label="NIK" value={data.nik} />
					<Field label="Agama" value={labelAgama(data.agama)} />
					<Field label="Alamat" value={data.alamat} />
					<Field label="Telp" value={data.telp} />
					<Field label="Email" value={data.email} />
					<Field label="Ibu Kandung" value={data.ibuKandung} />
					<Field label="Kode Pajak" value={data.kodePajak} />
				</div>
			</section>

			{/* Informasi Akademik */}
			<section>
				<SectionLabel>Informasi Akademik</SectionLabel>
				<div className="space-y-0.5">
					<Field label="Pendidikan Terakhir" value={data.pendidikanTerakhir} />
					<Field label="Lembaga Pendidikan" value={data.lembagaPendidikan} />
					<Field label="Tahun Lulus" value={data.tahunLulus} />
				</div>
			</section>

			{/* Informasi Kepegawaian */}
			<section>
				<SectionLabel>Informasi Kepegawaian</SectionLabel>
				<div className="space-y-0.5">
					<Field label="Status Pegawai" value={labelStatus(data.statusPegawai)} />
					<Field label="Pangkat/Golongan" value={data.pangkatGolongan} />
					<Field label="TMT Golongan" value={formatDate(data.tmtGolongan)} />
					<Field label="MKG" value={data.mkg} />
					<Field label="Unit Kerja" value={data.unitKerja} />
					<Field label="Jabatan" value={data.jabatan} />
					<Field label="Profesi" value={data.profesi} />
					<Field label="Grade" value={data.grade} />
					<Field label="TMT Kerja" value={formatDate(data.tmtKerja)} />
					<Field label="TMT Pegawai" value={formatDate(data.tmtPegawai)} />
					<Field label="TMT Pensiun" value={formatDate(data.tmtPensiun)} />
					<Field label="No. Kontrak" value={data.noKontrak} />
					<Field label="NPWP" value={data.noNpwp} />
					<Field label="No. Jamsostek" value={data.noJamsostek} />
					<Field label="No. BPJS" value={data.noBpjs} />
					<Field label="No. ID Card" value={data.noIdCard} />
					<Field label="Absensi ID" value={data.absensiId} />
					<Field label="Askes" value={data.isAskes === true ? "Ya" : data.isAskes === false ? "Tidak" : null} />
				</div>
			</section>
		</div>
	);
}
