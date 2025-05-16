"use client";
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

const RadioSertifikasiZod = <TData extends FieldValues>({
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
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<RadioGroup
							defaultValue={field.value}
							className="flex justify-start gap-4"
							onValueChange={(value) => field.onChange(value === "true")}
							onSelectCapture={(value) => {
								field.onChange(value);
							}}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="true"
									id="sertifikasi-true"
									checked={field.value}
								/>
								<Label htmlFor="sertifikasi-true" className="cursor-pointer">
									Ya
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="false"
									id="sertifikasi-false"
									checked={!field.value}
								/>
								<Label htmlFor="sertifikasi-false" className="cursor-pointer">
									Tidak
								</Label>
							</div>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default RadioSertifikasiZod;
