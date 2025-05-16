import { VerifPhase2UploadSchema } from "@_types/penggajian/verif_phase2";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputFileZod from "@components/form/zod/file";
import { uploadPotongan } from "@components/penggajian/verif_phase_2/action";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";
import { useGlobalMutation } from "@store/query-store";
import { UploadIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

interface VerifPhase2UploadDialogProps {
	rootBatchId: string;
	openForm: boolean;
	setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const VerifPhase2UploadDialog = ({
	rootBatchId,
	openForm,
	setOpenForm,
}: VerifPhase2UploadDialogProps) => {
	const { batchMasterId } = useGajiBatchMasterProsesStore(
		useShallow((state) => ({
			batchMasterId: state.batchMasterId,
		})),
	);

	const form = useForm<VerifPhase2UploadSchema>({
		resolver: zodResolver(VerifPhase2UploadSchema),
		defaultValues: {
			id: rootBatchId,
			file: null,
		},
	});
	const mutation = useGlobalMutation({
		mutationFunction: uploadPotongan,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
		actHandler: () => {
			setOpenForm(false);
		},
	});

	const onSubmit = (values: VerifPhase2UploadSchema) => {
		const formData = new FormData();
		formData.set("file", values.file[0], values.file[0].name);
		formData.set("id", values.id);
		mutation.mutate(formData);
	};

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Potongan</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<InputFileZod id="file" label="File" form={form} />
						<DialogFooter>
							<LoadingButtonClient
								pending={mutation.isPending}
								type="submit"
								title="Upload"
								icon={<UploadIcon />}
							/>
							<Button
								onClick={() => setOpenForm(false)}
								type="reset"
								variant="destructive"
								className="flex gap-2"
							>
								<XIcon />
								<span>Batal</span>
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default VerifPhase2UploadDialog;
