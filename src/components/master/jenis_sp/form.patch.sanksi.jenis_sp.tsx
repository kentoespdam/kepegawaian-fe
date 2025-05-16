"use client";

import { PatchSanksiJenisSpSchema } from "@_types/master/sanksi";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import SelectSanksiZod from "@components/form/zod/sanksi";
import { Button } from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { patchSanksiJenisSp } from "../sanksi/action";

interface PatchSanksiJenisSpDialogProps {
	jenisSpId: number;
	qKey: string[];
	setOpenSanksiForm: (val: boolean) => void;
}
const PatchSanksiJenisSp = ({
	jenisSpId,
	qKey,
	setOpenSanksiForm,
}: PatchSanksiJenisSpDialogProps) => {
	const form = useForm<PatchSanksiJenisSpSchema>({
		resolver: zodResolver(PatchSanksiJenisSpSchema),
		defaultValues: {
			id: 0,
			jenisSpId: jenisSpId,
		},
		values: {
			id: 0,
			jenisSpId: jenisSpId,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: patchSanksiJenisSp,
		queryKeys: [qKey],
		actHandler: () => {
			onReset();
		},
	});

	const onSubmit = (data: PatchSanksiJenisSpSchema) => {
		mutation.mutate(data);
	};

	const onReset = () => {
		form.reset();
		setOpenSanksiForm(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
				<div className="grid gap-2">
					<InputZod
						id="jenisSpId"
						label="jenisSpId"
						form={form}
						readonly
						className="hidden"
					/>
					<SelectSanksiZod
						id="id"
						label="Sanksi"
						form={form}
						notJenisSpId={jenisSpId}
					/>
				</div>
				<DialogFooter className="mt-2">
					<LoadingButtonClient
						pending={mutation.isPending}
						type="submit"
						title="Save"
						icon={<SaveIcon />}
					/>
					<Button type="reset" variant="destructive" onClick={onReset}>
						<XCircleIcon className="mr-2" />
						<span>Batal</span>
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default PatchSanksiJenisSp;
