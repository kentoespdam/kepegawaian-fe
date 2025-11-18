"use client";

import type { InputZodProps } from "@components/form/zod/iface";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import type { FieldValues } from "react-hook-form";

const SelectStatusNikahZod = <TData extends FieldValues>({
	id,
	form,
}: InputZodProps<TData>) => {
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>Status Nikah</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={(value) => field.onChange(value === "true")}
							defaultValue={field.value}
							className="flex justify-start gap-8 h-9"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="false"
									id={`${id}-false`}
									checked={!field.value}
								/>
								<Label htmlFor="isLatest-false">Belum Menikah</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="true"
									id={`${id}-false`}
									checked={field.value}
								/>
								<Label htmlFor="isLatest-true">Sudah Menikah</Label>
							</div>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectStatusNikahZod