"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FKCombobox } from "@/components/fk-combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFkOptions } from "@/hooks/useFkOptions";
import { api } from "@/lib/api/client";
import { type ProfesiFormValues, profesiDefaults, profesiSchema } from "./schema";

// — Props (compatible with EntityFormModal) —

interface ProfesiFormProps {
	editing: Record<string, unknown> | null;
	onCancel: () => void;
	error: string | null;
	setError: (e: string | null) => void;
	isSubmitting: boolean;
	submit: (data: Record<string, unknown>) => Promise<void>;
}

export function ProfesiForm({ editing, onCancel, error, setError, isSubmitting, submit }: ProfesiFormProps) {
	const orgOpts = useFkOptions("organisasi");

	const {
		register,
		handleSubmit: rhfSubmit,
		setValue,
		watch,
		formState: { errors: rhfErrors },
	} = useForm<ProfesiFormValues>({
		resolver: zodResolver(profesiSchema as never),
		defaultValues: profesiDefaults(editing),
	});

	const orgId = watch("organisasiId");

	// Cascade jabatan by organisasi — enabled hanya jika org terpilih
	const jabQuery = useQuery({
		queryKey: ["jabatan", "organisasi", orgId],
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(orgId)),
		enabled: !!orgId,
		staleTime: 300_000,
	});

	// Preserve existing jabatan label during edit (3c: data-loss dilarang)
	const preservedJabatan = editing?.jabatan
		? {
				value: String((editing.jabatan as Record<string, unknown>).id ?? ""),
				label: String((editing.jabatan as Record<string, unknown>).nama ?? ""),
			}
		: null;

	const jabOpts = ((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));
	if (preservedJabatan && !jabOpts.find((o) => o.value === preservedJabatan.value)) {
		jabOpts.unshift(preservedJabatan);
	}

	// Cascade grade by jabatan's levelId
	const gradeQuery = useQuery({
		queryKey: ["grade", "list"],
		queryFn: () => api.listAll<Record<string, unknown>>("grade"),
		staleTime: 300_000,
	});

	// Lookup jabatan id → full item (to extract levelId)
	const jabatanLookup: Record<string, Record<string, unknown>> = {};
	for (const item of (jabQuery.data ?? []) as Record<string, unknown>[]) {
		jabatanLookup[String(item.id)] = item;
	}
	if (editing?.jabatan) {
		const jab = editing.jabatan as Record<string, unknown>;
		if (jab.id && !jabatanLookup[String(jab.id)]) jabatanLookup[String(jab.id)] = jab;
	}

	const watchedJabatanId = watch("jabatanId");

	const selectedLevelId = (() => {
		if (!watchedJabatanId) return undefined;
		const item = jabatanLookup[String(watchedJabatanId)];
		if (!item) return undefined;
		const level = item.level as Record<string, unknown> | undefined;
		return level?.id ? Number(level.id) : undefined;
	})();

	const preservedGrade = (() => {
		if (!editing?.grade) return null;
		const g = editing.grade as Record<string, unknown>;
		return g.id ? { value: String(g.id), label: `Grade ${g.grade ?? ""}` } : null;
	})();

	const filteredGradeOpts = (() => {
		if (!selectedLevelId) return [];
		const grades = ((gradeQuery.data ?? []) as Record<string, unknown>[])
			.filter((item) => Number(item.levelId) === selectedLevelId)
			.map((item) => ({ value: String(item.id), label: `Grade ${item.grade}` }));
		if (preservedGrade && !grades.find((o) => o.value === preservedGrade.value)) {
			grades.unshift(preservedGrade);
		}
		return grades;
	})();

	const onFormSubmit = async (values: ProfesiFormValues) => {
		setError(null);
		try {
			const payload: Record<string, unknown> = {
				nama: values.nama,
				detail: values.detail,
				resiko: values.resiko,
				organisasiId: values.organisasiId || undefined,
				jabatanId: values.jabatanId || undefined,
				gradeId: values.gradeId || undefined,
			};
			await submit(payload);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	const fieldError = (name: keyof ProfesiFormValues) => {
		const e = rhfErrors[name];
		return e ? <p className="text-xs text-destructive">{String(e.message ?? "")}</p> : null;
	};

	return (
		<form onSubmit={rhfSubmit(onFormSubmit)} className="flex flex-col gap-0">
			<div className="flex-1 overflow-y-auto px-4 pb-4">
				<h3 className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
				<div className="space-y-3">
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							Nama <span className="text-destructive">*</span>
						</Label>
						<Input {...register("nama")} className="h-11" placeholder="Nama profesi" aria-invalid={!!rhfErrors.nama} />
						{fieldError("nama")}
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">Organisasi</Label>
						<FKCombobox
							id="organisasiId"
							options={orgOpts}
							value={watch("organisasiId")}
							placeholder="Pilih organisasi"
							invalid={!!rhfErrors.organisasiId}
							onChange={(v) => {
								setValue("organisasiId", Number(v) || undefined, { shouldValidate: true });
								// 3b: reset jabatan hanya on user-change (bukan on mount/edit load)
								setValue("jabatanId", undefined, { shouldValidate: true });
							}}
						/>
						{fieldError("organisasiId")}
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">Jabatan</Label>
						<FKCombobox
							id="jabatanId"
							options={jabOpts}
							value={watch("jabatanId")}
							placeholder="Pilih jabatan"
							disabled={!orgId}
							loading={jabQuery.isFetching}
							emptyText={orgId ? "Tidak ada jabatan" : "Pilih organisasi dulu"}
							invalid={!!rhfErrors.jabatanId}
							onChange={(v) => {
								setValue("jabatanId", Number(v) || undefined, { shouldValidate: true });
								// Reset grade saat jabatan berubah
								setValue("gradeId", undefined, { shouldValidate: true });
							}}
						/>
						{fieldError("jabatanId")}
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">Grade</Label>
						<FKCombobox
							id="gradeId"
							options={filteredGradeOpts}
							value={watch("gradeId")}
							placeholder="Pilih grade"
							disabled={!selectedLevelId}
							loading={gradeQuery.isFetching && !gradeQuery.data}
							emptyText={selectedLevelId ? "Tidak ada grade" : "Pilih jabatan dulu"}
							invalid={!!rhfErrors.gradeId}
							onChange={(v) => setValue("gradeId", Number(v) || undefined, { shouldValidate: true })}
						/>
						{fieldError("gradeId")}
					</div>
				</div>

				<h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detail</h3>
				<div className="space-y-3">
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							Detail <span className="text-destructive">*</span>
						</Label>
						<Textarea
							{...register("detail")}
							className="min-h-24"
							placeholder="Detail profesi"
							aria-invalid={!!rhfErrors.detail}
						/>
						{fieldError("detail")}
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							Resiko <span className="text-destructive">*</span>
						</Label>
						<Textarea
							{...register("resiko")}
							className="min-h-24"
							placeholder="Resiko profesi"
							aria-invalid={!!rhfErrors.resiko}
						/>
						{fieldError("resiko")}
					</div>
				</div>

				{error && <p className="mt-3 text-sm text-destructive">{error}</p>}
			</div>

			<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
				<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
					Batal
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
					{isSubmitting ? "Menyimpan\u2026" : "Simpan"}
				</Button>
			</div>
		</form>
	);
}
