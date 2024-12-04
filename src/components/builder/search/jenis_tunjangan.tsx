import { JENIS_TUNJANGAN } from "@_types/enums/jenis_tunjangan";
import { Button } from "@components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const SearchJenisTunjanganBuilder = ({ col, val }: BaseSearchProps) => {
    const searchParams = useSearchParams();
    const search = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(val ?? "JABATAN");

    const handleSelect = useDebouncedCallback((val: string) => {
        setValue(val);
        setOpen(false);
        if (!val) search.delete(col.id);
        else search.set(col.id, String(val));
        replace(`${location.pathname}?${search.toString()}`);
    }, 500);

    useEffect(() => {
        setValue(val ?? "JABATAN");
    }, [val]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between",
                        !value ? "text-muted-foreground" : "",
                    )}
                >
                    <span className="text-left flex-1 truncate">
                        {value ? value : "Pilih Jenis Tunjangan"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 ml-5">
                <Command>
                    <CommandInput placeholder="Type to search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {JENIS_TUNJANGAN.map((item) => (
                            <CommandItem
                                key={item}
                                value={item}
                                onSelect={() => {
                                    handleSelect(item);
                                }}
                            >
                                {item}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default SearchJenisTunjanganBuilder;