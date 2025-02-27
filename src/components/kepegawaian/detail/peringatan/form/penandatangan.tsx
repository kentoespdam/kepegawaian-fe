import type { PegawaiList } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
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
import { getListData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useState, type Dispatch } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { SpFormProps } from "./form.index";

interface PegawaiContentProps extends SpFormProps {
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}
const PegawaiContent = ({ form, setOpen }: PegawaiContentProps) => {
	const [search, setSearch] = useState("");
	const [value, setValue] = useState("");

	const query = useQuery({
		queryKey: ["pegawai-list", search],
		queryFn: async () => {
			const result = await getListData<PegawaiList>({
				path: "pegawai",
				searchParams: search,
				isRoot: true,
			});
			console.log(result);

			return result;
		},
		enabled: !!search && search.length >= 3,
	});

	const handleChange = useDebouncedCallback((e: string) => {
		if (e.length >= 3) {
			setSearch(`nipam=${e}&nama=${e}`);
		}
	}, 500);

	const handleSelect = (item: PegawaiList) => {
		setOpen(false);
		form.setValue("penandaTangan", item.nama);
		form.setValue("jabatanPenandaTangan", item.jabatan.nama);
	};

	return (
		<DialogContent className="md:max-w-[700px] lg:max-w-[900px] sm:max-w-[425px]">
			<DialogHeader>Cari Penandatangan</DialogHeader>
			<Command>
				<CommandInput
					placeholder="Ketik NIPAM / Nama"
					onValueChange={handleChange}
				/>
				{/* <CommandEmpty>No user found.</CommandEmpty> */}
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
									<div className="flex flex-row justify-around gap-2">
										<div className="w-28">[{item.nipam}]</div>
										<div className="w-60">{item.nama}</div>
										<div>({item.jabatan.nama})</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					) : (
						<CommandEmpty>No user found.</CommandEmpty>
					)}
				</CommandList>
			</Command>
		</DialogContent>
	);
};

const PenandaTanganSpForm = ({ form }: SpFormProps) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="grid grid-cols-2 gap-2 items-top align-top sm:grid-cols-1">
				<div className="col-span-6 grid grid-cols-2 gap-2 sm:grid-cols-1 sm:col-span-1 md:grid-cols-2 md:col-span-6 lg:grid-cols-2 lg:col-span-6">
					<InputZod
						id="penandaTangan"
						label="Penanda Tangan"
						form={form}
						readonly
					/>
					<div className="grid grid-cols-6 justify-between gap-2">
						<InputZod
							id="jabatanPenandaTangan"
							label="Jabatan"
							form={form}
							readonly
							className="col-span-5"
						/>
						<div className="pt-8 text-right">
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<Button variant="outline" aria-expanded={open}>
										CARI
									</Button>
								</DialogTrigger>
								<PegawaiContent setOpen={setOpen} form={form} />
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PenandaTanganSpForm;
