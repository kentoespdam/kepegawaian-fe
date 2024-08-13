"use client";
import type { StatusKerja } from "@_types/master/status_kerja";
import { Button } from "@components/ui/button";
import {
	Command,
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@components/ui/popover";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectStatusKerjaZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

	const query = useQuery({
		queryKey: ["status-kerja-list"],
		queryFn: async () => {
			const result = await getListData<StatusKerja>({
				path: "status-kerja",
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
					<FormLabel>{label}</FormLabel>
					<Popover open={pop} onOpenChange={setPop}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										"w-full justify-between",
										!field.value ? "text-muted-foreground" : "",
									)}
								>
									{!query.data
										? "Status Kerja tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: field.value === ""
												? "Pilih Status Kerja"
												: query.data?.find(
														(status) => status.id === field.value,
													)?.nama}
									<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Type a command or search..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{query.data?.map((status_kerja) => (
										<CommandItem
											key={status_kerja.id}
											value={status_kerja.nama}
											onSelect={() => {
												field.onChange(status_kerja.id);
												setPop(false);
											}}
										>
											{status_kerja.nama}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													status_kerja.id === Number(field.value)
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectStatusKerjaZod;
