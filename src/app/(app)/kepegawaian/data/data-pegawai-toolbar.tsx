"use client";

import { FilterX, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFkOptions } from "@/hooks/useFkOptions";

// ── Filter definitions ──

interface FilterDef {
	key: string;
	label: string;
	type: "fk" | "select";
	entity?: string;
	labelFn?: (i: Record<string, unknown>) => string;
	options?: { value: string; label: string }[];
}

const POPOVER_FILTERS: FilterDef[] = [
	{ key: "organisasiId", label: "Organisasi", type: "fk", entity: "organisasi" },
	{ key: "jabatanId", label: "Jabatan", type: "fk", entity: "jabatan" },
	{ key: "profesiId", label: "Profesi", type: "fk", entity: "profesi" },
	{ key: "golonganId", label: "Golongan", type: "fk", entity: "golongan" },
	{ key: "gradeId", label: "Grade", type: "fk", entity: "grade", labelFn: (i) => `Grade ${String(i.grade ?? "")}` },
	{
		key: "statusKerja",
		label: "Status Kerja",
		type: "select",
		options: [
			{ value: "KARYAWAN_AKTIF", label: "Karyawan Aktif" },
			{ value: "BERHENTI_OR_KELUAR", label: "Berhenti/Keluar" },
			{ value: "DIRUMAHKAN", label: "Dirumahkan" },
			{ value: "LAMARAN_BARU", label: "Lamaran Baru" },
			{ value: "TAHAP_SELEKSI", label: "Tahap Seleksi" },
			{ value: "DITERIMA", label: "Diterima" },
			{ value: "DIREKOMENDASIKAN", label: "Direkomendasikan" },
			{ value: "DITOLAK", label: "Ditolak" },
		],
	},
	{
		key: "jenisKelamin",
		label: "Jenis Kelamin",
		type: "select",
		options: [
			{ value: "LAKI_LAKI", label: "Laki-laki" },
			{ value: "PEREMPUAN", label: "Perempuan" },
		],
	},
];

const STATUS_OPTIONS = [
	{ value: "KONTRAK", label: "Kontrak" },
	{ value: "CAPEG", label: "CPNS" },
	{ value: "PEGAWAI", label: "PNS" },
	{ value: "CALON_HONORER", label: "Calon Honorer" },
	{ value: "HONORER", label: "Honorer" },
	{ value: "NON_PEGAWAI", label: "Non Pegawai" },
];

// ── Chip label helpers ──

/** Build { value → label } lookup from FK options array. */
function fkLabelMap(opts: { value: string; label: string }[]): Record<string, string> {
	const m: Record<string, string> = {};
	for (const o of opts) m[o.value] = o.label;
	return m;
}

/** Chip label for statusPegawai value. */
function statusPegawaiLabel(v: string) {
	const m: Record<string, string> = {
		KONTRAK: "Kontrak",
		CAPEG: "CPNS",
		PEGAWAI: "PNS",
		CALON_HONORER: "Calon Honorer",
		HONORER: "Honorer",
		NON_PEGAWAI: "Non Pegawai",
	};
	return `Status: ${m[v] ?? v}`;
}

/** Chip label for statusKerja value. */
function statusKerjaLabel(v: string) {
	return `Status Kerja: ${v
		.replace(/_/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase())}`;
}

// ── Sub-components ──

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
	return (
		<span className="inline-flex items-center gap-1 rounded-md border bg-secondary/50 px-2.5 py-1 text-xs font-medium">
			{label}
			<button
				type="button"
				onClick={onRemove}
				className="ml-0.5 rounded-sm p-0.5 hover:bg-secondary/80 transition-colors"
				aria-label={`Hapus filter ${label}`}
			>
				<X className="size-3" />
			</button>
		</span>
	);
}

