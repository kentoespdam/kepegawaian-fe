import type { JenisSk } from "@_types/master/jenis_sk";
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
import { globalGetData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectJenisSkZod = <TData extends FieldValues>({
	id,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery<JenisSk[]>({
		queryKey: ["jenis-sk-list"],
		queryFn: async () => {
			const result = await globalGetData<JenisSk[]>({
				path: "master/jenis-sk",
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
					<FormLabel htmlFor={id}>Jenis Surat Keputusan</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={
									!query.data
										? "Jenis Surat Keputusan tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? query.data.find((item) => item.id === field.value)
														?.nama
												: "Pilih Jenis Surat Keputusan"
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
									value={item.id}
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

export default SelectJenisSkZod;
