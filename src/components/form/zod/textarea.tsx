import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";

const TextAreaZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={`Masukkan ${label}`}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    );
}

export default TextAreaZod;