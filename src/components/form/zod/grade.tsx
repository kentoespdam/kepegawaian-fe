"use client"
import { type Grade, findGradeValue } from "@_types/master/grade";
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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { useOrgJab } from "@store/org-jab";

const SelectGradeZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const jabLevelId = useOrgJab(state => state.jabLevelId)
    const [pop, setPop] = useState(false)
    const query = useQuery({
        queryKey: ["grade-list"],
        queryFn: async () => {
            const result = await getListData<Grade>({
                path: "grade",
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
                                    className={cn("w-full justify-between", !field.value ? "text-muted-foreground" : "")}
                                >
                                    {!query.data ?
                                        "Grade tidak ditemukan" :
                                        query.isLoading || query.isFetching ?
                                            "Loading..." :
                                            field.value ?
                                                `${findGradeValue(query.data, field.value).level.nama} - Grade ${findGradeValue(query.data, field.value).grade}` :
                                                "Pilih Grade"
                                    }
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {query.data?.filter(grade => grade.level.id === jabLevelId).map((grade) => (
                                        <CommandItem
                                            key={grade.id}
                                            value={`${grade.level.nama} - Grade ${grade.grade}`}
                                            onSelect={() => {
                                                field.onChange(grade.id)
                                                setPop(false)
                                            }}
                                        >
                                            {grade.level.nama} - Grade {grade.grade}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    grade.id === Number(field.value)
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

export default SelectGradeZod;