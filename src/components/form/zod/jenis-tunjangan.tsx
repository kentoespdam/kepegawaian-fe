import { JENIS_TUNJANGAN } from "@_types/enums/jenis_tunjangan";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectJenisTunjanganZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>{label}</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={field.value ? field.value : "Pilih Jenis Tunjangan"}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{JENIS_TUNJANGAN.map((item) => (
								<CommandItem
									key={item}
									value={item}
									onSelect={() => {
										field.onChange(item);
										handleOpenDialog();
									}}
								>
									{item}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											item === field.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandDialog>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectJenisTunjanganZod;
