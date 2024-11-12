"use client";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";
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
} from "@components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@components/ui/popover";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useAlasanBerhentiStore } from "@store/master/alasan_berhenti";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const AlasanTerminasiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const { setAlasanTerminasi } = useAlasanBerhentiStore((state) => ({
		setAlasanTerminasi: state.setAlasanTerminasi,
	}));
	const [pop, setPop] = useState(false);

	const query = useQuery({
		queryKey: ["alasan-terminasi-list"],
		queryFn: async () => {
			const result = await getListData<AlasanBerhenti>({
				path: "alasan-berhenti",
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
										? "Pilih Alasan Terminasi"
										: query.data?.find((item) => item.id === +field.value)
												?.nama}
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Pencarian..." />
								<CommandList>
									<CommandEmpty>No mutasi found.</CommandEmpty>
									{query.data?.map((item) => (
										<CommandItem
											key={item.id}
											onSelect={() => {
												field.onChange(item.id);
												setPop(false);
												setAlasanTerminasi(item);
											}}
										>
											{item.nama}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													item.id === +field.value
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
				</FormItem>
			)}
		/>
	);
};

export default AlasanTerminasiZod;
