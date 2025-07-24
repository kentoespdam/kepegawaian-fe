import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";


const SelectJenisGajiZod = <TData extends FieldValues>({
    id,
    label,
    form,
}: InputZodProps<TData>) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            defaultValue={field.value}
                            className="flex justify-start gap-4"
                            onValueChange={(value) => field.onChange(value)}
                            {...field}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="NONE" id="None" />
                                <Label htmlFor="None" className="cursor-pointer">
                                    -
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="PEMASUKAN" id="PEMASUKAN" />
                                <Label htmlFor="PEMASUKAN" className="cursor-pointer">
                                    Pemasukan
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="POTONGAN" id="POTONGAN" />
                                <Label htmlFor="POTONGAN" className="cursor-pointer">
                                    Potongan
                                </Label>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default SelectJenisGajiZod;