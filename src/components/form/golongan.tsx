"use client"

import { findGolonganValue, type Golongan } from "@_types/master/golongan";
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { Label } from "@components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { getMasterList } from "@helpers/action";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type SelectGolonganComponentProps = {
    defaultValue?: string
    required?: boolean
}

const SelectGolonganComponent = (props: SelectGolonganComponentProps) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(props.defaultValue ?? "")

    const query = useQuery({
        queryKey: ["golongan-list"],
        queryFn: async () => {
            const result = await getMasterList<Golongan>({
                path: "golongan"
            })
            return result
        }
    })

    const gol = value ? findGolonganValue(query.data ?? [], value) : null

    return (
        <>
            <Label htmlFor="golonganId">
                Golongan/Jabatan {!props.required ? "" : <span className="text-red-500">*</span>}
                <input type="hidden" name="golonganId" id="golonganId" defaultValue={value} required={props.required} />
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {

                            value && gol ? `${gol.golongan} - ${gol.pangkat}` : "Pilih Golongan/Jabatan"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Type to search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {query.data?.map((golongan) => (
                                <CommandItem
                                    key={golongan.id}
                                    onSelect={() => {
                                        setValue(String(golongan.id))
                                        setOpen(false)
                                    }}
                                >
                                    {golongan.golongan} - {golongan.pangkat}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === String(golongan.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SelectGolonganComponent;