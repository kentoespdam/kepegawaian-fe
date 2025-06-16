import {
	type JenisSp,
	type JenisSpMini,
	findJenisSpValue,
} from "@_types/master/jenis_sp";
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
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const SelectJenisSpZod = <TData extends FieldValues>({
	id,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery<JenisSpMini[]>({
		queryKey: ["jenis-sp-list"],
		queryFn: async () => {
			const result = await getListData<JenisSp>({
				path: "jenis-sp",
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
					<FormLabel htmlFor={id}>Jenis Surat Peringatan</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={
									!query.data
										? "Jenis Surat Peringatan tidak ditemukan"
										: query.isLoading || query.isFetching
											? "Loading..."
											: findJenisSpValue(query.data, field.value)
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{query.data?.map((item) => (
								<CommandItem
									key={item.id}
									onSelect={() => {
										field.onChange(item.id);
										handleOpenDialog();
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											item.id === field.value ? "opacity-100" : "opacity-0",
										)}
										aria-hidden
									/>
									{item.kode}: {item.nama}
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

export default SelectJenisSpZod;
