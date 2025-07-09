import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";
import type { InputZodProps } from "./iface";

type DatePickerZodProps<TData extends FieldValues> = {
	popoverDirection?: "up" | "down";
	minDate?: Date;
	maxDate?: Date;
} & InputZodProps<TData>;
const DatePickerZod = <TData extends FieldValues>({
	id,
	label,
	form,
	popoverDirection,
	minDate,
	maxDate,
}: DatePickerZodProps<TData>) => {
	const [value, setValue] = useState<DateValueType | null>({
		startDate: form.getValues(id),
		endDate: form.getValues(id),
	});
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl className="relative">
							<Datepicker
								popoverDirection={popoverDirection}
								useRange={false}
								asSingle={true}
								minDate={minDate}
								maxDate={maxDate}
								primaryColor="emerald"
								inputClassName="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								value={value}
								onChange={(val) => {
									setValue(val);
									field.onChange(val?.startDate?.toString());
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default DatePickerZod;
