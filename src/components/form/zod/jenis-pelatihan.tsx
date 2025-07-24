"use client";

import {
	type JenisPelatihan,
	findJenisPelatihanValue,
} from "@_types/master/jenis_pelatihan";
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
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const JenisPelatihanZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["jenis-pelatihan-list"],
		queryFn: async () => {
			const result = await getListDataEnc<JenisPelatihan>({
				path: encodeString("jenis-pelatihan"),
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
										? "Pelatihan tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? findJenisPelatihanValue(query.data, field.value).nama
												: "Pilih Pelatihan"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data?.map((item) => (
								<CommandItem
									key={item.id}
									value={item.nama}
									onSelect={() => {
										field.onChange(item.id);
										handleOpenDialog();
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											item.id === field.value ? "opacity-100" : "opacity-0",
										)}
										aria-hidden
									/>
									{item.nama}
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

export default JenisPelatihanZod;
