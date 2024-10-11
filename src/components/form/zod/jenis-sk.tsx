import type { JenisSk } from "@_types/master/jenis_sk";
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
import { globalGetData } from "@helpers/action";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectJenisSkZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

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
					<FormLabel>Jenis Surat Keputusan</FormLabel>
					<Popover open={pop} onOpenChange={setPop}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									// role="combobox"
									className={cn(
										"w-full justify-between",
										!field.value ? "text-muted-foreground" : "",
									)}
								>
									<span className="text-left flex-1 truncate">
										{!query.data
											? "Jenis Surat Keputusan tidak ditemukan"
											: query.isLoading || query.isFetching
												? "Loading..."
												: field.value
													? query.data.find((item) => item.id === field.value)
															?.nama
													: "Pilih Jenis Surat Keputusan"}
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
											value={item.id}
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

export default SelectJenisSkZod;
