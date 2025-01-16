"use client";
import { findJabatanValue, type JabatanMini } from "@_types/master/jabatan";
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
import type { FieldValues, Path } from "react-hook-form";
import type { InputZodProps } from "./iface";

interface SelectJabatanZodProps<TData extends FieldValues>
	extends InputZodProps<TData> { }

const SelectJabatanZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: SelectJabatanZodProps<TData>) => {
	const orgStr = "organisasiId" as Path<TData>;
	const organisasiId = form.watch(orgStr);
	const [pop, setPop] = useState(false);
	const query = useQuery({
		queryKey: ["jabatan-list", organisasiId],
		queryFn: async () => {
			const result = await getListData<JabatanMini>({
				path: "jabatan",
				subPath: `organisasi/${organisasiId}`,
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
					<FormLabel>{label}</FormLabel>
					<Popover open={pop} onOpenChange={setPop}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-between",
										!field.value ? "text-muted-foreground" : "",
									)}
								>
									<span className="text-left flex-1 truncate">
										{!query.data
											? "No Data (Pilih Organisasi)"
											: query.isLoading || query.isFetching
												? "Loading..."
												: field.value
													? `${findJabatanValue(query.data, field.value).nama} (${findJabatanValue(query.data, field.value).kode})`
													: "Pilih Jabatan"}
									</span>
									<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Type a command or search..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{query.data?.map((jabatan) => (
										<CommandItem
											key={jabatan.id}
											value={jabatan.nama}
											onSelect={() => {
												field.onChange(jabatan.id);
												setPop(false);
												// setJabatanId(jabatan.level.id);
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
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectJabatanZod;
