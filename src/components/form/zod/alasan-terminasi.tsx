"use client";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";
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
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useAlasanBerhentiStore } from "@store/master/alasan_berhenti";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";

const AlasanTerminasiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const { setAlasanTerminasi } = useAlasanBerhentiStore((state) => ({
		setAlasanTerminasi: state.setAlasanTerminasi,
	}));
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["alasan-terminasi-list"],
		queryFn: async () => {
			const result = await getListDataEnc<AlasanBerhenti>({
				path: encodeString("alasan-berhenti"),
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
										? "Pilih Alasan Terminasi"
										: query.data?.find((item) => item.id === +field.value)?.nama
								}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No mutasi found.</CommandEmpty>
							{query.data?.map((item) => (
								<CommandItem
									key={item.id}
									onSelect={() => {
										field.onChange(item.id);
										setAlasanTerminasi(item);
										handleOpenDialog();
									}}
								>
									{item.nama}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											item.id === +field.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandDialog>
				</FormItem>
			)}
		/>
	);
};

export default AlasanTerminasiZod;
