import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { cn } from "@lib/utils";

const InputZod = <TData extends FieldValues>({ id, label, form, type = "text" }: InputZodProps<TData>) => (
    <FormField
        control={form.control}
        name={id}
        render={({ field }) => (
            <FormItem className={cn(type === "hidden" && "hidden")}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input type={type} placeholder={`Masukkan ${label} ${id}`} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default InputZod;