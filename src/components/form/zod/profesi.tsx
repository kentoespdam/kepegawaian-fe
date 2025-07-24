"use client";
import { type ProfesiMini, findProfesiValue } from "@_types/master/profesi";
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
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import type { InputZodProps } from "./iface";

interface SelectProfesiZodProps<TData extends FieldValues>
	extends InputZodProps<TData> {
	defaultValues?: TData;
}

const SelectProfesiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: SelectProfesiZodProps<TData>) => {
	const jabStr = "jabatanId" as Path<TData>;
	const jabatanId = form.watch(jabStr);
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["profesi-list", jabatanId],
		queryFn: async () => {
			const result = await getListDataEnc<ProfesiMini>({
				path: encodeString("profesi"),
				subPath: encodeString(`jabatan/${jabatanId}`),
			});
			return result;
		},
		enabled: !!jabatanId && jabatanId > 0,
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
										? "No Data (Pilih Jabatan)"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? findProfesiValue(query.data ?? [], field.value).nama
												: "Pilih Profesi"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data?.map((profesi) => (
								<CommandItem
									key={profesi.id}
									value={profesi.nama}
									onSelect={() => {
										field.onChange(profesi.id);
										handleOpenDialog();
									}}
								>
									{profesi.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											profesi.id === Number(field.value)
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

export default SelectProfesiZod;
