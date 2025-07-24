import {
	HUBUNGAN_KELUARGA,
	HubunganKeluarga,
} from "@_types/enums/hubungan-keluarga";
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
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectHubunganKeluargaZod = <TData extends FieldValues>({
	id,
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
					<FormLabel htmlFor={id}>Hubungan Keluarga</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={
									!field.value
										? "Pilih Hubungan Keluarga"
										: HubunganKeluarga.Values[field.value].replace("_", " ")
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{HUBUNGAN_KELUARGA.map((item) => (
								<CommandItem
									key={item}
									value={HubunganKeluarga.Values[item]}
									onSelect={() => {
										field.onChange(HubunganKeluarga.Values[item]);
										handleOpenDialog();
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											item === field.value ? "opacity-100" : "opacity-0",
										)}
										aria-hidden
									/>
									{item.replace("_", " ")}
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

export default SelectHubunganKeluargaZod;
