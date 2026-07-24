"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FKCombobox } from "@/components/fk-combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api/client";

// ── Enum options (hand-authored dari _shared.ts) ──

const ENUMS = {
	jenisKelamin: [
		{ value: "LAKI_LAKI", label: "Laki-laki" },
		{ value: "PEREMPUAN", label: "Perempuan" },
	],
	agama: [
		{ value: "ISLAM", label: "Islam" },
		{ value: "KRISTEN", label: "Kristen" },
		{ value: "KATOLIK", label: "Katolik" },
		{ value: "HINDU", label: "Hindu" },
		{ value: "BUDHA", label: "Budha" },
		{ value: "KONGHUCHU", label: "Konghuchu" },
		{ value: "ALIRAN_KEPERCAYAAN", label: "Aliran Kepercayaan" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
		{ value: "LAINNYA", label: "Lainnya" },
	],
	statusKawin: [
		{ value: "BELUM_KAWIN", label: "Belum Kawin" },
		{ value: "KAWIN", label: "Kawin" },
		{ value: "JANDA_DUDA", label: "Janda/Duda" },
		{ value: "MENIKAH_SEKANTOR", label: "Menikah Sekantor" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
	],
	golonganDarah: [
		{ value: "A", label: "A" },
		{ value: "B", label: "B" },
		{ value: "AB", label: "AB" },
		{ value: "O", label: "O" },
	],
	statusPegawai: [
		{ value: "KONTRAK", label: "Kontrak" },
		{ value: "CAPEG", label: "CPNS" },
		{ value: "PEGAWAI", label: "PNS" },
		{ value: "CALON_HONORER", label: "Calon Honorer" },
		{ value: "HONORER", label: "Honorer" },
		{ value: "NON_PEGAWAI", label: "Non Pegawai" },
	],
	statusKerja: [
		{ value: "KARYAWAN_AKTIF", label: "Karyawan Aktif" },
		{ value: "BERHENTI_OR_KELUAR", label: "Berhenti/Keluar" },
		{ value: "DIRUMAHKAN", label: "Dirumahkan" },
		{ value: "LAMARAN_BARU", label: "Lamaran Baru" },
		{ value: "TAHAP_SELEKSI", label: "Tahap Seleksi" },
		{ value: "DITERIMA", label: "Diterima" },
		{ value: "DIREKOMENDASIKAN", label: "Direkomendasikan" },
		{ value: "DITOLAK", label: "Ditolak" },
	],
} as const;

// ── FK helpers ──

function useFkOptions(entity: string, labelFn?: (i: Record<string, unknown>) => string) {
	const query = useQuery({
		queryKey: [entity, "list"],
		queryFn: () => api.listAll<Record<string, unknown>>(entity),
		staleTime: 300_000,
	});
	return useMemo(
		() =>
			((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: labelFn?.(i) ?? String(i.nama ?? ""),
			})),
		[query.data, labelFn],
	);
}

function usePajakOptions() {
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
	return useMemo(
		() =>
			((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: `${String(i.kode ?? "")} - ${String(i.nama ?? "")}`,
			})),
		[query.data],
	);
}

// ── Zod schema ──

