"use client"

import { findProfesiValue, type Profesi } from "@_types/master/profesi";
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { Label } from "@components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { getMasterList } from "@helpers/action";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type SelectProfesiComponentProps = {
    id: string
    label: string
    defaultValue?: string
    required?: boolean
}
const SelectProfesiComponent = (props: SelectProfesiComponentProps) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(props.defaultValue ?? "")

    const query = useQuery({
        queryKey: ["profesi-list"],
        queryFn: async () => {
            const result = await getMasterList<Profesi>({
                path: "profesi"
            })
            return result
        }
    })
    return (
        <>
            <Label htmlFor={props.id}>
                {props.label} {!props.required ? "" : <span className="text-red-500">*</span>}
                <input type="text" name={props.id} id={props.id} defaultValue={value} required={props.required} />
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value ? findProfesiValue(query.data ?? [], value)?.nama : "Pilih Profesi"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Type to search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {query.data?.map((level) => (
                                <CommandItem
                                    key={level.id}
                                    onSelect={() => {
                                        setValue(String(level.id))
                                        setOpen(false)
                                    }}
                                >
                                    {level.nama}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === String(level.id) ? "opacity-100" : "opacity-0"
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

export default SelectProfesiComponent;