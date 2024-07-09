"use client"
import { type OrganisasiMini, findOrganisasiValue } from "@_types/master/organisasi";
import { Button } from "@components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useOrgJab } from "@store/org-jab";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectOrganisasiZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const setOrganisasiId = useOrgJab((state) => state.setOrganisasiId)
    const [pop, setPop] = useState(false)
    const query = useQuery({
        queryKey: ["organisasi-list"],
        queryFn: async () => {
            const result = await getListData<OrganisasiMini>({
                path: "organisasi"
            })
            return result
        }
    })

    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) =>
            (
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
                                    {query.isLoading || query.isFetching ?
                                        "Loading..." :
                                        field.value ?
                                            findOrganisasiValue(query.data ?? [], field.value)?.nama :
                                            "Pilih Organisasi"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {query.data?.map((organisasi) => (
                                        <CommandItem
                                            key={organisasi.id}
                                            value={organisasi.nama}
                                            onSelect={() => {
                                                field.onChange(organisasi.id)
                                                setPop(false)
                                                setOrganisasiId(organisasi.id)
                                            }}
                                        >
                                            {organisasi.nama}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    organisasi.id === Number(field.value)
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
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SelectOrganisasiZod;