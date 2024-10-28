import Fieldset from "@components/ui/fieldset";
import type { TerminasiFormProps } from ".";
import InputZod from "@components/form/zod/input";
import { useState, type Dispatch } from "react";
import { useQuery } from "@tanstack/react-query";
import { getListData } from "@helpers/action";
import type { PegawaiList } from "@_types/pegawai";
import { useDebouncedCallback } from "use-debounce";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@components/ui/dialog";
import {
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "cmdk";
import { Command } from "@components/ui/command";
import { Button } from "@components/ui/button";

interface PegawaiContentProps extends TerminasiFormProps {
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
		form.setValue("nipam", item.nipam);
		form.setValue("nama", item.nama);
		form.setValue("golonganId", item.golongan.id);
		form.setValue(
			"namaGolongan",
			`${item.golongan.pangkat} -  ${item.golongan.golongan}`,
		);
		form.setValue("organisasiId", item.organisasi.id);
		form.setValue("namaOrganisasi", item.organisasi.nama);
		form.setValue("jabatanId", item.jabatan.id);
		form.setValue("namaJabatan", item.jabatan.nama);
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

const DetailPegawaiTerminasiForm = ({ form }: TerminasiFormProps) => {
	const [open, setOpen] = useState(false);
	return (
		<Fieldset title="Detail Pegawai">
			<div className="grid gap-2 grid-cols-2">
				<div className="w-full grid grid-cols-6 justify-between gap-2">
					<InputZod
						id="nipam"
						label="NIPAM"
						form={form}
						className="col-span-4 sm:cols-span-4 md:col-span-3 lg:col-span-5 xl:col-span-5"
						disabled
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
