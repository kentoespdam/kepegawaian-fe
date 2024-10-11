import { Button } from "@components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { Label } from "@components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type SelectLevelOrganisasiComponentProps = {
    id: string
    val: string
    parentOrgId: string
}
const SelectLevelOrganisasiComponent = ({ id, val, parentOrgId }: SelectLevelOrganisasiComponentProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(val ?? "")

    const handleSelect = (i: string) => {
        setValue(i)
        setOpen(false)
    }

    return (
        <>
            <Label htmlFor="levelOrganisasi">
                Level Organisasi
                <input type="hidden" name={id} id={id} value={value} />
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value ?
                            `Level ${value}` :
                            <span className="opacity-50">Plih Level</span>}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Type to search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {["1", "2", "3", "4", "5", "6"].filter((i) => Number(i) > Number(parentOrgId)).map((i) => (
                                <CommandItem
                                    key={i}
                                    value={`Level ${i}`}
                                    onSelect={() => {
                                        handleSelect(i)
                                    }}
                                >
                                    {`Level ${i}`}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === i ? "opacity-100" : "opacity-0"
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

export default SelectLevelOrganisasiComponent;