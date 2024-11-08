import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { cn } from "@lib/utils";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const InputZod = <TData extends FieldValues>({
	id,
	label,
	form,
	type = "text",
	disabled,
	className,
	readonly,
}: InputZodProps<TData>) => (
	<FormField
		control={form.control}
		name={id}
		render={({ field }) => (
			<FormItem className={cn(type === "hidden" && "hidden", className)}>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input
						type={type === "text" ? "text" : "number"}
						step={type === "float" ? 0.01 : undefined}
						placeholder={`Masukkan ${label}`}
						disabled={disabled}
						readOnly={readonly}
						{...field}
						onChange={(event) =>
							type === "number" || type === "float"
								? field.onChange(+event.target.value)
								: field.onChange(event.target.value)
						}
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default InputZod;
