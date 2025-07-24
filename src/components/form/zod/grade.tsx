"use client";
import { type Grade, findGradeValue } from "@_types/master/grade";
import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { getListData, getListDataEnc } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { encodeString } from "@helpers/number";

const SelectGradeZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const levelStr = "level" as Path<TData>;
	const levelId = form.watch(levelStr);
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);
	const query = useQuery({
		queryKey: ["grade-list"],
		queryFn: async () => {
			const result = await getListDataEnc<Grade>({
				path: encodeString("grade"),
			});
			return result;
		},
	});

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>{label}</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={
									!query.data
										? "Grade tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? `${findGradeValue(query.data, field.value).level.nama} - Grade ${findGradeValue(query.data, field.value).grade}`
												: "Pilih Grade"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data
								?.filter((grade) => grade.level.id === levelId)
								.map((grade) => (
									<CommandItem
										key={grade.id}
										value={`${grade.level.nama} - Grade ${grade.grade}`}
										onSelect={() => {
											field.onChange(grade.id);
											handleOpenDialog();
										}}
									>
										{grade.level.nama} - Grade {grade.grade}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												grade.id === Number(field.value)
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
						</CommandList>
					</CommandDialog>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectGradeZod;
