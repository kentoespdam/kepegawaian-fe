"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
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
}

export function DataTableToolbar({
	children,
	searchFields,
	fkSources,
	fkOptions,
	values = {},
	onFilterChange,
}: DataTableToolbarProps) {
	return (
		<div className="rounded-lg border bg-card shadow-sm">
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
						<select
							key={fk.field}
							value={values[fk.field] ?? ""}
							onChange={(e) => onFilterChange?.(fk.field, e.target.value || undefined)}
							className="h-11 max-w-[200px] rounded-lg border border-input bg-transparent px-2 pr-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
						>
							<option value="">Semua {fk.label}</option>
							{(fkOptions?.[fk.field] ?? []).map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					))}
				</div>
				<div className="flex items-center gap-2 max-sm:justify-end max-sm:w-full max-sm:[&>*]:w-full">{children}</div>
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
			className="h-11 w-48 max-w-[200px]"
		/>
	);
}
