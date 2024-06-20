import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import Datepicker from "react-tailwindcss-datepicker";

const DatePickerZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Datepicker
                            useRange={false}
                            asSingle={true}
                            primaryColor="emerald"
                            inputClassName="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.value}
                            onChange={(value)=>field.onChange(value?.startDate)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default DatePickerZod;