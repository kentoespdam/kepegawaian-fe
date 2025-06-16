"use client";
import { type SanksiMini, findSanksiValue } from "@_types/master/sanksi";
import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList
} from "@components/ui/command";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

interface SelectSanksiZodProps<TData extends FieldValues>
	extends InputZodProps<TData> {
	notJenisSpId?: number;
	isJenisSpId?: number;
}
const SelectSanksiZod = <TData extends FieldValues>({
	id,
	label,
	form,
	notJenisSpId,
	isJenisSpId,
}: SelectSanksiZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["sanksi-list"],
		queryFn: async () =>
			await getListData<SanksiMini>({
				path: "sanksi",
			}),
	});

	const filteredData = query.data?.filter((item) => {
		if (notJenisSpId && notJenisSpId > 0) {
			return item.jenisSpId !== notJenisSpId;
		}
		if (isJenisSpId && isJenisSpId > 0) {
			return item.jenisSpId === isJenisSpId;
		}
		return true;
	});

	useEffect(() => {
		if (isJenisSpId && isJenisSpId > 0) {
			form.resetField(id);
		}
	}, [isJenisSpId, form, id]);

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
										? "Sanksi tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: findSanksiValue(query.data, Number(field.value))
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{filteredData?.map((item) => (
								<CommandItem
									key={item.id}
									// value={`${item.id}`}
									onSelect={() => {
										field.onChange(item.id);
										handleOpenDialog();
									}}
								>
									{item.kode} - {item.keterangan}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											item.id === Number(field.value)
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

export default SelectSanksiZod;
