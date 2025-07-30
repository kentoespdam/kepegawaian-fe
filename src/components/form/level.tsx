"use client";

import { type Level, findLevelValue } from "@_types/master/level";
import { Button } from "@components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import { Label } from "@components/ui/label";
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
import React from "react";

type SelectLevelComponentProps = {
	id: string;
	label: string;
	defaultValue?: string;
	required?: boolean;
	parentLevelId?: number;
};
const SelectLevelComponent = (props: SelectLevelComponentProps) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(props.defaultValue ?? "");

	const query = useQuery({
		queryKey: ["level-list"],
		queryFn: async () => {
			const result = await getListDataEnc<Level>({
				path: encodeString("level"),
			});
			return result;
		},
	});

	const levelData = props.parentLevelId
		? query.data?.filter((level) => level.id > Number(props.parentLevelId))
		: query.data;
	return (
		<>
			<Label htmlFor={props.id}>
				{props.label}{" "}
				{!props.required ? "" : <span className="text-red-500">*</span>}
				<input
					type="hidden"
					name={props.id}
					id={props.id}
					defaultValue={value}
					required={props.required}
				/>
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						aria-expanded={open}
						className="w-full justify-between"
					>
						{value
							? findLevelValue(query.data ?? [], value)?.nama
							: "Pilih Level"}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder="Type to search..." className="h-9" />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{levelData?.map((level) => (
								<CommandItem
									key={level.id}
									onSelect={() => {
										setValue(String(level.id));
										setOpen(false);
									}}
								>
									{level.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											value === String(level.id) ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default SelectLevelComponent;
