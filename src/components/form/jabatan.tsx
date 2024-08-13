"use client"

import { type Jabatan, findJabatanValue } from "@_types/master/jabatan";
import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { Label } from "@components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import React, { type Dispatch, type SetStateAction } from "react";

type SelectJabatanComponentProps = {
    id: string
    label: string
    defaultValue?: string
    required?: boolean
    onSelect?: Dispatch<SetStateAction<number | undefined>>
}
const SelectJabatanComponent = (props: SelectJabatanComponentProps) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(props.defaultValue ?? "")

    const query = useQuery({
        queryKey: ["jabatan-list"],
        queryFn: async () => {
            const result = await getListData<Jabatan>({
                path: "jabatan"
            })
            return result
        }
    })
    return (
        <>
            <Label htmlFor={props.id}>
                {props.label} {!props.required ? "" : <span className="text-red-500">*</span>}
                <input type="hidden" name={props.id} id={props.id} defaultValue={value} required={props.required} />
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value ? findJabatanValue(query.data ?? [], value)?.nama : "Pilih Jabatan"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Type to search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {query.data?.map((jabatan) => (
                                <CommandItem
                                    key={jabatan.id}
                                    value={jabatan.nama}
                                    onSelect={() => {
                                        setValue(String(jabatan.id))
                                        props.onSelect?.(jabatan.level.id)
                                        setOpen(false)
                                    }}
                                >
                                    {jabatan.nama}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === String(jabatan.id) ? "opacity-100" : "opacity-0"
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

export default SelectJabatanComponent;