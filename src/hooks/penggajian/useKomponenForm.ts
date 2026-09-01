import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { TipeKomponen } from "@/types/_shared";
import type { GajiKomponenMiniProjection, GajiKomponenResponse } from "@/types/penggajian/komponen";

export interface KomponenFormState {
	kode: string;
	nama: string;
	jenisGaji: TipeKomponen | "";
	nilai: string;
	formula: string;
	urut: string;
}

export const INITIAL_KOMPONEN_FORM: KomponenFormState = {
	kode: "",
	nama: "",
	jenisGaji: "",
	nilai: "",
	formula: "",
	urut: "",
};

/** Kode item from /kode endpoint — may include jenisGaji for grouping. */
export interface KodeItem extends GajiKomponenMiniProjection {
	jenisGaji?: TipeKomponen;
}

/** Append a kode token to the formula, inserting a space separator if needed. */
export function appendKode(formula: string, kode: string): string {
	const trimmed = formula.trimEnd();
	if (!trimmed) return kode;
	// No space needed right after an opening paren
	if (trimmed.endsWith("(")) return trimmed + kode;
	return trimmed.endsWith(" ") ? trimmed + kode : `${trimmed} ${kode}`;
}

/** Smart-format: surround operators & parentheses with 1 space, collapse repeats, trim. */
export function formatFormula(formula: string): string {
	return formula
		.replace(/([()+\-*/])/g, " $1 ")
		.replace(/\s+/g, " ")
		.trim();
}

export function useKomponenForm(profilId: number | null, editing?: GajiKomponenResponse | null) {
	const kodeQuery = useQuery<KodeItem[]>({
		queryKey: penggajianKeys.komponen.kode(profilId),
		queryFn: () => penggajianApi.listKode<KodeItem[]>(profilId as number),
		enabled: !!profilId,
		staleTime: 0,
		gcTime: 5 * 60_000,
	});

	const urutQuery = useQuery<number>({
		queryKey: penggajianKeys.komponen.urut(profilId),
		queryFn: () => penggajianApi.getUrut<number>(profilId as number),
		enabled: !!profilId,
		staleTime: 0,
		gcTime: 5 * 60_000,
	});

	const [form, setForm] = useState<KomponenFormState>({ ...INITIAL_KOMPONEN_FORM });

	// Pre-fill form when editing, reset when switching to create mode
	useEffect(() => {
		if (editing) {
			setForm({
				kode: editing.kode ?? "",
				nama: editing.nama ?? "",
				jenisGaji: editing.jenisGaji ?? "",
				nilai: String(editing.nilai ?? ""),
				formula: editing.formula ?? "",
				urut: String(editing.urut ?? ""),
			});
		} else {
			setForm({ ...INITIAL_KOMPONEN_FORM });
		}
	}, [editing]);

	// Auto-fill urut on create mode (once, when query resolves & form.urut is still empty)
	useEffect(() => {
		if (!editing && urutQuery.isFetched && urutQuery.data != null && !form.urut) {
			setForm((f) => ({ ...f, urut: String(urutQuery.data) }));
		}
	}, [urutQuery.data, urutQuery.isFetched, editing, form.urut]);

	const setField = (name: keyof KomponenFormState, value: string | TipeKomponen) => {
		setForm((f) => ({ ...f, [name]: value }));
	};

	// Exclude current komponen's own kode when editing (prevent self-reference in formula)
	const availableKode = kodeQuery.data?.filter((k) => !editing || k.kode !== editing.kode) ?? [];

	return {
		form,
		setField,
		setFormula: (f: string) => setForm((s) => ({ ...s, formula: f })),
		availableKode,
		kodePending: kodeQuery.isPending,
		urutAuto: urutQuery.data,
		appendKodeToFormula: (kode: string) => setForm((f) => ({ ...f, formula: appendKode(f.formula, kode) })),
	};
}
