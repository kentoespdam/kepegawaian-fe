"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { type KpiFormValues, kpiSchema } from "@/config/penggajian/kpi.config";
import { useCreateKpi, useUpdateKpi } from "@/hooks/penggajian/useKpiMutations";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";
import type { GajiKpiResponse } from "@/types/penggajian/kpi";

interface UseKpiFormProps {
	open: boolean;
	initialData?: GajiKpiResponse | null;
	defaultPeriode: string;
	onClose: () => void;
}

export interface SelectedPegawaiInfo {
	nipam: string;
	nama?: string;
	jabatan?: string;
	organisasi?: string;
}

export function useKpiForm({ open, initialData, defaultPeriode, onClose }: UseKpiFormProps) {
	const createMutation = useCreateKpi();
	const updateMutation = useUpdateKpi();

	const isEditing = !!initialData?.id;

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<KpiFormValues>({
		resolver: zodResolver(kpiSchema as never),
		defaultValues: {
			nipam: initialData?.nipam ?? "",
			periode: initialData?.periode ?? defaultPeriode,
			tunkin: initialData?.tunkin ?? 0,
			pph21Ter: initialData?.pph21Ter ?? undefined,
		},
	});

	// Reset form state when open / initialData / defaultPeriode changes
	useEffect(() => {
		if (open) {
			reset({
				nipam: initialData?.nipam ?? "",
				periode: initialData?.periode ?? defaultPeriode,
				tunkin: initialData?.tunkin ?? 0,
				pph21Ter: initialData?.pph21Ter ?? undefined,
			});
			if (initialData?.nipam) {
				setSelectedPegawai({ nipam: initialData.nipam });
			} else {
				setSelectedPegawai(null);
			}
		}
	}, [open, initialData, defaultPeriode, reset]);

	// ── Inline Pegawai Picker ──
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawai, setSelectedPegawai] = useState<SelectedPegawaiInfo | null>(
		initialData?.nipam ? { nipam: initialData.nipam } : null,
	);

	const [debouncedSearch] = useDebounce(searchQuery, 300);
	const searchEnabled = debouncedSearch.trim().length >= 2;

	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search-kpi", debouncedSearch],
		queryFn: async () => {
			if (!searchEnabled) return [] as PegawaiListResponse[];
			const res = await fetch(
				`/api/proxy/pegawai/list?search=${encodeURIComponent(debouncedSearch.trim())}&statusKerja=KARYAWAN_AKTIF`,
			);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = (await res.json()) as ListResultPegawaiListResponse;
			return (body.data ?? []) as PegawaiListResponse[];
		},
		enabled: searchEnabled && isPickerOpen,
		staleTime: 60_000,
	});

	const selectPegawai = (item: PegawaiListResponse) => {
		if (!item.nipam) return;
		setValue("nipam", item.nipam, { shouldValidate: true });
		setSelectedPegawai({
			nipam: item.nipam,
			nama: item.nama,
			jabatan: item.jabatan?.nama,
			organisasi: item.organisasi?.nama,
		});
		setIsPickerOpen(false);
		setSearchQuery("");
	};

	const clearPegawai = () => {
		setValue("nipam", "", { shouldValidate: true });
		setSelectedPegawai(null);
	};

	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	const onSubmit = (values: KpiFormValues) => {
		if (isEditing && initialData?.id) {
			updateMutation.mutate(
				{
					id: initialData.id,
					data: {
						nipam: values.nipam,
						periode: values.periode,
						tunkin: values.tunkin,
						pph21Ter: values.pph21Ter,
					},
				},
				{
					onSuccess: () => {
						onClose();
					},
				},
			);
		} else {
			createMutation.mutate(
				{
					nipam: values.nipam,
					periode: values.periode,
					tunkin: values.tunkin,
					pph21Ter: values.pph21Ter,
				},
				{
					onSuccess: () => {
						onClose();
					},
				},
			);
		}
	};

	return {
		register,
		handleSubmit,
		setValue,
		watch,
		errors,
		isSubmitting,
		isEditing,
		isPickerOpen,
		setIsPickerOpen,
		searchQuery,
		setSearchQuery,
		searchEnabled,
		pegawaiSearch,
		selectedPegawai,
		selectPegawai,
		clearPegawai,
		onSubmit,
	};
}
