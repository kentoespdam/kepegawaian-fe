"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select"
import { getListData } from "@helpers/action"
import { SelectValue } from "@radix-ui/react-select"
import { useQuery } from "@tanstack/react-query"
import type { FieldValues } from "react-hook-form"
import type { InputZodProps } from "./iface"
import { findGolonganValue, type Golongan } from "@_types/master/golongan"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react"
import { Button } from "@components/ui/button"

const SelectGolonganZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const [pop, setPop] = useState(false)
    const query = useQuery({
        queryKey: ["golongan-list"],
        queryFn: async () => {
            const result = await getListData<Golongan>({
                path: "golongan"
            })
            return result
        }
    })

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
                                    {!query.data ?
                                        "Golongan tidak ditemukan" :
                                        query.isLoading || query.isFetching ?
                                            "Loading..." :
                                            field.value ?
                                                `${findGolonganValue(query.data, field.value).golongan} - ${findGolonganValue(query.data, field.value).pangkat}` :
                                                "Pilih Golongan"
                                    }
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Pencarian..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {query.data?.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            value={`${item.golongan} - ${item.pangkat}`}
                                            onSelect={() => {
                                                field.onChange(item.id)
                                                setPop(false)
                                            }}
                                        >
                                            {item.golongan} - {item.pangkat}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    item.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/* <Select onValueChange={field.onChange} defaultValue={field.value > 0 ? field.value.toString() : ""}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Pilih ${label}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {query.data?.map((item) => (
                                <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                >
                                    {item.golongan} - {item.pangkat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default SelectGolonganZod;