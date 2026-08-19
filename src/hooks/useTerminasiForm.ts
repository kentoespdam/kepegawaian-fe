"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { masterKeys } from "@/hooks/keys/master-keys";
import { apiErrorMessage } from "@/lib/utils";
import { type TerminasiFormValues, terminasiSchema } from "@/lib/validations/terminasi.schema";
import type { PegawaiResponse } from "@/types/kepegawaian/riwayat";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";

// ponytail: guard klien — cegah round-trip boros ke BE
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function useTerminasiForm({
	isOpen,
	initialPegawai,
	onClose,
}: {
	isOpen: boolean;
	initialPegawai?: PegawaiResponse | null;
	onClose: () => void;
}) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);
	const [fileError, setFileError] = useState<string | null>(null);

	const {
		setValue,
		watch,
		handleSubmit: rhfSubmit,
		reset,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<TerminasiFormValues>({
		resolver: zodResolver(terminasiSchema as never),
	});

	// ── Alasan Terminasi ──
	const alasanQuery = useQuery({
		queryKey: masterKeys.list("alasan-berhenti"),
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/alasan-berhenti/list");
			if (!res.ok) return [] as Array<{ id: number; nama: string }>;
			const body = await res.json();
			return (body.data ?? []) as Array<{ id: number; nama: string }>;
		},
		staleTime: 300_000,
	});

	const alasanOptions = (alasanQuery.data ?? []).map((i) => ({
		value: String(i.id),
		label: i.nama,
	}));

	// ── Pegawai Picker ──
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawai, setSelectedPegawai] = useState<{
		id?: number;
		nipam?: string;
		nama?: string;
		organisasi?: string;
		jabatan?: string;
	} | null>(null);

	// ponytail: useDebouncedCallback — replaces useEffect debounce (A13)
	const [debouncedSearch] = useDebounce(searchQuery, 300);

	const searchEnabled = debouncedSearch.length >= 2;
	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search-aktif", debouncedSearch],
		queryFn: async () => {
			if (!searchEnabled) return [] as PegawaiListResponse[];
			const res = await fetch(
				`/api/proxy/pegawai/list?search=${encodeURIComponent(debouncedSearch)}&statusKerja=KARYAWAN_AKTIF`,
			);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = (await res.json()) as ListResultPegawaiListResponse;
			return (body.data ?? []) as PegawaiListResponse[];
		},
		enabled: searchEnabled,
		staleTime: 60_000,
	});

	const selectPegawai = (item: PegawaiListResponse) => {
		if (!item.id || !item.organisasi?.id || !item.jabatan?.id) {
			toast.error("Data pegawai terpilih tidak lengkap (id/organisasi/jabatan)");
			return;
		}
		setValue("pegawaiId", item.id);
		setValue("nipam", item.nipam ?? "");
		setValue("nama", item.nama ?? "");
		setValue("organisasiId", item.organisasi.id);
		setValue("jabatanId", item.jabatan.id);
		if (item.golongan?.id) setValue("golonganId", item.golongan.id);
		setSelectedPegawai({
			id: item.id,
			nipam: item.nipam,
			nama: item.nama,
			organisasi: item.organisasi?.nama,
			jabatan: item.jabatan?.nama,
		});
		setIsPickerOpen(false);
		setSearchQuery("");
	};

	const clearPegawai = () => {
		setValue("pegawaiId", 0);
		setValue("nipam", "");
		setValue("nama", "");
		setValue("organisasiId", 0);
		setValue("jabatanId", 0);
		setValue("golonganId", undefined);
		setSelectedPegawai(null);
	};

	// ── Pre-fill dari initialPegawai ──
	useEffect(() => {
		if (isOpen) {
			if (initialPegawai?.id) {
				const pId = initialPegawai.id;
				const pNipam = String(initialPegawai.nipam ?? "");
				const pNama = String(initialPegawai.biodata?.nama ?? "");
				const orgId = initialPegawai.organisasi?.id ?? 0;
				const jabId = initialPegawai.jabatan?.id ?? 0;
				const golId = initialPegawai.golongan?.id;
				reset({
					pegawaiId: pId,
					nipam: pNipam,
					nama: pNama,
					organisasiId: orgId,
					jabatanId: jabId,
					golonganId: golId,
					nomorSk: "",
					tanggalSk: "",
					tmtBerlaku: initialPegawai.tmtPensiun ?? "",
					alasanTerminasiId: "",
					notes: "",
				});
				setSelectedPegawai({
					id: pId,
					nipam: pNipam,
					nama: pNama,
					organisasi: initialPegawai.organisasi?.nama,
					jabatan: initialPegawai.jabatan?.nama,
				});
			} else {
				reset({
					pegawaiId: 0,
					nipam: "",
					nama: "",
					organisasiId: 0,
					jabatanId: 0,
					nomorSk: "",
					tanggalSk: "",
					tmtBerlaku: "",
					alasanTerminasiId: "",
					notes: "",
				});
				setSelectedPegawai(null);
			}
		}
	}, [isOpen, initialPegawai, reset]);

	// ── Submit ──
	const onSubmit = async (values: TerminasiFormValues) => {
		try {
			const file = fileRef.current?.files?.[0];
			if (file && file.size > MAX_FILE_SIZE_BYTES) {
				setFileError("File terlalu besar — maksimal 5 MB");
				return;
			}
			setFileError(null);

			// ponytail: multipart/form-data (@ModelAttribute) — JSON → HTTP 415
			const fd = new FormData();
			fd.append("pegawaiId", String(values.pegawaiId));
			fd.append("nipam", values.nipam);
			fd.append("nama", values.nama);
			fd.append("organisasiId", String(values.organisasiId));
			fd.append("jabatanId", String(values.jabatanId));
			fd.append("alasanTerminasiId", values.alasanTerminasiId);
			fd.append("nomorSk", values.nomorSk);
			fd.append("jenisSk", "SK_PENSIUN"); // hardcode
			fd.append("tanggalSk", values.tanggalSk);
			fd.append("tmtBerlaku", values.tmtBerlaku);
			if (values.golonganId) fd.append("golonganId", String(values.golonganId));
			if (values.notes) fd.append("notes", values.notes);
			if (file) fd.append("fileName", file);

			const res = await fetch("/api/proxy/kepegawaian/riwayat/terminasi", {
				method: "POST",
				body: fd,
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan terminasi"));
			}

			toast.success("Terminasi pegawai berhasil disimpan");
			qc.invalidateQueries({ queryKey: masterKeys.lists("alasan-berhenti") });
			qc.invalidateQueries({ queryKey: ["/api/proxy/kepegawaian/riwayat/terminasi/calon-pensiun"] });
			qc.invalidateQueries({ queryKey: ["/api/proxy/kepegawaian/riwayat/terminasi"] });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	return {
		form: { watch, errors, isSubmitting, handleSubmit: rhfSubmit },
		alasanOptions,
		alasanLoading: alasanQuery.isPending,
		isPickerOpen,
		setIsPickerOpen,
		searchQuery,
		setSearchQuery,
		searchEnabled,
		pegawaiSearch,
		selectedPegawai,
		selectPegawai,
		clearPegawai,
		fileRef,
		fileError,
		setFileError,
		onSubmit,
		initialPegawai,
		setValue,
	};
}
