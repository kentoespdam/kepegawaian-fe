"use client";
import { KUALIFIKASI } from "@_types/enums/kualifikasi";
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

const KualifikasiZod = <TData extends FieldValues>({
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
							onValueChange={(value) => field.onChange(value)}
							{...field}
						>
							{KUALIFIKASI.map((kualifikasi) => (
								<div key={kualifikasi} className="flex items-center space-x-2">
									<RadioGroupItem
										value={kualifikasi}
										id={`kualifikasi-${kualifikasi}`}
									/>
									<Label
										htmlFor={`kualifikasi-${kualifikasi}`}
										className="cursor-pointer"
									>
										{kualifikasi}
									</Label>
								</div>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default KualifikasiZod;
