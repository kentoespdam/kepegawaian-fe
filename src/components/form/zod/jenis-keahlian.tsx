"use client";

import {
	findJenisKeahlianValue,
	type JenisKeahlian,
} from "@_types/master/jenis_keahlian";
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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const JenisKeahlianZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

	const query = useQuery({
		queryKey: ["jenis-keahlian-list"],
		queryFn: async () => {
			const result = await getListData<JenisKeahlian>({
				path: "jenis-keahlian",
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
									className={cn(
										"w-full justify-between",
										!field.value ? "text-muted-foreground" : "",
									)}
								>
									<span className="mr-2 flex-1 truncate">
										{!query.data
											? "Keahlian tidak ditemukan"
											: query.isLoading || query.isFetching
												? "Loading..."
												: field.value
													? findJenisKeahlianValue(query.data, field.value).nama
													: "Pilih Keahlian"}
									</span>
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Pencarian..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{query.data?.map((item) => (
										<CommandItem
											key={item.id}
											value={item.nama}
											onSelect={() => {
												field.onChange(item.id);
												setPop(false);
											}}
										>
											{item.nama}
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

export default JenisKeahlianZod;
