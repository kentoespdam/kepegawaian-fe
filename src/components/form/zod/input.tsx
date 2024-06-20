import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const InputZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => (
    <FormField
        control={form.control}
        name={id}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={`Masukkan ${label}`} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default InputZod;