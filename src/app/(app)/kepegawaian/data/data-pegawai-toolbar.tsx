"use client";

import { FilterX, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFkOptions } from "@/hooks/useFkOptions";
import { useStatusKerjaOptions, useStatusPegawaiOptions } from "@/hooks/usePegawaiMasterOptions";

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
	{ key: "statusKerja", label: "Status Kerja", type: "select" },
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

// ── Chip label helpers ──

/** Build { value → label } lookup from options array. */
function labelMap(opts: { value: string; label: string }[]): Record<string, string> {
	const m: Record<string, string> = {};
	for (const o of opts) m[o.value] = o.label;
	return m;
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
	const statusKerjaOpts = useStatusKerjaOptions();

	return (
		<div className="space-y-4">
			{POPOVER_FILTERS.map((f) => {
				const selectOptions = f.key === "statusKerja" ? statusKerjaOpts : (f.options ?? []);
				return (
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
									{selectOptions.map((o) => (
										<SelectItem key={o.value} value={o.value}>
											{o.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</div>
				);
			})}
		</div>
	);
}

// ── Main toolbar ──

interface DataPegawaiToolbarProps {
	values: Record<string, string>;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	hasActive: boolean;
	onAddClick?: () => void;
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
	const statusPegawaiOpts = useStatusPegawaiOptions();
	const statusKerjaOpts = useStatusKerjaOptions();

	const chipMaps: Record<string, Record<string, string>> = {
		organisasiId: labelMap(organisasiOpts),
		jabatanId: labelMap(jabatanOpts),
		profesiId: labelMap(profesiOpts),
		golonganId: labelMap(golonganOpts),
		gradeId: labelMap(gradeOpts),
		statusPegawai: labelMap(statusPegawaiOpts),
		statusKerja: labelMap(statusKerjaOpts),
	};

	const [namaLocal, setNamaLocal] = useState(values.nama ?? "");
	const [nipamLocal, setNipamLocal] = useState(values.nipam ?? "");
	const debouncedNama = useDebouncedCallback((v: string) => onFilterChange("nama", v || undefined), 400);
	const debouncedNipam = useDebouncedCallback((v: string) => onFilterChange("nipam", v || undefined), 400);
	const [popoverOpen, setPopoverOpen] = useState(false);

	// Sync search inputs when URL changes (e.g. on reset)
	useEffect(() => {
		setNamaLocal(values.nama ?? "");
	}, [values.nama]);
	useEffect(() => {
		setNipamLocal(values.nipam ?? "");
	}, [values.nipam]);

	const activeChips = Object.entries(values)
		.filter(([, v]) => v && v !== values.nama && v !== values.nipam)
		.map(([k, v]) => {
			if (chipMaps[k]) {
				const name = chipMaps[k][v];
				if (name) return { key: k, label: k === "statusPegawai" ? `Status: ${name}` : name };
			}
			switch (k) {
				case "nama":
					return { key: k, label: `Nama: ${v}` };
				case "nipam":
					return { key: k, label: `NIPAM: ${v}` };
				case "nik":
					return { key: k, label: `NIK: ${v}` };
				case "jenisKelamin":
					return { key: k, label: v === "LAKI_LAKI" ? "Laki-laki" : "Perempuan" };
				default:
					return { key: k, label: v };
			}
		});

	return (
		<div className="mb-3 space-y-2">
			<div className="rounded-lg border bg-card shadow-sm">
				<div className="flex items-center justify-between gap-4 px-4 py-3 max-sm:flex-col max-sm:items-stretch">
					<div className="flex flex-1 flex-wrap items-center gap-2 max-sm:flex-col">
						<Input
							placeholder="Cari NIPAM..."
							value={nipamLocal}
							onChange={(e) => {
								const val = e.target.value;
								setNipamLocal(val);
								debouncedNipam(val);
							}}
							className="h-11 w-48"
						/>
						<Input
							placeholder="Cari Nama..."
							value={namaLocal}
							onChange={(e) => {
								const val = e.target.value;
								setNamaLocal(val);
								debouncedNama(val);
							}}
							className="h-11 w-48"
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
								{statusPegawaiOpts.map((o) => (
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
							<Button variant="outline" className="h-11 px-4" onClick={onReset}>
								<FilterX className="mr-1.5 size-3.5" />
								Reset
							</Button>
						)}
						{onAddClick && (
							<Button className="h-11 px-4 font-semibold" onClick={onAddClick}>
								<Plus />
								Tambah
							</Button>
						)}
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
