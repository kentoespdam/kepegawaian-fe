import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { GOLONGAN_DARAH, GolonganDarah } from "@_types/enums/golongan_darah";

const RadioGolonganDarah = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
    return (
        <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            defaultValue={field.value}
                            className="flex justify-start gap-4"
                            onValueChange={(value) => field.onChange(value)}
                            {...field}
                        >
                            {Object.keys(GOLONGAN_DARAH).map((golDarah, index) => (
                                <div key={golDarah} className="flex items-center space-x-2">
                                    <RadioGroupItem value={golDarah} id={golDarah} />
                                    <Label htmlFor={golDarah} className="cursor-pointer">{golDarah}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default RadioGolonganDarah;