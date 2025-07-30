import type { PegawaiList } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@components/ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { getListData, getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import type { InputZodProps } from "./iface";

interface PegawaiContentProps {
	handleSelect: (item: PegawaiList) => void;
}
const PegawaiContent = ({ handleSelect }: PegawaiContentProps) => {
	const [search, setSearch] = useState("");

	const query = useQuery({
		queryKey: ["pegawai-list", search],
		queryFn: async () => {
			const result = await getListDataEnc<PegawaiList>({
				path: encodeString("pegawai"),
				searchParams: search,
				isRoot: true,
			});
			return result;
		},
		enabled: !!search && search.length >= 3,
	});

	const handleChange = useDebouncedCallback((e: string) => {
		if (e.length >= 3) {
			setSearch(`nipam=${e}&nama=${e}`);
		}
	}, 500);

	// const handleSelect = (item: PegawaiList) => {
	//     setOpen(false);
	//     // replace(`${pathname}?id=${item.id}`);
	// };

	return (
		<DialogContent className="md:max-w-[700px] lg:max-w-[900px] sm:max-w-[425px]">
			<DialogHeader>Cari Penandatangan</DialogHeader>
			<div>
				<Command>
					<CommandInput
						placeholder="Ketik NIPAM / Nama"
						onValueChange={handleChange}
					/>
					<CommandList>
						{query.isFetching || query.isLoading ? (
							<CommandEmpty>Loading...</CommandEmpty>
						) : query.data ? (
							<CommandGroup>
								{query.data.map((item) => (
									<CommandItem
										key={item.id}
										value={`${item.nipam}${item.nama}`}
										onSelect={() => handleSelect(item)}
									>
										<div className="grid grid-cols-12 gap-2">
											<div className="col-span-2">[{item.nipam}]</div>
											<div className="col-span-4">{item.nama}</div>
											<div className="col-span-6">({item.jabatan.nama})</div>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						) : (
							<CommandEmpty>No user found.</CommandEmpty>
						)}
					</CommandList>
				</Command>
			</div>
		</DialogContent>
	);
};

type PegawaiSearchDialogProps<TData extends FieldValues> = {
	handleSearchPegawai: (pegawai: PegawaiList) => void;
} & InputZodProps<TData>;
const PegawaiSearchDialog = <TData extends FieldValues>({
	id,
	form,
	handleSearchPegawai,
}: PegawaiSearchDialogProps<TData>) => {
	const [open, setOpen] = useState(false);
	const handleSelect = (item: PegawaiList) => {
		setOpen(false);
		handleSearchPegawai(item);
	};
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={id}>Nipam</FormLabel>
					<div className="relative">
						<FormControl>
							<Input
								id={id}
								placeholder={"Masukkan Pegawai"}
								readOnly
								className={
									"cursor-not-allowed bg-secondary text-secondary-foreground"
								}
								{...field}
							/>
						</FormControl>
						<Dialog
							open={open}
							onOpenChange={() => {
								setOpen((prev) => !prev);
							}}
						>
							<DialogTrigger asChild>
								<Button
									type="submit"
									variant="ghost"
									className="absolute right-1 top-0"
									size="icon"
								>
									<SearchIcon className="text-primary" />
								</Button>
							</DialogTrigger>
							<PegawaiContent handleSelect={handleSelect} />
						</Dialog>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default PegawaiSearchDialog;
