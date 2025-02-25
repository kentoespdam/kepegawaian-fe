import { useRouter, useSearchParams } from "next/navigation";
import type { BaseSearchProps } from "./component";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { STATUS_PROSES_GAJI, getStatusProsesGajiValue } from "@_types/enums/proses_gaji";
import { ChevronDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@components/ui/command";
import { useDebouncedCallback } from "use-debounce";

const StatusProsesGajiSearchBuilder = ({ col, val }: BaseSearchProps) => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);
    const { replace } = useRouter()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(val ?? "")

    const handleSelect = useDebouncedCallback((val: string) => {
        setValue(val)
        setOpen(false)
        if (!val) search.delete(col.id)
        else search.set(col.id, val)
        replace(`${location.pathname}?${search.toString()}`)
    }, 500)

    useEffect(() => setValue(val ?? ""), [val])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between",
                        !value ? "text-muted-foreground" : ""
                    )}>
                    <span className="text-left flex-1 truncate">
                        {value ? getStatusProsesGajiValue(value) : "Pilih Status Proses Gaji"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Type to search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No result found.</CommandEmpty>
                        {Object.entries(STATUS_PROSES_GAJI).map(([k, v]) => (
                            <CommandItem
                                key={k}
                                value={k}
                                onSelect={() => { handleSelect(k) }}
                            >
                                {v}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default StatusProsesGajiSearchBuilder;