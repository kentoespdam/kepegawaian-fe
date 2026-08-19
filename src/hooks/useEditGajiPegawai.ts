"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { pegawaiKeys } from "@/hooks/keys/pegawai-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { useGajiProfilOptions, usePajakOptions, useStatusPegawaiOptions } from "@/hooks/usePegawaiMasterOptions";
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

export type GajiFormValues = z.infer<typeof schema>;

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

export function useEditGajiPegawai({ pegawaiId, onClose }: { pegawaiId: string | null; onClose: () => void }) {
	const qc = useQueryClient();
	const open = !!pegawaiId;

	const detailQuery = useQuery({
		queryKey: pegawaiKeys.detail(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}`);
			if (!res.ok) throw new Error("Gagal memuat detail pegawai");
			const body = await res.json();
			return body.data as PegawaiResponseDetail;
		},
		enabled: open,
		staleTime: 60_000,
	});

	const defaults = detailQuery.data ? toDefaults(detailQuery.data) : undefined;

	const {
		handleSubmit: rhfSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<GajiFormValues>({
		resolver: zodResolver(schema as never),
		values: defaults as GajiFormValues | undefined,
	});

	const pajakOpts = usePajakOptions();
	const statusPegawaiOpts = useStatusPegawaiOptions();
	const rumahDinasOpts = useFkOptions("rumah-dinas");
	const gajiProfilOpts = useGajiProfilOptions();

	const onSubmit = async (values: GajiFormValues) => {
		try {
			// ponytail: jangan andalkan dirtyFields — setValue-controlled (tanpa shouldDirty) tidak pernah
			// mem-populate dirtyFields di RHF v7 → field opsional (tmtKerja, gajiPokok, ...) raib.
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
			qc.invalidateQueries({ queryKey: pegawaiKeys.lists() });
			qc.invalidateQueries({ queryKey: pegawaiKeys.ringkasan(pegawaiId) });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	return {
		detailQuery,
		errors,
		isSubmitting,
		setValue,
		watch,
		rhfSubmit,
		onSubmit,
		pajakOpts,
		statusPegawaiOpts,
		rumahDinasOpts,
		gajiProfilOpts,
	};
}
