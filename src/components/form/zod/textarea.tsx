import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";

const TextAreaZod = <TData extends FieldValues>({ id, label, form, readonly }: InputZodProps<TData>) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            id={id}
                            placeholder={`Masukkan ${label}`}
                            readOnly={readonly}
                            className={readonly ? "bg-secondary text-secondary-foreground" : ""}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    );
}

export default TextAreaZod;