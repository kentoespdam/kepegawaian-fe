import type { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import { LampiranProfilSchema } from "@_types/profil/lampiran";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputFileZod from "@components/form/zod/file";
import InputZod from "@components/form/zod/input";
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
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveLampiranProfil } from "../action";

interface LampiranFormDialogProps {
	savePath: string;
	rootKey: string;
	jenis: JenisLampiranProfil;
}
const LampiranFormDialog = (props: LampiranFormDialogProps) => {
	const { refId, openLampiranForm, setOpenLampiranForm } =
		useLampiranProfilStore((state) => ({
			refId: state.refId,
			openLampiranForm: state.openLampiranForm,
			setOpenLampiranForm: state.setOpenLampiranForm,
		}));

	const form = useForm<LampiranProfilSchema>({
		resolver: zodResolver(LampiranProfilSchema),
		values: {
			id: 0,
			ref: props.jenis,
			refId: refId,
			notes: "",
		},
	});

	const fileRef = form.register("fileName");

	const mutation = useGlobalMutation({
		mutationFunction: saveLampiranProfil,
		queryKeys: [[props.rootKey, refId]],
	});

	const handleSubmit = (data: LampiranProfilSchema) => {
		const formData = new FormData();
		formData.set("fileName", data.fileName[0], data.fileName[0].name);

		for (const key in data) {
			if (key === "fileName") continue;
			formData.set(key, data[key as keyof LampiranProfilSchema]);
		}
		mutation.mutate({
			path: `${props.savePath}/lampiran`,
			formData: formData,
		});
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			setOpenLampiranForm(false);
		}
	}, [mutation.isSuccess, setOpenLampiranForm]);

	return (
		<Dialog open={openLampiranForm} onOpenChange={setOpenLampiranForm}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Tambah Lampiran
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod type="hidden" id="id" label="ID" form={form} />
							<InputZod type="hidden" id="ref" label="Ref" form={form} />
							<InputZod type="hidden" id="refId" label="Ref ID" form={form} />
							<InputFileZod
								id="fileName"
								label="Lampiran"
								form={form}
								fileRef={fileRef}
							/>
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
								pending={false}
								icon={<SaveIcon />}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default LampiranFormDialog;
