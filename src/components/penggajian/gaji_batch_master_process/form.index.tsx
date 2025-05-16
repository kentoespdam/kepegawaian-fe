"use client";

import { GajiBatchMasterProsesSchema } from "@_types/penggajian/gaji_batch_master_proses";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import SelectJenisGajiZod from "@components/form/zod/jenis_gaji";
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
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveGajiBatchMasterProses } from "./action";

interface GajiBatchMasterProsesFormProps {
	qKey: (string | number | undefined)[];
}
const GajiBatchMasterProsesForm = (props: GajiBatchMasterProsesFormProps) => {
	const { batchMasterId, defaultValues, openForm, setOpenForm } =
		useGajiBatchMasterProsesStore(
			useShallow((state) => ({
				batchMasterId: state.batchMasterId,
				defaultValues: state.defaultValues,
				openForm: state.openForm,
				setOpenForm: state.setOpenForm,
			})),
		);

	const form = useForm<GajiBatchMasterProsesSchema>({
		resolver: zodResolver(GajiBatchMasterProsesSchema),
		defaultValues: defaultValues,
		values: {
			batchMasterId: batchMasterId ?? 0,
			nama: "",
			jenisGaji: "POTONGAN",
			nilai: 0,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveGajiBatchMasterProses,
		queryKeys: [props.qKey, ["gaji_batch_master_proses", batchMasterId]],
		actHandler: () => {
			setOpenForm(false);
		},
	});

	const onSubmit = (data: GajiBatchMasterProsesSchema) => {
		mutation.mutate(data);
	};

	const cancelHandler = () => {
		form.reset();
		setOpenForm(false);
	};

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tambah Komponen Gaji</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<InputZod id="nama" label="Nama" form={form} />
						<SelectJenisGajiZod id="jenisGaji" label="Jenis Gaji" form={form} />
						<InputZod id="nilai" label="Nilai" type="number" form={form} />
						<DialogFooter>
							<TooltipBuilder text="Save" delayDuration={100}>
								<LoadingButtonClient
									pending={mutation.isPending}
									type="submit"
									title="Save"
									icon={<SaveIcon />}
								/>
							</TooltipBuilder>
							<TooltipBuilder text="Cancel" delayDuration={100}>
								<Button
									type="reset"
									onClick={cancelHandler}
									variant="destructive"
									className="flex gap-2"
								>
									<XCircleIcon /> <span>Cancel</span>
								</Button>
							</TooltipBuilder>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default GajiBatchMasterProsesForm;
