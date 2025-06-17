"use client";
import { PengalamanKerjaSchema } from "@_types/profil/pengalaman_kerja";
import { savePengalamanKerja } from "@app/kepegawaian/pendukung/pengalaman_kerja/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { Separator } from "@components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormProfilPengalamanKerjaDialog = () => {
	const path = usePathname();
	const nik = path.split("/")[4];
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const { defaultValues, open, setOpen } = usePengalamanKerjaStore();

	const form = useForm<PengalamanKerjaSchema>({
		resolver: zodResolver(PengalamanKerjaSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: savePengalamanKerja,
		queryKeys: [["pengalaman-kerja", nik, search.toString()]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: PengalamanKerjaSchema) => {
		mutation.mutate(values);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Pengalaman Kerja
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-y-auto pl-4 pr-2 pb-4">
							<InputZod id="id" label="Id" form={form} />
							<InputZod
								// type="hidden"
								id="biodataId"
								label="NIK"
								form={form}
								disabled
							/>
							<InputZod id="namaPerusahaan" label="Perusahaan" form={form} />
							<InputZod
								id="typePerusahaan"
								label="Jenis Perusahaan"
								form={form}
							/>
							<InputZod id="jabatan" label="Jabatan" form={form} />
							<InputZod id="lokasi" label="Lokasi" form={form} />
							<DatePickerZod
								id="tanggalMasuk"
								label="Tanggal Masuk"
								form={form}
							/>
							<DatePickerZod
								id="tanggalKeluar"
								label="Tanggal Keluar"
								form={form}
							/>
							<InputZod id="notes" label="Notes" form={form} />
						</div>

						<Separator />
						<DialogFooter className="px-4 py-2">
							<DialogClose asChild>
								<Button
									type="reset"
									variant="destructive"
									onClick={() => form.reset()}
								>
									Cancel
								</Button>
							</DialogClose>
							<LoadingButtonClient
								type="submit"
								title="Save"
								pending={mutation.isPending}
								icon={<SaveIcon />}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default FormProfilPengalamanKerjaDialog;
