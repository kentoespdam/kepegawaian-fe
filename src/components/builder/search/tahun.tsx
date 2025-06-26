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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const SearchTahunBuilder = ({ col, val: initialValue }: BaseSearchProps) => {
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const tahunParam = searchParams.get("tahun");
	const initialTahun =
		initialValue === "" && tahunParam !== null
			? Number.parseInt(tahunParam)
			: new Date().getFullYear();
	const [tahun, setTahun] = useState("");
	const [open, setOpen] = useState(false);

	const handleSelect = useDebouncedCallback((newTahun: number) => {
		setTahun(String(newTahun));
		setOpen(false);
		const search = new URLSearchParams(searchParams);
		if (!newTahun) search.delete(col.id);
		else search.set(col.id, String(newTahun));
		replace(`${pathname}?${search.toString()}`);
	}, 500);

	useEffect(() => {
		setTahun(initialValue !== "" ? initialValue : initialTahun.toString());
	}, [initialValue, initialTahun]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					aria-expanded={open}
					className="w-full justify-between"
				>
					{tahun}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandItem
							className="cursor-pointer"
							onSelect={() => handleSelect(initialTahun + 1)}
						>
							{initialTahun + 1}
							<CheckIcon
								className={cn(
									"ml-auto h-4 w-4",
									initialValue !== "" && tahun === String(initialTahun + 1)
										? "opacity-100"
										: "opacity-0",
								)}
							/>
						</CommandItem>
						{Array.from({ length: 5 }).map((_, i) => {
							const curTahun = initialTahun - i;
							return (
								<CommandItem
									key={curTahun}
									className="cursor-pointer"
									onSelect={() => handleSelect(curTahun)}
								>
									{curTahun}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											initialValue !== "" && tahun === String(curTahun)
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
