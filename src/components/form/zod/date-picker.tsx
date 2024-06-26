import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

const DatePickerZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    const [value, setValue] = useState<DateValueType>(null)

    const onChanged = (value: DateValueType) => {
        setValue(value)
    }

    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => {
                // setValue({ startDate: field.value, endDate: field.value })
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                primaryColor="emerald"
                                inputClassName="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={{ startDate: field.value, endDate: field.value }}
                                onChange={(val) => {
                                    setValue(val)
                                    field.onChange(val?.startDate?.toString() ?? '')
                                }}
                            />
                        </FormControl>
                        {/* <input
                            type="hidden"
                            value={value?.startDate?.toString() ?? ""}
                            defaultValue={value?.startDate?.toString() ?? ""}
                            name={field.name} /> */}
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
}

export default DatePickerZod;