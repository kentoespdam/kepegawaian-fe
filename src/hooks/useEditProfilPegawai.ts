"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { masterKeys } from "@/hooks/keys/master-keys";
import { pegawaiKeys } from "@/hooks/keys/pegawai-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { api } from "@/lib/api/client";
import { apiErrorMessage } from "@/lib/utils";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";

const schema = z.object({
	nipam: z.string().min(1, "NIPAM wajib"),
	nama: z.string().min(1, "Nama wajib"),
	jenisKelamin: z.string().optional(),
	statusKawin: z.string().optional(),
	agama: z.string().optional(),
	tempatLahir: z.string().optional(),
	tanggalLahir: z.string().optional(),
	alamat: z.string().optional(),
	ibuKandung: z.string().optional(),
	telp: z.string().optional(),
	golonganId: z.string().optional(),
	organisasiId: z.string().optional(),
	jabatanId: z.string().optional(),
	profesiId: z.string().optional(),
	email: z.string().optional(),
});

export type ProfilFormValues = z.infer<typeof schema>;

function toDefaults(d: PegawaiResponseDetail): Record<string, unknown> {
	const b = d.biodata;
	return {
		nipam: d.nipam ?? "",
		nama: b?.nama ?? "",
		jenisKelamin: b?.jenisKelamin ?? "",
		statusKawin: b?.statusKawin ?? "",
		agama: b?.agama ?? "",
		tempatLahir: b?.tempatLahir ?? "",
		tanggalLahir: b?.tanggalLahir ?? "",
		alamat: b?.alamat ?? "",
		ibuKandung: b?.ibuKandung ?? "",
		telp: b?.telp ?? "",
		golonganId: String(d.golongan?.id ?? "") || undefined,
		organisasiId: String(d.organisasi?.id ?? "") || undefined,
		jabatanId: String(d.jabatan?.id ?? "") || undefined,
		profesiId: String(d.profesi?.id ?? "") || undefined,
		email: d.email ?? "",
	};
}

export function useEditProfilPegawai({ pegawaiId, onClose }: { pegawaiId: string | null; onClose: () => void }) {
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
	} = useForm<ProfilFormValues>({
		resolver: zodResolver(schema as never),
		values: defaults as ProfilFormValues | undefined,
	});

	const orgOpts = useFkOptions("organisasi");
	const profesiOpts = useFkOptions("profesi");
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);

	const organisasiId = watch("organisasiId");
	const jabQuery = useQuery({
		queryKey: masterKeys.list("jabatan", { organisasiId }),
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = ((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: String(i.nama ?? ""),
	}));

	const onSubmit = async (values: ProfilFormValues) => {
		try {
			// ponytail: jangan andalkan dirtyFields — setValue-controlled (tanpa shouldDirty) tidak pernah
			// mem-populate dirtyFields di RHF v7 → payload dulu cuma {id, nipam, nama}, field lain raib.
			const payload: Record<string, unknown> = {
				id: Number(pegawaiId),
				nipam: values.nipam,
				nama: values.nama,
				organisasiId: Number(values.organisasiId ?? 0),
				jabatanId: Number(values.jabatanId ?? 0),
				profesiId: Number(values.profesiId ?? 0),
				golonganId: Number(values.golonganId ?? 0),
			};
			for (const [key, v] of Object.entries(values)) {
				if (key === "nipam" || key === "nama" || key.endsWith("Id")) continue;
				if (v === "" || v === undefined) continue;
				payload[key] = v;
			}

			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/profil`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan"));
			}
			toast.success("Profil berhasil diperbarui");
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
		orgOpts,
		profesiOpts,
		golonganOpts,
		jabQuery,
		jabOpts,
	};
}
