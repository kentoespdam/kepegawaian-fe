import { AGAMA } from "@_types/enums/agama";
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectAgamaZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const [pop, setPop] = useState(false)

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
                                    {!field.value ? "Pilih Agama" : AGAMA[field.value].replace("_", " ")}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Pencarian..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {AGAMA.map((status, index) => (
                                        <CommandItem
                                            key={status}
                                            value={index.toString()}
                                            onSelect={() => {
                                                field.onChange(index);
                                                setPop(false);
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn("mr-2 h-4 w-4", index === field.value ? "opacity-100" : "opacity-0")}
                                                aria-hidden
                                            />
                                            {status.replace("_", " ")}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )} />
    );
}

export default SelectAgamaZod;