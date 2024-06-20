"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@components/ui/select"
import { getMasterList } from "@helpers/action"
import { SelectValue } from "@radix-ui/react-select"
import { useQuery } from "@tanstack/react-query"
import type { FieldValues } from "react-hook-form"
import type { InputZodProps } from "./iface"
import type { StatusPegawai } from "@_types/master/status_pegawai"


const SelectStatusPegawaiZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const query = useQuery({
        queryKey: ["status-pegawai-list"],
        queryFn: async () => {
            const result = await getMasterList<StatusPegawai>({
                path: "status-pegawai"
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
                    <Select onValueChange={field.onChange} defaultValue={field.value > 0 ? field.value.toString() : ""}>
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
                                    {item.nama}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SelectStatusPegawaiZod;