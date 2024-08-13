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

const LulusZod = <TData extends FieldValues>({
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
							className="flex justify-start gap-8"
							onValueChange={field.onChange}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="true"
									id="lulus-true"
									checked={field.value}
								/>
								<Label htmlFor="lulus-true">Ya</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="false"
									id="lulus-false"
									checked={!field.value}
								/>
								<Label htmlFor="lulus-false">Tidak</Label>
							</div>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default LulusZod;
