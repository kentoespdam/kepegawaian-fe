import { KartuIdentitasSchema } from "@_types/profil/kartu_identitas";
import { saveProfilKartuIdentitas } from "@app/kepegawaian/pendukung/kartu_identitas/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import JenisKitasZod from "@components/form/zod/jenis-kitas";
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
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

const FormKartuIdentitasDialog = () => {
	const { defaultValues, open, setOpen } = useKartuIdentitasStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			open: state.open,
			setOpen: state.setOpen,
		})),
	);

	const form = useForm<KartuIdentitasSchema>({
		resolver: zodResolver(KartuIdentitasSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilKartuIdentitas,
		queryKeys: [["profil-kartu-identitas", defaultValues.nik]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: KartuIdentitasSchema) => {
		mutation.mutate(values);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Kartu Identitas
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod type="hidden" id="id" label="ID" form={form} />
							<InputZod
								type="hidden"
								id="nik"
								label="NIK"
								form={form}
								disabled
							/>
							<JenisKitasZod id="jenisKartuId" form={form} />
							<InputZod id="nomorKartu" label="Nomor Kartu" form={form} />
							<DatePickerZod
								id="tanggalExpired"
								label="Tgl. Expired"
								form={form}
							/>
							<DatePickerZod
								id="tanggalTerima"
								label="Tgl. Terima"
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

export default FormKartuIdentitasDialog;
