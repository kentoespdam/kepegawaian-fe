"use client";
import {
	type OrganisasiMini,
	findOrganisasiValue,
} from "@_types/master/organisasi";
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
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectOrganisasiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["organisasi-list"],
		queryFn: async () => {
			const result = await getListData<OrganisasiMini>({
				path: "organisasi",
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
									query.isLoading || query.isFetching
										? "Loading..."
										: field.value
											? `${
													findOrganisasiValue(query.data ?? [], field.value)
														?.nama
												} - ${findOrganisasiValue(query.data ?? [], field.value).kode}`
											: "Pilih Organisasi"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data?.map((organisasi) => (
								<CommandItem
									key={organisasi.id}
									value={organisasi.nama}
									onSelect={() => {
										field.onChange(organisasi.id);
										handleOpenDialog();
									}}
								>
									{organisasi.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											organisasi.id === Number(field.value)
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

export default SelectOrganisasiZod;
