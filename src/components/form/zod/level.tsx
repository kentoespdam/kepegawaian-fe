import { findLevelValue, type Level } from "@_types/master/level";
import { getListData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { CheckIcon } from "lucide-react";

const SelectLevelZod = <TData extends FieldValues>({
    id,
    label,
    form,
}: InputZodProps<TData>) => {
    const [pop, setPop] = useState(false);
    const query = useQuery({
        queryKey: ["level-list"],
        queryFn: async () => {
            const result = await getListData<Level>({
                path: "level",
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
									<span className="flex-1 truncate text-left">
										{query.isLoading || query.isFetching
											? "Loading..."
											: field.value
												? findLevelValue(query.data ?? [], field.value)
														?.nama
												: "Pilih Level"}
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
}

export default SelectLevelZod;