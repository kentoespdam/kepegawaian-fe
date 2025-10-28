import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { cn } from "@lib/utils"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useMemo, useState } from "react"
import type { FieldValues } from "react-hook-form"
import type { InputZodProps } from "./iface"
import { makeTahunList } from "@helpers/tanggal"

const SelectTahunZod = <TData extends FieldValues>({
	id,
	label,
	form,
}: InputZodProps<TData>) => {
	const [openDialog, setOpenDialog] = useState(false)

	// Accepts an optional boolean from CommandDialog's onOpenChange
	const handleOpenDialog = (value?: boolean) => {
		if (typeof value === "boolean") {
			setOpenDialog(value)
		} else {
			setOpenDialog((prev) => !prev)
		}
	}

	const tahuns = useMemo(() => makeTahunList(5), [])

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
								aria-label={label}
								className="cursor-pointer"
								onClick={() => handleOpenDialog(true)}
								value={field.value ?? "Pilih Tahun"}
							/>
							<ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 transform opacity-50" />
						</div>
					</FormControl>
					<CommandDialog
						open={openDialog}
						onOpenChange={handleOpenDialog}
					>
						<CommandInput placeholder="Pencarian..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{tahuns.map((item) => (
								<CommandItem
									key={item}
									value={`${item}`}
									onSelect={() => {
										field.onChange(item)
										handleOpenDialog(false)
									}}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											`${item}` === `${field.value}`
												? "opacity-100"
												: "opacity-0"
										)}
										aria-hidden={true}
									/>
									{item}
								</CommandItem>
							))}
						</CommandList>
					</CommandDialog>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default SelectTahunZod
