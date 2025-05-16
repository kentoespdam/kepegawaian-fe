import type { PegawaiList } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@components/ui/dialog";
import Fieldset from "@components/ui/fieldset";
import { getListData } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";
import { type Dispatch, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { TerminasiFormProps } from "./form.index";

import { Button } from "@components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import { usePathname, useRouter } from "next/navigation";

interface PegawaiContentProps extends TerminasiFormProps {
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}
const PegawaiContent = ({ setOpen }: PegawaiContentProps) => {
	const [search, setSearch] = useState("");
	const pathname = usePathname();
	const { replace } = useRouter();

	const query = useQuery({
		queryKey: ["pegawai-list", search],
		queryFn: async () => {
			const result = await getListData<PegawaiList>({
				path: "pegawai",
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

	const handleSelect = (item: PegawaiList) => {
		setOpen(false);
		replace(`${pathname}?id=${item.id}`);
	};

	return (
		<DialogContent className="md:max-w-[700px] lg:max-w-[900px] sm:max-w-[425px]">
			<DialogHeader>Cari Penandatangan</DialogHeader>
			<div>
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

const DetailPegawaiTerminasiForm = ({ form, isEdit }: TerminasiFormProps) => {
	const [open, setOpen] = useState(false);
	return (
		<Fieldset title="Detail Pegawai">
			<div className="grid gap-2 grid-cols-2">
				<div className="w-full grid grid-cols-6 justify-between gap-2">
					<InputZod
						type="number"
						id="pegawaiId"
						label="Pegawai ID"
						form={form}
						className="hidden"
					/>
					<InputZod
						id="nipam"
						label="NIPAM"
						form={form}
						className="col-span-4 sm:cols-span-4 md:col-span-3 lg:col-span-5 xl:col-span-5"
						disabled
					/>
					<div className="pt-8 text-right">
						<Dialog
							open={open}
							onOpenChange={() => {
								if (isEdit) return;
								setOpen((prev) => !prev);
							}}
						>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									aria-expanded={open}
									disabled={isEdit}
								>
									CARI
								</Button>
							</DialogTrigger>
							<PegawaiContent setOpen={setOpen} form={form} />
						</Dialog>
					</div>
				</div>
				<InputZod id="nama" label="Nama Pegawai" form={form} disabled />
				{form.getValues("nipam")?.startsWith("KO-") ? null : (
					<>
						<InputZod
							type="number"
							id="golonganId"
							label="Golongan"
							form={form}
							className="hidden"
						/>
						<InputZod id="namaGolongan" label="Golongan" form={form} disabled />
					</>
				)}
				<InputZod
					id="organisasiId"
					label="Unit Kerja"
					form={form}
					className="hidden"
				/>
				<InputZod id="namaOrganisasi" label="Unit Kerja" form={form} disabled />
				<InputZod
					id="jabatanId"
					label="Jabatan"
					form={form}
					className="hidden"
				/>
				<InputZod id="namaJabatan" label="Jabatan" form={form} disabled />
			</div>
		</Fieldset>
	);
};

export default DetailPegawaiTerminasiForm;
