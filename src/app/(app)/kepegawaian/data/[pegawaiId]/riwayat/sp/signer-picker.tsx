"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";

interface SignerPickerProps {
	onSelect: (item: PegawaiListResponse) => void;
	selectedSigner: PegawaiListResponse | null;
	onClear: () => void;
	showError?: boolean;
}

export function SignerPicker({ onSelect, selectedSigner, onClear, showError }: SignerPickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");

	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
		return () => clearTimeout(t);
	}, [searchQuery]);

	const searchEnabled = debouncedSearch.length >= 2;
	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search", debouncedSearch],
		queryFn: async () => {
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

	const handleSelect = (item: PegawaiListResponse) => {
		onSelect(item);
		setIsOpen(false);
		setSearchQuery("");
	};

	return (
		<>
			{selectedSigner ? (
				<div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium truncate">{selectedSigner.nama}</p>
						<p className="text-xs text-muted-foreground truncate">
							{selectedSigner.jabatan?.nama ?? "—"}
							{selectedSigner.organisasi?.nama && `  |  ${selectedSigner.organisasi.nama}`}
						</p>
					</div>
					<div className="flex gap-1 shrink-0">
						<Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(true)}>
							<Search className="size-3.5 mr-1" />
							Ubah
						</Button>
						<Button type="button" variant="ghost" size="icon-sm" onClick={onClear} title="Hapus penanda tangan">
							<X className="size-3.5" />
						</Button>
					</div>
				</div>
			) : (
				<div className="space-y-1.5">
					<Button type="button" variant="outline" className="h-11 w-full" onClick={() => setIsOpen(true)}>
						<Search className="size-4 mr-2" />
						Cari Penanda Tangan
					</Button>
					{showError && <p className="text-xs text-destructive">Pilih penanda tangan terlebih dahulu</p>}
				</div>
			)}

			<Dialog
				open={isOpen}
				onOpenChange={(v) => {
					if (!v) {
						setIsOpen(false);
						setSearchQuery("");
					}
				}}
			>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Cari Penanda Tangan</DialogTitle>
					</DialogHeader>
					<Input
						type="search"
						placeholder="Cari berdasarkan nama atau NIPAM..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-11"
						autoFocus
					/>
					<div className="max-h-64 overflow-y-auto -mx-4">
						{!searchEnabled ? (
							<p className="px-4 py-6 text-center text-sm text-muted-foreground">
								Ketik minimal 2 karakter untuk mencari
							</p>
						) : pegawaiSearch.isPending ? (
							<div className="space-y-2 px-4 py-4">
								{[1, 2, 3].map((i) => (
									<div key={i} className="h-10 animate-pulse rounded-md bg-muted" />
								))}
							</div>
						) : pegawaiSearch.isError ? (
							<p className="px-4 py-6 text-center text-sm text-destructive">Gagal memuat data. Coba lagi.</p>
						) : pegawaiSearch.data?.length === 0 ? (
							<p className="px-4 py-6 text-center text-sm text-muted-foreground">Tidak ditemukan</p>
						) : (
							<div className="divide-y divide-border">
								{pegawaiSearch.data?.map((item) => (
									<button
										key={item.id}
										type="button"
										onClick={() => handleSelect(item)}
										className="w-full px-4 py-2.5 text-left hover:bg-accent transition-colors duration-100"
									>
										<p className="text-sm font-medium">
											{item.nipam && <span className="text-muted-foreground font-normal mr-1.5">{item.nipam}</span>}
											{item.nama}
										</p>
										<p className="text-xs text-muted-foreground truncate">
											{item.jabatan?.nama ?? "—"}
											{item.organisasi?.nama && `  |  ${item.organisasi.nama}`}
										</p>
									</button>
								))}
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
