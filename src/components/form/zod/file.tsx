import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const InputFileZod = <TData extends FieldValues>({
	id,
	label,
	form,
	fileRef,
}: InputZodProps<TData>) => {
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field: { value, onChange, ...fieldProps } }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...fieldProps}
							type="file"
							placeholder={`Masukkan ${label}`}
							// {...fileRef}
							onChange={(e) => {
								// console.log(e.target.files?.[0]);
								onChange(e.target.files);
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputFileZod;
