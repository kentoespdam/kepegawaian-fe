import { JenisKelamin } from "@_types/enums/jenisKelamin";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const RadioJenisKelaminZod = <TData extends FieldValues>({ id, label, form }: InputZodProps<TData>) => {
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
                            className="flex justify-start gap-8"
                            onValueChange={(value) => field.onChange(value)}
                            {...field}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={JenisKelamin.Values.LAKI_LAKI} id="laki-laki" />
                                <Label htmlFor="laki-laki" className="cursor-pointer">Laki - Laki</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={JenisKelamin.Values.PEREMPUAN} id="perempuan" />
                                <Label htmlFor="perempuan" className="cursor-pointer">Perempuan</Label>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default RadioJenisKelaminZod;