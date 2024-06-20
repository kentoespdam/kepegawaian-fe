import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@components/ui/select";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { STATUS_KAWIN } from "@_types/enums/status_kawin";

const SelectStatusKawinZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {

    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Pilih ${label}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {STATUS_KAWIN.map((status, index) => (
                                <SelectItem
                                    key={status}
                                    value={index.toString()}
                                >
                                    {status.replace("_", " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
    );
}

export default SelectStatusKawinZod;