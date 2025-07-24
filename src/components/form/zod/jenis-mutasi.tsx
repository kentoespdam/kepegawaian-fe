"use client";
import { type JenisMutasi, mutasiGetName } from "@_types/master/jenis_mutasi";
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
import { getListData, getListDataEnc } from "@helpers/action";
import { cn } from "@lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { encodeString } from "@helpers/number";

const JenisMutasiZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const { setJenisMutasi } = useRiwayatMutasiStore((state) => ({
		setJenisMutasi: state.setJenisMutasi,
	}));
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const query = useQuery({
		queryKey: ["jenis-mutasi-list"],
		queryFn: async () => {
			const result = await getListDataEnc<JenisMutasi>({
				path: encodeString("master"),
				subPath: encodeString("jenis-mutasi"),
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
										? "Pilih Jenis Mutasi"
										: mutasiGetName(query.data || [], field.value)
								}
							/>
							<ChevronDownIcon className="h-4 w-4 ml-4 opacity-50" />
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
										setJenisMutasi(mutasi);
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
				</FormItem>
			)}
		/>
	);
};

export default JenisMutasiZod;
