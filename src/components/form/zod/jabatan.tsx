"use client";
import { type JabatanMini, findJabatanValue } from "@_types/master/jabatan";
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

const SelectJabatanZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const orgStr = "organisasiId" as Path<TData>;
	const organisasiId = form.watch(orgStr);
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog((prev) => !prev);
	const query = useQuery({
		queryKey: ["jabatan-list", organisasiId],
		queryFn: async () => {
			const result = await getListDataEnc<JabatanMini>({
				path: encodeString("jabatan"),
				subPath: encodeString(`organisasi/${organisasiId}`),
			});
			return result;
		},
		enabled: !!organisasiId && organisasiId > 0,
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
										? "No Data (Pilih Organisasi)"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? `${findJabatanValue(query.data, field.value).nama} (${findJabatanValue(query.data, field.value).kode})`
												: "Pilih Jabatan"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data?.map((jabatan) => (
								<CommandItem
									key={jabatan.id}
									value={jabatan.nama}
									onSelect={() => {
										field.onChange(jabatan.id);
										handleOpenDialog();
									}}
								>
									{jabatan.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											jabatan.id === Number(field.value)
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

export default SelectJabatanZod;
