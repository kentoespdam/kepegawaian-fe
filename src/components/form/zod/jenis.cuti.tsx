import type { CutiJenis } from "@_types/cuti/jenis";
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
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const JenisCutiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const qc = useQueryClient();
	const data = qc.getQueryData<CutiJenis[]>(["jenis-cuti"]);

	const getValueString = (value: number | undefined) => {
		return data?.find((item) => item.id === value)?.nama ?? "Pilih Jenis Cuti";
	};

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
								value={getValueString(field.value)}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{data?.map((item) => (
								<CommandItem
									key={item.id}
									onSelect={() => {
										field.onChange(item.id);
										handleOpenDialog();
									}}
								>
									<span className="flex items-center">
										{item.nama}
										{item.parent && (
											<span className="ml-2 text-sm text-muted-foreground">
												(Parent: {item.parent.nama})
											</span>
										)}
									</span>
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

export default JenisCutiZod;
