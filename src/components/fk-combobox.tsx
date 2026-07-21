"use client";

import { ChevronsUpDown, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface FKComboboxProps {
	options: { value: string; label: string; disabled?: boolean }[];
	value: string | number | undefined;
	onChange: (value: string | undefined) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	disabled?: boolean;
	loading?: boolean;
	emptyText?: string;
	id?: string;
	invalid?: boolean;
}

// ponytail: client-side filter via cmdk CommandInput bawaan. Cukup untuk <500 opsi.
// Server-search jika /list organisasi terbukti berat >500 item.
export function FKCombobox({
	options,
	value,
	onChange,
	placeholder = "Pilih…",
	searchPlaceholder,
	disabled = false,
	loading = false,
	emptyText = "Tidak ada hasil",
	id,
	invalid = false,
}: FKComboboxProps) {
	const [open, setOpen] = useState(false);

	const selectedLabel = options.find((o) => String(o.value) === String(value))?.label;

	return (
		<>
			<Button
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-invalid={invalid}
				disabled={disabled}
				id={id}
				className="h-11 w-full justify-between font-normal bg-transparent border-input"
				onClick={() => setOpen(true)}
			>
				<span className={cn("truncate", !selectedLabel && "text-muted-foreground")}>
					{selectedLabel ?? placeholder}
				</span>
				<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
			</Button>

			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				title={placeholder}
				description={searchPlaceholder ?? `Ketik untuk mencari ${placeholder.toLowerCase()}...`}
				showCloseButton
			>
				<Command>
					<CommandInput placeholder={searchPlaceholder ?? `Cari ${placeholder.toLowerCase()}...`} />
					<CommandList>
						{loading && (
							<div className="flex items-center justify-center py-6">
								<Loader2 className="size-5 animate-spin text-muted-foreground" />
							</div>
						)}
						{!loading && <CommandEmpty>{emptyText}</CommandEmpty>}
						{!loading && (
							<CommandGroup>
								{options.map((opt) => (
									<CommandItem
										key={opt.value}
										value={`${opt.label} ${opt.value}`}
										disabled={opt.disabled}
										data-checked={String(opt.value) === String(value)}
										onSelect={() => {
											onChange(opt.value);
											setOpen(false);
										}}
									>
										{opt.label}
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
