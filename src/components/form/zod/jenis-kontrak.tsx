import {
	type JenisKontrak,
	jenisKontrakGetName,
} from "@_types/master/jenis_kontrak";
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
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const JenisKontrakZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["jenis-mutasi-list"],
		queryFn: async () => {
			const result = await getListData<JenisKontrak>({
				path: "master",
				subPath: "jenis-kontrak",
				isRoot: true,
			});
			return result;
		},
	});

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
									!field.value || field.value === ""
										? "Pilih Jenis Kontrak"
										: jenisKontrakGetName(query.data || [], field.value)
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No mutasi found.</CommandEmpty>
							{query.data?.map((mutasi) => (
								<CommandItem
									key={mutasi.id}
									onSelect={() => {
										field.onChange(mutasi.id);
										handleOpenDialog();
									}}
								>
									{mutasi.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											mutasi.id === field.value ? "opacity-100" : "opacity-0",
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

export default JenisKontrakZod;
