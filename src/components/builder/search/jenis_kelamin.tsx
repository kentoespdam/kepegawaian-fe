"use client";
import { type Jabatan, findJabatanValue } from "@_types/master/jabatan";
import { Button } from "@components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@components/ui/popover";
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const SearchJenisKelaminBuilder = ({ col, val }: BaseSearchProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(val ?? "");


	const handleSelect = useDebouncedCallback((val: string) => {
		setValue(String(val));
		setOpen(false);
		if (!val) search.delete(col.id);
		else search.set(col.id, String(val));
		replace(`${location.pathname}?${search.toString()}`);
	}, 500);

	useEffect(() => {
		setValue(val ?? "");
	}, [val]);

	const selectedJenisKelamin=(value: string) => {
		return value === "LAKI_LAKI" ? "Laki - Laki" : "Perempuan";
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value && val !== "" ? (
						selectedJenisKelamin(value)
					) : (
						<span className="opacity-50">Pilih Jenis Kelamin</span>
					)}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command className="w-full">
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandItem
							key="LAKI_LAKI"
							onSelect={() => {
								handleSelect("LAKI_LAKI");
							}}
							className="text-nowrap border-b"
						>
							Laki-Laki
							<CheckIcon
								className={cn(
									"ml-auto h-4 w-4",
									val !== "" && value === "LAKI_LAKI"
										? "opacity-100"
										: "opacity-0",
								)}
							/>
						</CommandItem>
						<CommandItem
							key="PERMPUAN"
							onSelect={() => {
								handleSelect("PEREMPUAN");
							}}
							className="text-nowrap border-b"
						>
							Perempuan
							<CheckIcon
								className={cn(
									"ml-auto h-4 w-4",
									val !== "" && value === "PEREMPUAN"
										? "opacity-100"
										: "opacity-0",
								)}
							/>
						</CommandItem>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SearchJenisKelaminBuilder;
