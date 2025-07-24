"use client";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { getTanggalRangeList } from "@helpers/tanggal";
import { dateToIndonesian } from "@helpers/string";
import { MultiSelect } from "@components/ui/multi-select";
import { useState } from "react";

interface RealisasiCutiFormProps<TData extends FieldValues>
	extends InputZodProps<TData> {
	startDate: string;
	endDate: string;
}
const RealisasiCutiZod = <TData extends FieldValues>({
	id,
	label,
	form,
	startDate,
	endDate,
}: RealisasiCutiFormProps<TData>) => {
	const start = new Date(startDate);
	start.setDate(start.getDate() - 5);
	const end = new Date(endDate);
	end.setDate(end.getDate() + 5);
	const listDisabled = ["2025-07-09", "2025-07-10", "2025-07-11"];
	const tanggalList = getTanggalRangeList(new Date(start), new Date(end)).map(
		(tanggal) => {
			return {
				value: tanggal,
				label: dateToIndonesian(tanggal),
				disabled: listDisabled.includes(tanggal),
			};
		},
	);
	const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>{label}</FormLabel>
					<FormControl>
						<MultiSelect
							options={tanggalList}
							onValueChange={(value) => {
								field.onChange(value);
								setSelectedFrameworks(value);
							}}
							defaultValue={selectedFrameworks}
							placeholder="Pilih Tanggal"
							animation={2}
							maxCount={3}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default RealisasiCutiZod;
