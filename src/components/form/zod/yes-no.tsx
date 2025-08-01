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

const YesNoZod = <TData extends FieldValues>({
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
					<FormLabel htmlFor={id}>{label}</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={(value) => field.onChange(value === "true")}
							defaultValue={field.value}
							className="flex justify-start gap-8 h-9"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="false"
									id="isLatest-false"
									checked={!field.value}
								/>
								<Label htmlFor="isLatest-false">Tidak</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="true"
									id="isLatest-true"
									checked={field.value}
								/>
								<Label htmlFor="isLatest-true">Ya</Label>
							</div>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default YesNoZod;
