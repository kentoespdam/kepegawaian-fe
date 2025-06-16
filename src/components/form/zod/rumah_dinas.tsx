import { type RumahDinas, findRumahDinas } from "@_types/master/rumah_dinas";
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

interface SelectRumahDinasZodProps<TData extends FieldValues>
	extends InputZodProps<TData> {}
const SelectRumahDinasZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: SelectRumahDinasZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["rumah-dinas-list"],
		queryFn: async () =>
			await getListData<RumahDinas>({
				path: "rumah-dinas",
			}),
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
										? "Rumah Dinas tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? findRumahDinas(query.data ?? [], field.value).nama
												: "Pilih Rumah Dinas"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
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
									{item.nama}
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

export default SelectRumahDinasZod;
