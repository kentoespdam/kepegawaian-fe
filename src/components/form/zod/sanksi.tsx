"use client";
import { findSanksiValue, type SanksiMini } from "@_types/master/sanksi";
import { getListData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
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
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";

interface SelectSanksiZodProps<TData extends FieldValues>
	extends InputZodProps<TData> {
	jenisSpId?: number;
}
const SelectSanksiZod = <TData extends FieldValues>({
	id,
	label,
	form,
	jenisSpId = 0,
}: SelectSanksiZodProps<TData>) => {
	const [pop, setPop] = useState(false);

	const query = useQuery({
		queryKey: ["sanksi-list"],
		queryFn: async () =>
			await getListData<SanksiMini>({
				path: "sanksi",
			}),
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
									<span className="w-full text-left flex-1 truncate">
										{!query.data
											? "Sanksi tidak ditemukan"
											: query.isLoading || query.isFetching
												? "Loading..."
												: findSanksiValue(query.data, Number(field.value))}
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
									{query.data
										?.filter((s) => s.jenisSpId !== jenisSpId)
										.map((item) => (
											<CommandItem
												key={item.id}
												// value={`${item.id}`}
												onSelect={() => {
													field.onChange(item.id);
													setPop(false);
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
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectSanksiZod;
