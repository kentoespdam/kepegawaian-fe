import { PelatihanSchema } from "@_types/profil/pelatihan";
import { saveProfilPelatihan } from "@app/kepegawaian/pendukung/pelatihan/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import JenisPelatihanZod from "@components/form/zod/jenis-pelatihan";
import LulusZod from "@components/form/zod/lulus";
import TextAreaZod from "@components/form/zod/textarea";
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
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormPelatihanDialog = () => {
	const { defaultValues, open, setOpen } = usePelatihanStore((state) => ({
		defaultValues: state.defaultValues,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const form = useForm<PelatihanSchema>({
		resolver: zodResolver(PelatihanSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilPelatihan,
		queryKeys: [["profil-pelatihan", defaultValues.biodataId]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: PelatihanSchema) => {
		mutation.mutate(values);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Pelatihan Pegawai
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod type="hidden" id="id" label="ID" form={form} />
							<InputZod
								type="hidden"
								id="biodataId"
								label="NIK"
								form={form}
								disabled
							/>
							<JenisPelatihanZod id="jenisPelatihanId" form={form} />
							<InputZod id="nama" label="Nama" form={form} />
							<InputZod type="number" id="nilai" label="Nilai" form={form} />
							<LulusZod id="lulus" label="Lulus" form={form} />
							<DatePickerZod id="tanggalMulai" label="Tgl. Mulai" form={form} />
							<DatePickerZod
								id="tanggalSelesai"
								label="Tgl. Selesai"
								form={form}
							/>
							<TextAreaZod id="notes" label="Catatan" form={form} />
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

export default FormPelatihanDialog;
