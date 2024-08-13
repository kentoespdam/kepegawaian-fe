import { KeluargaSchema } from "@_types/profil/keluarga";
import { saveProfilKeluarga } from "@app/kepegawaian/pendukung/keluarga/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import SelectAgamaZod from "@components/form/zod/agama";
import DatePickerZod from "@components/form/zod/date-picker";
import HubunganKeluargaZod from "@components/form/zod/hubungan-keluarga";
import InputZod from "@components/form/zod/input";
import RadioJenisKelaminZod from "@components/form/zod/jenis-kelamin";
import JenjangPendidikanZod from "@components/form/zod/jenjang-pendidikan";
import SelectStatusKawinZod from "@components/form/zod/status-kawin";
import TextAreaZod from "@components/form/zod/textarea";
import YesNoZod from "@components/form/zod/yes-no";
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
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormKeluargaDialog = () => {
	const { defaultValues, open, setOpen } = useKeluargaStore((state) => ({
		defaultValues: state.defaultValues,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const form = useForm<KeluargaSchema>({
		resolver: zodResolver(KeluargaSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilKeluarga,
		queryKeys: [["profil-keluarga", defaultValues.biodataId]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: KeluargaSchema) => {
		mutation.mutate(values);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Keluarga Pegawai
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod type="hidden" id="id" label="ID" form={form} />
							<InputZod
								type="hidden"
								id="biodataId"
								label="NIK"
								form={form}
								disabled
							/>
							<InputZod id="nik" label="NIK" form={form} />
							<InputZod id="nama" label="Nama" form={form} />
							<RadioJenisKelaminZod id="jenisKelamin" form={form} />
							<SelectAgamaZod id="agama" form={form} />
							<HubunganKeluargaZod id="hubunganKeluarga" form={form} />
							<InputZod id="tempatLahir" label="Tempat Lahir" form={form} />
							<DatePickerZod
								id="tanggalLahir"
								label="Tanggal Lahir"
								form={form}
							/>
							<YesNoZod id="tanggungan" label="Tanggungan" form={form} />
							<JenjangPendidikanZod id="pendidikanId" form={form} />
							<SelectStatusKawinZod id="statusKawin" form={form} />
							<TextAreaZod id="notes" label="Notes" form={form} />
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

export default FormKeluargaDialog;
