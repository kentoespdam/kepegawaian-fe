"use client";
import { findProfesiValue, type ProfesiMini } from "@_types/master/profesi";
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
	const jabatanId = form.watch(jabStr)
	const [pop, setPop] = useState(false);
	const query = useQuery({
		queryKey: ["profesi-list", jabatanId],
		queryFn: async () => {
			const result = await getListData<ProfesiMini>({
				path: "profesi",
				subPath: `jabatan/${jabatanId}`,
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
											? "No Data (Pilih Jabatan)"
											: query.isLoading || query.isFetching
												? "Loading..."
												: field.value
													? findProfesiValue(query.data ?? [], field.value).nama
													: "Pilih Profesi"}
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
									{query.data?.map((profesi) => (
										<CommandItem
											key={profesi.id}
											value={profesi.nama}
											onSelect={() => {
												field.onChange(profesi.id);
												setPop(false);
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
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectProfesiZod;
