"use client";
import { findKode, type PendapatanNonPajak } from "@_types/penggajian/pendapatan_non_pajak";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

interface SelectPendapatanNonPajakZodProps<TData extends FieldValues> extends InputZodProps<TData> {}
const SelectPendapatanNonPajakZod = <TData extends FieldValues>({
    id,
    label,
    form,
}: SelectPendapatanNonPajakZodProps<TData>) => {
    const [pop, setPop] = useState(false);

    const query = useQuery({
        queryKey: ["pendapatan-non-pajak-list"],
        queryFn: async () => {
            const result = await getListData<PendapatanNonPajak>({
                path: "penggajian/pendapatan-non-pajak",
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
                                    <span className="text-left flex-1 truncate">
                                        {!query.data
                                            ? "Kode Pajak tidak ditemukan"
                                            : query.isLoading || query.isFetching
                                                ? "Loading..."
                                                : field.value
                                                    ? findKode(query.data ?? [], field.value).kode
                                                    : "Pilih Kode Pajak"}
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
                                            value={item.kode}
                                            onSelect={() => {
                                                field.onChange(item.id);
                                                setPop(false);
                                            }}
                                        >
                                            {item.kode}
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

export default SelectPendapatanNonPajakZod;