"use client";

import { AlertTriangle, FileX2, Pencil, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
	return (
		<div className="flex justify-between gap-2 py-1.5 text-sm">
			<span className="text-muted-foreground shrink-0">{label}</span>
			<span className="text-foreground text-right font-medium">{value ?? "-"}</span>
		</div>
	);
}

function SectionSkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="h-5 w-1/2" />
			{Array.from({ length: 4 }, (_, i) => i).map((i) => (
				<Skeleton key={i} className="h-4 w-full" />
			))}
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
			<div className="space-y-6 p-4">
				{showActions && (
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={onEditProfil}>
							<Pencil className="mr-1.5 size-3.5" />
							Edit Profil
						</Button>
						<Button variant="outline" size="sm" onClick={onEditGaji}>
							<Wallet className="mr-1.5 size-3.5" />
							Edit Gaji
						</Button>
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
		<div className="space-y-6">
			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={onEditProfil}>
					<Pencil className="mr-1.5 size-3.5" />
					Edit Profil
				</Button>
				<Button variant="outline" size="sm" onClick={onEditGaji}>
					<Wallet className="mr-1.5 size-3.5" />
					Edit Gaji
				</Button>
			</div>
			{/* Informasi Umum */}
			<section>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Informasi Umum</h3>
				<div className="divide-y divide-border">
					<Field label="NIPAM" value={data.nipam} />
					<Field label="Nama" value={data.nama} />
					<Field label="Jenis Kelamin" value={data.jenisKelamin} />
					<Field label="Tempat Lahir" value={data.tempatLahir} />
					<Field label="Tanggal Lahir" value={data.tanggalLahir} />
					<Field label="Status Kawin" value={data.statusKawin} />
					<Field label="NIK" value={data.nik} />
					<Field label="Agama" value={data.agama} />
					<Field label="Alamat" value={data.alamat} />
					<Field label="Telp" value={data.telp} />
					<Field label="Email" value={data.email} />
					<Field label="Ibu Kandung" value={data.ibuKandung} />
					<Field label="Kode Pajak" value={data.kodePajak} />
				</div>
			</section>

			{/* Informasi Akademik */}
			<section>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
					Informasi Akademik
				</h3>
				<div className="divide-y divide-border">
					<Field label="Pendidikan Terakhir" value={data.pendidikanTerakhir} />
					<Field label="Lembaga Pendidikan" value={data.lembagaPendidikan} />
					<Field label="Tahun Lulus" value={data.tahunLulus} />
				</div>
			</section>

			{/* Informasi Kepegawaian */}
			<section>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
					Informasi Kepegawaian
				</h3>
				<div className="divide-y divide-border">
					<Field label="Status Pegawai" value={data.statusPegawai} />
					<Field label="Pangkat/Golongan" value={data.pangkatGolongan} />
					<Field label="TMT Golongan" value={data.tmtGolongan} />
					<Field label="MKG" value={data.mkg} />
					<Field label="Unit Kerja" value={data.unitKerja} />
					<Field label="Jabatan" value={data.jabatan} />
					<Field label="Profesi" value={data.profesi} />
					<Field label="Grade" value={data.grade} />
					<Field label="TMT Kerja" value={data.tmtKerja} />
					<Field label="TMT Pegawai" value={data.tmtPegawai} />
					<Field label="TMT Pensiun" value={data.tmtPensiun} />
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
