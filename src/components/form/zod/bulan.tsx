import {
	Command,
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
import { NAMA_BULAN, getNamaBulan } from "@helpers/tanggal";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectBulanZod = <TData extends FieldValues>({
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
								value={
									field.value
										? getNamaBulan(Number(field.value))
										: "Pilih Bulan"
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{NAMA_BULAN.map((bulan, index) => {
								const bulanString =
									index < 10 ? `0${index + 1}` : `${index + 1}`;
								return (
									<CommandItem
										key={bulan}
										value={bulanString}
										onSelect={() => {
											field.onChange(bulanString);
											handleOpenDialog();
										}}
									>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												bulanString === field.value
													? "opacity-100"
													: "opacity-0",
											)}
											aria-hidden
										/>
										{bulan}
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

export default SelectBulanZod;
