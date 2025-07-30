"use client";
import {
	APPROVAL_CUTI_STATUS,
	getApprovalCutiStatusLabel,
} from "@_types/enums/approval_cuti_status";
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
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";
const SearchCutiApprovalStatusBuilder = ({ col, val }: BaseSearchProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(val ?? "");

	const handleSelect = useDebouncedCallback((val: string) => {
		setValue(val);
		setOpen(false);
		if (!val) search.delete(col.id);
		else search.set(col.id, val);
		replace(`${location.pathname}?${search.toString()}`);
	}, 500);

	const initValue = useMemo(() => {
		const search = new URLSearchParams(searchParams);
		if (!val) {
			search.append("approvalCutiStatus", "PENDING");
			replace(`${location.pathname}?${search.toString()}`);
			return "PENDING";
		}
		return val;
	}, [val, replace, searchParams]);

	useEffect(() => setValue(initValue), [initValue]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value ? getApprovalCutiStatusLabel(value) : "Pilih Approval Status"}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{APPROVAL_CUTI_STATUS.map((item) => (
							<CommandItem
								key={item}
								onSelect={() => {
									handleSelect(item);
								}}
							>
								{getApprovalCutiStatusLabel(item)}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										val !== "" && value === item ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SearchCutiApprovalStatusBuilder;
