"use client";
import { LampiranSkSchema } from "@_types/kepegawaian/lampiran_sk";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
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
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { saveLampiranSk } from "../action";
import InputZod from "@components/form/zod/input";
import InputFileZod from "@components/form/zod/file";
import TextAreaZod from "@components/form/zod/textarea";

type LampiranSkFormProps = {
	savePath: string;
	rootKey: string;
};
const LampiranSkForm = (props: LampiranSkFormProps) => {
	const { jenisSk, refId, openLampiranForm, setOpenLampiranForm } =
		useLampiranSkStore((state) => ({
			jenisSk: state.ref,
			refId: state.refId,
			openLampiranForm: state.openLampiranForm,
			setOpenLampiranForm: state.setOpenLampiranForm,
		}));

	const form = useForm<LampiranSkSchema>({
		resolver: zodResolver(LampiranSkSchema),
		defaultValues: {
			id: 0,
			ref: jenisSk,
			refId: refId,
			notes: "",
		},
		values: {
			id: 0,
			ref: jenisSk,
			refId: refId,
			notes: "",
		},
	});

	const fileRef = form.register("fileName");

	const mutation = useGlobalMutation({
		mutationFunction: saveLampiranSk,
		queryKeys: [[props.rootKey, jenisSk, refId]],
		actHandler: () => setOpenLampiranForm(false),
	});

	const handleSubmit = (data: LampiranSkSchema) => {
		const formData = new FormData();
		formData.set("fileName", data.fileName[0], data.fileName[0].name);

		for (const key in data) {
			if (key === "fileName") continue;
			formData.set(key, data[key as keyof LampiranSkSchema]);
		}
		mutation.mutate({
			path: props.savePath,
			formData: formData,
		});
	};

	return (
		<Dialog open={openLampiranForm} onOpenChange={setOpenLampiranForm}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Tambah Lampiran
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod type="hidden" id="id" label="ID" form={form} />
							<InputZod type="hidden" id="ref" label="Jenis SK" form={form} />
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

export default LampiranSkForm;
