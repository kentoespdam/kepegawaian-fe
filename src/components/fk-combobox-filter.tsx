"use client";

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

interface FKComboboxFilterProps {
	/** Label yang ditampilkan di trigger dan header dialog */
	label: string;
	/** Daftar opsi dari fkOptions */
	options: { value: string; label: string }[];
	/** Nilai terpilih saat ini (id dari URL) — undefined/empty = "Semua" */
	value?: string;
	/** Dipanggil saat user memilih opsi */
	onChange: (value: string | undefined) => void;
}

export function FKComboboxFilter({ label, options, value, onChange }: FKComboboxFilterProps) {
	const [open, setOpen] = useState(false);

	const selectedLabel = options.find((o) => o.value === value)?.label;

	function handleSelect(selected: string) {
		// Toggle off jika klik "Semua" atau item yang sudah aktif
		if (selected === "" || selected === value) {
			onChange(undefined);
		} else {
			onChange(selected);
		}
		setOpen(false);
	}

	return (
		<>
			<Button
				variant="outline"
				role="combobox"
				aria-expanded={open}
				className="h-11 w-48 max-w-50 justify-between font-normal bg-card"
				onClick={() => setOpen(true)}
			>
				<span className="truncate">{selectedLabel ?? `Semua ${label}`}</span>
				<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
			</Button>

			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				title={`Pilih ${label}`}
				description={`Ketik untuk mencari ${label.toLowerCase()}...`}
			>
				<Command>
					<CommandInput placeholder={`Cari ${label.toLowerCase()}...`} />
					<CommandList>
						<CommandEmpty>Tidak ada hasil untuk pencarian ini.</CommandEmpty>
						<CommandGroup>
							<CommandItem value="" data-checked={!value} onSelect={() => handleSelect("")}>
								Semua {label}
							</CommandItem>
							{options.map((opt) => (
								<CommandItem
									key={opt.value}
									value={`${opt.label} ${opt.value}`}
									data-checked={opt.value === value}
									onSelect={() => handleSelect(opt.value)}
								>
									{opt.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
