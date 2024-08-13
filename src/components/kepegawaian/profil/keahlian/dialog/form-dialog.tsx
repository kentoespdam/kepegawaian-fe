import { KeahlianSchema } from "@_types/profil/keahlian";
import { saveProfilKeahlian } from "@app/kepegawaian/pendukung/keahlian/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import JenisKeahlianZod from "@components/form/zod/jenis-keahlian";
import KualifikasiZod from "@components/form/zod/kualifikasi";
import RadioSertifikasiZod from "@components/form/zod/sertifkasi";
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
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormKeahlianDialog = () => {
	const { defaultValues, open, setOpen } = useKeahlianStore((state) => ({
		defaultValues: state.defaultValues,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const form = useForm<KeahlianSchema>({
		resolver: zodResolver(KeahlianSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilKeahlian,
		queryKeys: [["profil-keahlian", defaultValues.biodataId]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: KeahlianSchema) => {
		mutation.mutate(values);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Keahlian Pegawai
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
							<JenisKeahlianZod id="keahlianId" form={form} />
							<KualifikasiZod
								id="kualifikasi"
								label="Kualifikasi"
								form={form}
							/>
							<RadioSertifikasiZod
								id="sertifikasi"
								label="Sertifikasi"
								form={form}
							/>
							<InputZod id="institusi" label="Institusi" form={form} />
							<InputZod type="number" id="tahun" label="Tahun" form={form} />
							<InputZod id="masaBerlaku" label="Masa Berlaku" form={form} />
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

export default FormKeahlianDialog;