function PopoverFilterContent({
	values,
	onFilterChange,
	onClosePopover,
}: {
	values: Record<string, string>;
	onFilterChange: (key: string, val: string | undefined) => void;
	onClosePopover: () => void;
}) {
	const fkOpts: Record<string, { value: string; label: string }[]> = {
		organisasiId: useFkOptions("organisasi"),
		jabatanId: useFkOptions("jabatan"),
		profesiId: useFkOptions("profesi"),
		golonganId: useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`),
		gradeId: useFkOptions("grade", (i) => `Grade ${String(i.grade ?? "")}`),
	};

	return (
		<div className="space-y-4">
			{POPOVER_FILTERS.map((f) => (
				<div key={f.key} className="space-y-1.5">
					<Label className="text-sm font-medium">{f.label}</Label>
					{f.type === "fk" ? (
						<FKComboboxFilter
							label={f.label}
							options={fkOpts[f.key] ?? []}
							value={values[f.key]}
							onChange={(val) => {
								onFilterChange(f.key, val ?? undefined);
								onClosePopover();
							}}
						/>
					) : (
						<Select
							value={values[f.key] ?? ""}
							onValueChange={(val) => {
								onFilterChange(f.key, val === "__all__" ? undefined : (val ?? undefined));
								onClosePopover();
							}}
						>
							<SelectTrigger className="h-11 w-full">
								<SelectValue placeholder={`Pilih ${f.label.toLowerCase()}`} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="__all__">Semua {f.label}</SelectItem>
								{f.options?.map((o) => (
									<SelectItem key={o.value} value={o.value}>
										{o.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				</div>
			))}
		</div>
	);
}

// ── Main toolbar ──

interface DataPegawaiToolbarProps {
	values: Record<string, string>;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	hasActive: boolean;
	onAddClick: () => void;
}

export function DataPegawaiToolbar({
	values,
	onFilterChange,
	onReset,
	hasActive,
	onAddClick,
}: DataPegawaiToolbarProps) {
	// Pre-fetch FK options for chip labels — call hooks at top level
	const organisasiOpts = useFkOptions("organisasi");
	const jabatanOpts = useFkOptions("jabatan");
	const profesiOpts = useFkOptions("profesi");
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
	const gradeOpts = useFkOptions("grade", (i) => `Grade ${String(i.grade ?? "")}`);

	// Build chip label lookup per FK key
	const fkChipMaps = useMemo<Record<string, Record<string, string>>>(() => {
		const m: Record<string, Record<string, string>> = {};
		m.organisasiId = fkLabelMap(organisasiOpts);
		m.jabatanId = fkLabelMap(jabatanOpts);
		m.profesiId = fkLabelMap(profesiOpts);
		m.golonganId = fkLabelMap(golonganOpts);
		m.gradeId = fkLabelMap(gradeOpts);
		return m;
	}, [organisasiOpts, jabatanOpts, profesiOpts, golonganOpts, gradeOpts]);

	const [searchLocal, setSearchLocal] = useState(values.nama ?? "");
	const debouncedFilter = useDebouncedCallback((v: string) => onFilterChange("nama", v || undefined), 400);
	const [popoverOpen, setPopoverOpen] = useState(false);

	// Sync search input when URL changes (e.g. on reset)
	useEffect(() => {
		setSearchLocal(values.nama ?? "");
	}, [values.nama]);

	const activeChips = useMemo(
		() =>
			Object.entries(values)
				.filter(([, v]) => v && v !== values.nama)
				.map(([k, v]) => {
					// FK fields: lookup name from options
					if (fkChipMaps[k]) {
						const name = fkChipMaps[k][v];
						if (name) return { key: k, label: name };
					}
					// Non-FK: use static label formatters
					switch (k) {
						case "nama":
							return { key: k, label: `Nama: ${v}` };
						case "nipam":
							return { key: k, label: `NIPAM: ${v}` };
						case "nik":
							return { key: k, label: `NIK: ${v}` };
						case "statusPegawai":
							return { key: k, label: statusPegawaiLabel(v) };
						case "statusKerja":
							return { key: k, label: statusKerjaLabel(v) };
						case "jenisKelamin":
							return { key: k, label: v === "LAKI_LAKI" ? "Laki-laki" : "Perempuan" };
						default:
							return { key: k, label: v };
					}
				}),
		[values, fkChipMaps],
	);

	return (
		<div className="mb-3 space-y-2">
			<div className="rounded-lg border bg-card shadow-sm">
				<div className="flex items-center justify-between gap-4 px-4 py-3 max-sm:flex-col max-sm:items-stretch">
					<div className="flex flex-1 flex-wrap items-center gap-2 max-sm:flex-col">
						<Input
							placeholder="Cari nama/NIPAM..."
							value={searchLocal}
							onChange={(e) => {
								const val = e.target.value;
								setSearchLocal(val);
								debouncedFilter(val);
							}}
							className="h-11 w-60"
						/>
						<Select
							value={values.statusPegawai ?? ""}
							onValueChange={(val) =>
								onFilterChange("statusPegawai", val === "__all__" ? undefined : (val ?? undefined))
							}
						>
							<SelectTrigger className="h-11 w-44">
								<SelectValue placeholder="Semua Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="__all__">Semua Status</SelectItem>
								{STATUS_OPTIONS.map((o) => (
									<SelectItem key={o.value} value={o.value}>
										{o.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
							<PopoverTrigger className="h-11 inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
								<FilterX className="size-4" />
								Filter
								{hasActive && (
									<span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
										{Object.entries(values).filter(([, v]) => v).length}
									</span>
								)}
							</PopoverTrigger>
							<PopoverContent align="start">
								<PopoverFilterContent
									values={values}
									onFilterChange={onFilterChange}
									onClosePopover={() => setPopoverOpen(false)}
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="flex items-center gap-2 max-sm:justify-end">
						{hasActive && (
							<Button variant="outline" size="sm" onClick={onReset}>
								<FilterX className="mr-1.5 size-3.5" />
								Reset
							</Button>
						)}
						<Button onClick={onAddClick}>
							<Plus />
							Tambah
						</Button>
					</div>
				</div>
			</div>
			{activeChips.length > 0 && (
				<div className="flex flex-wrap items-center gap-1.5 px-1">
					{activeChips.map((chip) => (
						<Chip key={chip.key} label={chip.label} onRemove={() => onFilterChange(chip.key, undefined)} />
					))}
				</div>
			)}
		</div>
	);
}
