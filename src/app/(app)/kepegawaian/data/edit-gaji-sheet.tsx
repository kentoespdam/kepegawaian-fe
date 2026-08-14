"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldSelect, FieldText } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { usePajakOptions, useStatusPegawaiOptions } from "@/hooks/usePegawaiMasterOptions";
import { apiErrorMessage } from "@/lib/utils";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";

const schema = z.object({
	statusPegawai: z.string().min(1, "Pilih status"),
	kodePajakId: z.string().min(1, "Pilih kode pajak"),
	gajiProfilId: z.string().min(1, "Pilih profil gaji"),
	tmtKerja: z.string().optional(),
	tmtPensiun: z.string().optional(),
	gajiPokok: z.string().optional(),
	phdp: z.string().optional(),
	isAskes: z.string().optional(),
	rumahDinasId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function toDefaults(d: PegawaiResponseDetail): Record<string, unknown> {
	return {
		statusPegawai: d.statusPegawai ?? "",
		kodePajakId: String(d.kodePajak?.id ?? "") || undefined,
		gajiProfilId: String(d.gajiProfil?.id ?? "") || undefined,
		tmtKerja: d.tmtKerja ?? "",
		tmtPensiun: d.tmtPensiun ?? "",
		gajiPokok: d.gajiPokok ? String(d.gajiPokok) : "",
		phdp: d.phdp ? String(d.phdp) : "",
		isAskes: d.isAskes ? "true" : d.isAskes === false ? "false" : "",
		rumahDinasId: String(d.rumahDinas?.id ?? "") || undefined,
	};
}

function useGajiProfilOptions() {
	const query = useQuery({
		queryKey: ["gaji-profil", "list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/penggajian/profil/list");
			if (!res.ok) throw new Error("Gagal memuat profil gaji");
			const body = await res.json();
			return body.data as Record<string, unknown>[];
		},
		staleTime: 300_000,
	});
	return useMemo(
		() =>
			((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: String(i.nama ?? ""),
			})),
		[query.data],
	);
}

interface Props {
	pegawaiId: string | null;
	onClose: () => void;
}

export function SheetEditGaji({ pegawaiId, onClose }: Props) {
	const qc = useQueryClient();
	const open = !!pegawaiId;

	const detailQuery = useQuery({
		queryKey: ["pegawai", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}`);
			if (!res.ok) throw new Error("Gagal memuat detail pegawai");
			const body = await res.json();
			return body.data as PegawaiResponseDetail;
		},
		enabled: open,
		staleTime: 60_000,
	});

	const defaults = useMemo(() => (detailQuery.data ? toDefaults(detailQuery.data) : undefined), [detailQuery.data]);

	const {
		handleSubmit: rhfSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(schema as never),
		values: defaults as FormValues | undefined,
	});

	const pajakOpts = usePajakOptions();
	const statusPegawaiOpts = useStatusPegawaiOptions();
	const rumahDinasOpts = useFkOptions("rumah-dinas");
	const gajiProfilOpts = useGajiProfilOptions();

	const onSubmit = async (values: FormValues) => {
		try {
			// ponytail: jangan andalkan dirtyFields — setValue-controlled (tanpa shouldDirty) tidak pernah
			// mem-populate dirtyFields di RHF v7 → field opsional (tmtKerja, gajiPokok, ...) raib.
			// Server WAJIB terima rumahDinasId sebagai angka (min 0) — kirim 0 bila kosong,
			// JANGAN dihilangkan dari request (hilang = 500 "The given id must not be null").
			const payload: Record<string, unknown> = {
				statusPegawai: values.statusPegawai,
				kodePajakId: Number(values.kodePajakId),
				gajiProfilId: Number(values.gajiProfilId),
				rumahDinasId: Number(values.rumahDinasId ?? 0),
			};
			for (const [key, v] of Object.entries(values)) {
				if (key === "statusPegawai" || key === "kodePajakId" || key === "gajiProfilId" || key === "rumahDinasId")
					continue;
				if (v === "" || v === undefined) continue;
				if (key === "gajiPokok" || key === "phdp") payload[key] = Number(v);
				else if (key === "isAskes") payload[key] = v === "true";
				else payload[key] = v;
			}

			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/gaji`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan"));
			}
			toast.success("Data gaji berhasil diperbarui");
			qc.invalidateQueries({ queryKey: ["/api/proxy/pegawai"] });
			qc.invalidateQueries({ queryKey: ["ringkasan", pegawaiId] });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	const e = (name: keyof FormValues) => (errors[name] ? String(errors[name]?.message ?? "") : undefined);

	return (
		<Sheet
			open={open}
			onOpenChange={(v) => {
				if (!v) onClose();
			}}
		>
			<SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">
				<SheetHeader className="shrink-0">
					<SheetTitle>Edit Gaji</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-4 pb-4">
					{detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="gaji-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-4 pt-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldSelect
									label="Status Pegawai"
									value={watch("statusPegawai")}
									options={statusPegawaiOpts}
									onChange={(v) => setValue("statusPegawai", v, { shouldValidate: true })}
									error={e("statusPegawai")}
									required
								/>
								<FieldDate
									label="TMT Kerja"
									value={watch("tmtKerja")}
									onChange={(v) => setValue("tmtKerja", v)}
									error={e("tmtKerja")}
								/>
								<FieldDate
									label="TMT Pensiun"
									value={watch("tmtPensiun")}
									onChange={(v) => setValue("tmtPensiun", v)}
									error={e("tmtPensiun")}
								/>
							</div>
							<FieldFk
								label="Kode Pajak"
								options={pajakOpts}
								value={watch("kodePajakId")}
								onChange={(v) => setValue("kodePajakId", v ?? "", { shouldValidate: true })}
								error={e("kodePajakId")}
								required
							/>
							<FieldFk
								label="Profil Gaji"
								options={gajiProfilOpts}
								value={watch("gajiProfilId")}
								onChange={(v) => setValue("gajiProfilId", v ?? "", { shouldValidate: true })}
								error={e("gajiProfilId")}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldText
									label="Gaji Pokok"
									type="number"
									value={watch("gajiPokok")}
									onChange={(v) => setValue("gajiPokok", v)}
									error={e("gajiPokok")}
									placeholder="0"
								/>
								<FieldText
									label="PHDP"
									type="number"
									value={watch("phdp")}
									onChange={(v) => setValue("phdp", v)}
									error={e("phdp")}
									placeholder="0"
								/>
							</div>
							<FieldSelect
								label="Askes"
								value={watch("isAskes")}
								options={[
									{ value: "true", label: "Ya" },
									{ value: "false", label: "Tidak" },
								]}
								onChange={(v) => setValue("isAskes", v)}
								error={e("isAskes")}
							/>
							<FieldFk
								label="Rumah Dinas"
								options={rumahDinasOpts}
								value={watch("rumahDinasId")}
								onChange={(v) => setValue("rumahDinasId", v)}
								error={e("rumahDinasId")}
							/>
						</form>
					)}
				</div>
				{errors.root && <p className="px-4 text-sm text-destructive">{errors.root.message}</p>}
				<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
					<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
						Batal
					</Button>
					<Button type="submit" form="gaji-form" disabled={isSubmitting || detailQuery.isPending}>
						{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
						{isSubmitting ? "Menyimpan\u2026" : "Simpan"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
