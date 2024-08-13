import { STATUS_KAWIN } from "@_types/enums/status_kawin";
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
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectStatusKawinZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

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
									className={cn("w-full justify-between", !field.value ? "text-muted-foreground" : "")}
								>
									{field.value
										? field.value.replace("_", " ")
										: "Pilih Status Kawin"}
									<CaretSortIcon className="h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Pencarian..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{STATUS_KAWIN.map((item, index) => (
										<CommandItem
											key={item}
											value={item}
											onSelect={() => {
												field.onChange(item);
												setPop(false);
											}}
										>
											{item.replace("_", " ")}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													index === field.value ? "opacity-100" : "opacity-0",
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

export default SelectStatusKawinZod;
