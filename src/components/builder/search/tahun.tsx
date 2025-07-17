"use client";
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
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const SearchTahunBuilder = ({ col, val }: BaseSearchProps) => {
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const tahun = new Date().getFullYear() + 1;
	const listTahun = [...Array(5)].map((_, index) => tahun - index);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(val ?? String(tahun));

	const handleSelect = useDebouncedCallback((val: number) => {
		setValue(String(val));
		setOpen(false);
		if (!val) search.delete(col.id);
		else search.set(col.id, String(val));
		replace(`${location.pathname}?${search.toString()}`);
	}, 500);

	useEffect(() => {
		setValue(val ?? String(tahun));
	}, [val, tahun]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{listTahun.map((item) => {
							return (
								<CommandItem
									key={item}
									className={cn(
										"cursor-pointer",
										value !== "" && value === String(item) && "bg-secondary/80",
									)}
									onSelect={() => handleSelect(item)}
								>
									{item}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4 text-primary",
											value !== "" && value === String(item)
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							);
						})}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SearchTahunBuilder;
