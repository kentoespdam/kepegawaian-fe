import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { JENIS_TUNJANGAN } from "@_types/enums/jenis_tunjangan";

const SelectJenisTunjanganZod = <TData extends FieldValues>({
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
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value ? "text-muted-foreground" : "",
                                    )}
                                >
                                    <span className="flex-1 truncate text-left">
                                        {field.value ? field.value : "Pilih Jenis Tunjangan"}
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
                                    {JENIS_TUNJANGAN.map((item) => (
                                        <CommandItem
                                            key={item}
                                            value={item}
                                            onSelect={() => {
                                                field.onChange(item);
                                                setPop(false);
                                            }}
                                        >
                                            {item}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    item === field.value
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

export default SelectJenisTunjanganZod;