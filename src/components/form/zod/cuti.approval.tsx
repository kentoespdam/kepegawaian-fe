"use client";
import { getApprovalCutiStatusLabel } from "@_types/enums/approval_cuti_status";
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

const SelectCutiApprovalZod = <TData extends FieldValues>({
	id,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog((prev) => !prev);

	const getValue = (val: string) => {
		if (!val) return "Pilih Status Approval";
		return getApprovalCutiStatusLabel(val);
	};
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>Status</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className="cursor-pointer"
								onClick={handleOpenDialog}
								value={getValue(field.value)}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50" />
						</div>
					</FormControl>
					<CommandDialog open={openDialog} onOpenChange={handleOpenDialog}>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandItem
								key="APPROVED"
								value="APPROVED"
								onSelect={() => {
									field.onChange("APPROVED");
									handleOpenDialog();
								}}
							>
								{getApprovalCutiStatusLabel("APPROVED")}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										"APPROVED" === field.value ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
							<CommandItem
								key="REJECTED"
								value="REJECTED"
								onSelect={() => {
									field.onChange("REJECTED");
									handleOpenDialog();
								}}
							>
								{getApprovalCutiStatusLabel("REJECTED")}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										"REJECTED" === field.value ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
							<CommandItem
								key="RETURNED"
								value="RETURNED"
								onSelect={() => {
									field.onChange("RETURNED");
									handleOpenDialog();
								}}
							>
								{getApprovalCutiStatusLabel("RETURNED")}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										"RETURNED" === field.value ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
						</CommandList>
					</CommandDialog>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectCutiApprovalZod;
