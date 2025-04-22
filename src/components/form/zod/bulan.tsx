import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { NAMA_BULAN, getNamaBulan } from "@helpers/tanggal";
import { cn } from "@lib/utils";

const SelectBulanZod = <TData extends FieldValues>({
    id,
    label,
    form,
}: InputZodProps<TData>) => {
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
                                    className={cn(
                                        "w-full justify-between gap-2",
                                        !field.value ? "text-muted-foreground" : "",
                                    )}
                                >
                                    {field.value ? getNamaBulan(Number(field.value)) : "Pilih Bulan"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Pencarian..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {NAMA_BULAN.map((bulan, index) => {
                                        const bulanString = index < 10 ? `0${index + 1}` : `${index + 1}`
                                        return (
                                            <CommandItem
                                                key={bulan}
                                                value={bulanString}
                                                onSelect={() => {
                                                    field.onChange(bulanString);
                                                    setPop(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        bulanString === field.value ? "opacity-100" : "opacity-0",
                                                    )}
                                                    aria-hidden
                                                />
                                                {bulan}
                                            </CommandItem>
                                        )
                                    })}
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

export default SelectBulanZod;