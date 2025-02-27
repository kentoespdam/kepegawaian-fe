import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { NAMA_BULAN } from "@helpers/tanggal";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const tahunList = () => {
    const today = new Date()
    const tahuns = []
    for (let i = today.getFullYear(); i >= today.getFullYear() - 4; i--) {
        tahuns.push(i)
    }
    return tahuns
}

const SelectTahunZod = <TData extends FieldValues>({
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
                                    {field.value ?? "Pilih Tahun"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Pencarian..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {tahunList().map((item) => {
                                        return (
                                            <CommandItem
                                                key={item}
                                                value={`${item}`}
                                                onSelect={() => {
                                                    field.onChange(item);
                                                    setPop(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        `${item}` === field.value ? "opacity-100" : "opacity-0",
                                                    )}
                                                    aria-hidden
                                                />
                                                {item}
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

export default SelectTahunZod;