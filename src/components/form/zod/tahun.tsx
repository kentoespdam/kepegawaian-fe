import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
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
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const tahunList = () => {
	const today = new Date();
	const tahuns = [];
	for (let i = today.getFullYear(); i >= today.getFullYear() - 4; i--) {
		tahuns.push(i);
	}
	return tahuns;
};

const SelectTahunZod = <TData extends FieldValues>({
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
								value={field.value ?? "Pilih Tahun"}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{tahunList().map((item) => {
								return (
									<CommandItem
										key={item}
										value={`${item}`}
										onSelect={() => {
											field.onChange(item);
											handleOpenDialog();
										}}
									>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												`${item}` === field.value ? "opacity-100" : "opacity-0",
											)}
											aria-hidden
										/>
										{item}
									</CommandItem>
								);
							})}
						</CommandList>
					</CommandDialog>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectTahunZod;