const schema = z
	.object({
		nik: z.string().min(1, "NIK wajib diisi"),
		nama: z.string().min(1, "Nama wajib diisi"),
		jenisKelamin: z.string().min(1, "Pilih jenis kelamin"),
		tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),
		tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
		alamat: z.string().min(1, "Alamat wajib diisi"),
		agama: z.string().min(1, "Pilih agama"),
		ibuKandung: z.string().min(1, "Ibu kandung wajib diisi"),
		nipam: z.string().min(1, "NIPAM wajib diisi"),
		telp: z.string().optional(),
		pendidikanTerakhirId: z.string().optional(),
		golonganDarah: z.string().optional(),
		statusKawin: z.string().optional(),
		email: z.string().optional(),
		notes: z.string().optional(),
		isPegawai: z.boolean().optional(),
		statusPegawai: z.string().optional(),
		statusKerja: z.string().optional(),
		jabatanId: z.string().optional(),
		organisasiId: z.string().optional(),
		profesiId: z.string().optional(),
		golonganId: z.string().optional(),
		kodePajakId: z.string().optional(),
		nomorSk: z.string().optional(),
		tanggalSk: z.string().optional(),
		tmtBerlakuSk: z.string().optional(),
		tmtKontrakSelesai: z.string().optional(),
		gajiPokok: z.string().optional(),
	})
	.superRefine((vals, ctx) => {
		if (!vals.statusPegawai || vals.statusPegawai === "NON_PEGAWAI") return;
		// Berkepegawaian → 3 FK wajib
		if (!vals.jabatanId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Jabatan wajib diisi", path: ["jabatanId"] });
		if (!vals.organisasiId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Organisasi wajib diisi", path: ["organisasiId"] });
		if (!vals.kodePajakId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Kode pajak wajib diisi", path: ["kodePajakId"] });
	});

type FormValues = z.infer<typeof schema>;

// ── Shared field renderers ──

function FieldSelect({
	label,
	value,
	options,
	onChange,
	error,
	required,
}: {
	label: string;
	value: string | undefined;
	options: readonly { value: string; label: string }[];
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Select value={value ?? ""} onValueChange={(v) => onChange(v ?? "")}>
				<SelectTrigger className="h-11 w-full" aria-invalid={!!error}>
					<SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
				</SelectTrigger>
				<SelectContent>
					{options.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

function FieldText({
	label,
	value,
	onChange,
	error,
	required,
	placeholder,
	type,
}: {
	label: string;
	value: string | undefined;
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
	placeholder?: string;
	type?: string;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Input
				type={type ?? "text"}
				className="h-11"
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

function FieldTextarea({
	label,
	value,
	onChange,
	error,
	required,
}: {
	label: string;
	value: string | undefined;
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Textarea
				className="min-h-24"
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value)}
				aria-invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

function FieldFk({
	label,
	options,
	value,
	onChange,
	error,
	required,
	disabled,
	loading,
	placeholder,
}: {
	label: string;
	options: { value: string; label: string }[];
	value: string | undefined;
	onChange: (v: string | undefined) => void;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	loading?: boolean;
	placeholder?: string;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<FKCombobox
				options={options}
				value={value}
				onChange={onChange}
				placeholder={placeholder ?? `Pilih ${label.toLowerCase()}`}
				disabled={disabled}
				loading={loading}
				invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

// ── Main form ──

export function TambahPegawaiForm() {
	const router = useRouter();
	const qc = useQueryClient();

	const {
		handleSubmit: rhfSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(schema as never),
		defaultValues: { isPegawai: true },
	});

	const statusPegawai = watch("statusPegawai");
	const organisasiId = watch("organisasiId");
	const isNonPegawai = statusPegawai === "NON_PEGAWAI";

	// FK options
	const orgOpts = useFkOptions("organisasi");
	const profesiOpts = useFkOptions("profesi");
	const golonganOpts = useFkOptions("golongan");
	const pendidikanOpts = useFkOptions("jenjang-pendidikan");
	const pajakOpts = usePajakOptions();

	// Cascade jabatan by organisasi
	const jabQuery = useQuery({
		queryKey: ["jabatan", "organisasi", organisasiId],
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = useMemo(
		() =>
			((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: String(i.nama ?? ""),
			})),
		[jabQuery.data],
	);

	// Reset jabatan when organisasi changes
	const onOrgChange = (v: string | undefined) => {
		setValue("organisasiId", v, { shouldValidate: true });
		setValue("jabatanId", undefined, { shouldValidate: true });
	};

	const onSubmit = async (values: FormValues) => {
		try {
			const payload: Record<string, unknown> = {
				nik: values.nik,
				nama: values.nama,
				jenisKelamin: values.jenisKelamin,
				tempatLahir: values.tempatLahir,
				tanggalLahir: values.tanggalLahir,
				alamat: values.alamat,
				agama: values.agama,
				ibuKandung: values.ibuKandung,
				nipam: values.nipam,
				telp: values.telp || undefined,
				pendidikanTerakhirId: values.pendidikanTerakhirId ? Number(values.pendidikanTerakhirId) : undefined,
				golonganDarah: values.golonganDarah || undefined,
				statusKawin: values.statusKawin || undefined,
				email: values.email || undefined,
				notes: values.notes || undefined,
				isPegawai: !isNonPegawai,
				statusPegawai: values.statusPegawai || undefined,
				statusKerja: values.statusKerja || undefined,
				jabatanId: values.jabatanId ? Number(values.jabatanId) : undefined,
				organisasiId: values.organisasiId ? Number(values.organisasiId) : undefined,
				profesiId: values.profesiId ? Number(values.profesiId) : undefined,
				golonganId: values.golonganId ? Number(values.golonganId) : undefined,
				kodePajakId: values.kodePajakId ? Number(values.kodePajakId) : undefined,
				nomorSk: values.nomorSk || undefined,
				tanggalSk: values.tanggalSk || undefined,
				tmtBerlakuSk: values.tmtBerlakuSk || undefined,
				tmtKontrakSelesai: values.tmtKontrakSelesai || undefined,
				gajiPokok: values.gajiPokok ? Number(values.gajiPokok) : undefined,
			};

			const res = await fetch("/api/proxy/pegawai", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Gagal menyimpan data");
			}
			toast.success("Data pegawai berhasil disimpan");
			qc.invalidateQueries({ queryKey: ["/api/proxy/pegawai"] });
			router.push("/kepegawaian/data");
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			setError("root", { message: msg });
		}
	};

	const e = (name: keyof FormValues) => {
		const err = errors[name];
		return err ? String(err.message ?? "") : undefined;
	};

	return (
		<form onSubmit={rhfSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6 py-6">
			{/* Seksi Biodata */}
			<div className="rounded-lg border bg-card p-6 space-y-4">
				<h2 className="text-base font-semibold text-foreground">Biodata</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FieldText label="NIK" value={watch("nik")} onChange={(v) => setValue("nik", v)} error={e("nik")} required />
					<FieldText
						label="Nama"
						value={watch("nama")}
						onChange={(v) => setValue("nama", v)}
						error={e("nama")}
						required
					/>
					<FieldSelect
						label="Jenis Kelamin"
						value={watch("jenisKelamin")}
						options={ENUMS.jenisKelamin}
						onChange={(v) => setValue("jenisKelamin", v)}
						error={e("jenisKelamin")}
						required
					/>
					<FieldText
						label="Tempat Lahir"
						value={watch("tempatLahir")}
						onChange={(v) => setValue("tempatLahir", v)}
						error={e("tempatLahir")}
						required
					/>
					<FieldText
						label="Tanggal Lahir"
						type="date"
						value={watch("tanggalLahir")}
						onChange={(v) => setValue("tanggalLahir", v)}
						error={e("tanggalLahir")}
						required
					/>
					<FieldText
						label="NIPAM"
						value={watch("nipam")}
						onChange={(v) => setValue("nipam", v)}
						error={e("nipam")}
						required
					/>
					<FieldSelect
						label="Agama"
						value={watch("agama")}
						options={ENUMS.agama}
						onChange={(v) => setValue("agama", v)}
						error={e("agama")}
						required
					/>
					<FieldText
						label="Ibu Kandung"
						value={watch("ibuKandung")}
						onChange={(v) => setValue("ibuKandung", v)}
						error={e("ibuKandung")}
						required
					/>
					<FieldText label="Telp" value={watch("telp")} onChange={(v) => setValue("telp", v)} error={e("telp")} />
					<FieldText
						label="Email"
						type="email"
						value={watch("email")}
						onChange={(v) => setValue("email", v)}
						error={e("email")}
					/>
					<FieldFk
						label="Pendidikan Terakhir"
						options={pendidikanOpts}
						value={watch("pendidikanTerakhirId")}
						onChange={(v) => setValue("pendidikanTerakhirId", v)}
						error={e("pendidikanTerakhirId")}
					/>
					<FieldSelect
						label="Golongan Darah"
						value={watch("golonganDarah")}
						options={ENUMS.golonganDarah}
						onChange={(v) => setValue("golonganDarah", v)}
						error={e("golonganDarah")}
					/>
				</div>
				<FieldSelect
					label="Status Kawin"
					value={watch("statusKawin")}
					options={ENUMS.statusKawin}
					onChange={(v) => setValue("statusKawin", v)}
					error={e("statusKawin")}
				/>
				<FieldTextarea
					label="Alamat"
					value={watch("alamat")}
					onChange={(v) => setValue("alamat", v)}
					error={e("alamat")}
					required
				/>
				<FieldTextarea label="Notes" value={watch("notes")} onChange={(v) => setValue("notes", v)} error={e("notes")} />
			</div>

			{/* Seksi Kepegawaian */}
			<div className="rounded-lg border bg-card p-6 space-y-4">
				<h2 className="text-base font-semibold text-foreground">Data Kepegawaian</h2>
				<FieldSelect
					label="Status Pegawai"
					value={watch("statusPegawai")}
					options={ENUMS.statusPegawai}
					onChange={(v) => setValue("statusPegawai", v, { shouldValidate: true })}
					error={e("statusPegawai")}
				/>

				{!isNonPegawai && (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FieldFk
								label="Organisasi"
								options={orgOpts}
								value={watch("organisasiId")}
								onChange={onOrgChange}
								error={e("organisasiId")}
								required
								placeholder="Pilih organisasi"
							/>
							<FieldFk
								label="Jabatan"
								options={jabOpts}
								value={watch("jabatanId")}
								onChange={(v) => setValue("jabatanId", v, { shouldValidate: true })}
								error={e("jabatanId")}
								required
								disabled={!organisasiId}
								loading={jabQuery.isFetching}
								placeholder={organisasiId ? "Pilih jabatan" : "Pilih organisasi dulu"}
							/>
							<FieldFk
								label="Profesi"
								options={profesiOpts}
								value={watch("profesiId")}
								onChange={(v) => setValue("profesiId", v)}
								error={e("profesiId")}
							/>
							<FieldFk
								label="Golongan"
								options={golonganOpts}
								value={watch("golonganId")}
								onChange={(v) => setValue("golonganId", v)}
								error={e("golonganId")}
							/>
						</div>
						<FieldFk
							label="Kode Pajak"
							options={pajakOpts}
							value={watch("kodePajakId")}
							onChange={(v) => setValue("kodePajakId", v, { shouldValidate: true })}
							error={e("kodePajakId")}
							required
						/>
						<FieldSelect
							label="Status Kerja"
							value={watch("statusKerja")}
							options={ENUMS.statusKerja}
							onChange={(v) => setValue("statusKerja", v)}
							error={e("statusKerja")}
						/>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FieldText
								label="Nomor SK"
								value={watch("nomorSk")}
								onChange={(v) => setValue("nomorSk", v)}
								error={e("nomorSk")}
							/>
							<FieldText
								label="Tanggal SK"
								type="date"
								value={watch("tanggalSk")}
								onChange={(v) => setValue("tanggalSk", v)}
								error={e("tanggalSk")}
							/>
							<FieldText
								label="TMT Berlaku SK"
								type="date"
								value={watch("tmtBerlakuSk")}
								onChange={(v) => setValue("tmtBerlakuSk", v)}
								error={e("tmtBerlakuSk")}
							/>
							<FieldText
								label="TMT Kontrak Selesai"
								type="date"
								value={watch("tmtKontrakSelesai")}
								onChange={(v) => setValue("tmtKontrakSelesai", v)}
								error={e("tmtKontrakSelesai")}
							/>
						</div>
						<FieldText
							label="Gaji Pokok"
							type="number"
							value={watch("gajiPokok")}
							onChange={(v) => setValue("gajiPokok", v)}
							error={e("gajiPokok")}
							placeholder="0"
						/>
					</>
				)}
			</div>

			{errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}

			<div className="flex items-center justify-end gap-2">
				<Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
					Batal
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
					{isSubmitting ? "Menyimpan…" : "Simpan"}
				</Button>
			</div>
		</form>
	);
}
