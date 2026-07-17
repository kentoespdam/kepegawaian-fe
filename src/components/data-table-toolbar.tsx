"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FilterField {
	name: string;
	label: string;
	type?: "text" | "number";
}

export interface FKSource {
	field: string;
	entity: string;
	label: string;
}

interface DataTableToolbarProps {
	children?: React.ReactNode;
	searchFields?: FilterField[];
	fkSources?: FKSource[];
	/** Options for FK selects — keyed by field name */
	fkOptions?: Record<string, { value: string; label: string }[]>;
	/** Current filter values dari URL */
	values?: Record<string, string>;
	/** Dipanggil saat user mengubah filter — parent setP + reset page=1 */
	onFilterChange?: (name: string, value: string | undefined) => void;
	/** Ada filter atau sort aktif — tampilkan tombol Reset */
	hasActive?: boolean;
	/** Reset semua filter & sort */
	onReset?: () => void;
}

export function DataTableToolbar({
	children,
	searchFields,
	fkSources,
	fkOptions,
	values = {},
	onFilterChange,
	hasActive,
	onReset,
}: DataTableToolbarProps) {
	return (
		<div className="rounded-lg border bg-card shadow-sm mb-3">
			<div className="flex items-center justify-between gap-4 px-4 py-3 max-sm:flex-col max-sm:items-stretch">
				<div className="flex flex-1 flex-wrap items-center gap-2 max-sm:flex-col">
					{searchFields?.map((f) => (
						<DebouncedInput
							key={f.name}
							label={f.label}
							type={f.type ?? "text"}
							value={values[f.name] ?? ""}
							onChange={(v) => onFilterChange?.(f.name, v || undefined)}
						/>
					))}
					{fkSources?.map((fk) => (
						<FKComboboxFilter
							key={fk.field}
							label={fk.label}
							options={fkOptions?.[fk.field] ?? []}
							value={values[fk.field]}
							onChange={(v) => onFilterChange?.(fk.field, v)}
						/>
					))}
				</div>
				<div className="flex items-center gap-2 max-sm:justify-end max-sm:w-full max-sm:*:w-full">
					{hasActive && onReset && (
						<Button variant="outline" size="sm" onClick={onReset}>
							<RotateCcw className="mr-1.5 size-3.5" />
							Reset
						</Button>
					)}
					{children}
				</div>
			</div>
		</div>
	);
}

/** Input dengan debounce 400ms — langsung responsif di UI, URL diupdate setelah jeda. */
function DebouncedInput({
	label,
	type,
	value,
	onChange,
}: {
	label: string;
	type: string;
	value: string;
	onChange: (v: string) => void;
}) {
	const [local, setLocal] = useState(value);
	const debouncedOnChange = useDebouncedCallback((v: string) => onChange(v), 400);

	// Sync saat value berubah dari luar (navigasi URL)
	useEffect(() => {
		setLocal(value);
	}, [value]);

	return (
		<Input
			placeholder={`Cari ${label.toLowerCase()}...`}
			value={local}
			onChange={(e) => {
				const v = e.target.value;
				setLocal(v);
				debouncedOnChange(v);
			}}
			type={type}
			className="h-11 w-48 max-w-50"
		/>
	);
}
