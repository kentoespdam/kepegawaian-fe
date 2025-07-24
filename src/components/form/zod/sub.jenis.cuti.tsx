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
import type { FieldValues, Path } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { cn } from "@lib/utils";

type SubJenisCutiZodProps<TData extends FieldValues> = InputZodProps<TData> & {
	parentId: Path<TData>;
};
const SubJenisCutiZod = <TData extends FieldValues>({
	id,
	label,
	form,
	parentId,
}: SubJenisCutiZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const qc = useQueryClient();

	const filteredData = qc
		.getQueryData<CutiJenis[]>(["jenis-cuti"])
		?.filter((item) => item.parent?.id === form.getValues(parentId));

	const getValueString = (value: number | undefined) => {
		return (
			filteredData?.find((item) => item.id === value)?.nama ??
			"Pilih Jenis Cuti"
		);
	};
	const handleOpenDialog = () => {
		if (filteredData?.length === 0) return;
		setOpenDialog((prev) => !prev);
	};

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>{label}</FormLabel>
					<FormControl aria-disabled={filteredData?.length === 0}>
						<div className="relative w-full">
							<Input
								readOnly
								id={id}
								className={cn("cursor-pointer", {
									"cursor-not-allowed opacity-50": filteredData?.length === 0,
								})}
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
							{filteredData?.map((item) => (
								<CommandItem
									key={item.id}
									onSelect={() => {
										field.onChange(item.id);
										handleOpenDialog();
									}}
								>
									<span className="flex items-center">{item.nama}</span>
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

export default SubJenisCutiZod;
