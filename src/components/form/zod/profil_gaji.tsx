import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { findKode, type ProfilGaji } from "@_types/penggajian/profil";
import { Button } from "@components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

interface SelectProfilGajiZodProps<TData extends FieldValues> extends InputZodProps<TData> { }
const SelectProfilGajiZod = <TData extends FieldValues>({
    id,
    label,
    form,
}: SelectProfilGajiZodProps<TData>) => {
    const [pop, setPop] = useState(false);

    const query = useQuery({
        queryKey: ["profil-gaji-list"],
        queryFn: async () => {
            const result = await getListData<ProfilGaji>({
                path: "penggajian/profil",
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
                                            ? "Profil Gaji tidak ditemukan"
                                            : query.isLoading || query.isFetching
                                                ? "Loading..."
                                                : field.value
                                                    ? findKode(query.data ?? [], field.value).nama
                                                    : "Pilih Profil Gaji"}
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
                                            value={item.nama}
                                            onSelect={() => {
                                                field.onChange(item.id);
                                                setPop(false);
                                            }}
                                        >
                                            {item.nama}
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

export default SelectProfilGajiZod;