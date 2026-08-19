"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldDate, FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { useFkOptions } from "@/hooks/useFkOptions";
import { usePajakOptions, useStatusKerjaOptions, useStatusPegawaiOptions } from "@/hooks/usePegawaiMasterOptions";
import { api } from "@/lib/api/client";
import { ENUMS } from "@/lib/enums";
import { apiErrorMessage } from "@/lib/utils";
import { type FormValues, schema } from "./schema";

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
		defaultValues: { isPegawai: true, statusKerja: "KARYAWAN_AKTIF" },
	});

	const statusPegawai = watch("statusPegawai");
	const organisasiId = watch("organisasiId");
	const isNonPegawai = statusPegawai === "NON_PEGAWAI";

	// FK options
	const orgOpts = useFkOptions("organisasi");
	const profesiOpts = useFkOptions("profesi");
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
	const pendidikanOpts = useFkOptions("jenjang-pendidikan");
	const pajakOpts = usePajakOptions();
	const statusPegawaiOpts = useStatusPegawaiOptions();
	const statusKerjaOpts = useStatusKerjaOptions();

	// Cascade jabatan by organisasi
	const jabQuery = useQuery({
		queryKey: ["jabatan", "organisasi", organisasiId],
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = ((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));

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
				statusKerja: !isNonPegawai ? values.statusKerja || undefined : undefined,
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
				throw new Error(apiErrorMessage(body, "Gagal menyimpan data"));
			}
			toast.success("Data pegawai berhasil disimpan");
			qc.invalidateQueries({ queryKey: ["/api/proxy/pegawai"] });
			router.push("/kepegawaian/data");
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	const e = (name: keyof FormValues) => {
		const err = errors[name];
		return err ? String(err.message ?? "") : undefined;
	};

	return (
		<form onSubmit={rhfSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6 py-6">
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
					<FieldDate
						label="Tanggal Lahir"
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

			<div className="rounded-lg border bg-card p-6 space-y-4">
				<h2 className="text-base font-semibold text-foreground">Data Kepegawaian</h2>
				<FieldSelect
					label="Status Pegawai"
					value={watch("statusPegawai")}
					options={statusPegawaiOpts}
					onChange={(v) => setValue("statusPegawai", v, { shouldValidate: true })}
					error={e("statusPegawai")}
					required
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
							options={statusKerjaOpts}
							onChange={(v) => setValue("statusKerja", v)}
							error={e("statusKerja")}
							required
						/>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FieldText
								label="Nomor SK"
								value={watch("nomorSk")}
								onChange={(v) => setValue("nomorSk", v)}
								error={e("nomorSk")}
							/>
							<FieldDate
								label="Tanggal SK"
								value={watch("tanggalSk")}
								onChange={(v) => setValue("tanggalSk", v)}
								error={e("tanggalSk")}
							/>
							<FieldDate
								label="TMT Berlaku SK"
								value={watch("tmtBerlakuSk")}
								onChange={(v) => setValue("tmtBerlakuSk", v)}
								error={e("tmtBerlakuSk")}
							/>
							<FieldDate
								label="TMT Kontrak Selesai"
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
