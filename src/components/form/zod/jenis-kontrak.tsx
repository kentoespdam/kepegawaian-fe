import {
	type JenisKontrak,
	jenisKontrakGetName,
} from "@_types/master/jenis_kontrak";
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
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const JenisKontrakZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

	const query = useQuery({
		queryKey: ["jenis-mutasi-list"],
		queryFn: async () => {
			const result = await getListData<JenisKontrak>({
				path: "master",
				subPath: "jenis-kontrak",
				isRoot: true,
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
									{!field.value || field.value === ""
										? "Pilih Jenis Kontrak"
										: jenisKontrakGetName(query.data || [], field.value)}
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Pencarian..." />
								<CommandList>
									<CommandEmpty>No mutasi found.</CommandEmpty>
									{query.data?.map((mutasi) => (
										<CommandItem
											key={mutasi.id}
											onSelect={() => {
												field.onChange(mutasi.id);
												setPop(false);
											}}
										>
											{mutasi.nama}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													mutasi.id === field.value
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

export default JenisKontrakZod;
