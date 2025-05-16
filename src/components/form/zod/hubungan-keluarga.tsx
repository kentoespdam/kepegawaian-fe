import {
	HUBUNGAN_KELUARGA,
	HubunganKeluarga,
} from "@_types/enums/hubungan-keluarga";
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
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const HubunganKeluargaZod = <TData extends FieldValues>({
	id,
	form,
}: InputZodProps<TData>) => {
	const [pop, setPop] = useState(false);

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Hubungan Keluarga</FormLabel>
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
									{!field.value
										? "Pilih Hubungan Keluarga"
										: HubunganKeluarga.Values[field.value].replace("_", " ")}
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Pencarian..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{HUBUNGAN_KELUARGA.map((item) => (
										<CommandItem
											key={item}
											value={HubunganKeluarga.Values[item]}
											onSelect={() => {
												field.onChange(HubunganKeluarga.Values[item]);
												setPop(false);
											}}
										>
											<CheckIcon
												className={cn(
													"mr-2 h-4 w-4",
													item === field.value ? "opacity-100" : "opacity-0",
												)}
												aria-hidden
											/>
											{item.replace("_", " ")}
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

export default HubunganKeluargaZod;
