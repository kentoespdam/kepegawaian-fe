"use client";

import { JenisSpSchema } from "@_types/master/jenis_sp";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJenisSpStore } from "@store/master/jenis_sp.store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveJenisSp } from "./action";

const JenisSpFormDialog = () => {
	const {
		jenisSp,
		openJenisSpForm,
		setOpenJenisSpForm,
		defaultValues,
		setDefaultValues,
	} = useJenisSpStore(
		useShallow((state) => ({
			jenisSp: state.jenisSp,
			openJenisSpForm: state.openJenisSpForm,
			setOpenJenisSpForm: state.setOpenJenisSpForm,
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const params = useSearchParams();
	const form = useForm<JenisSpSchema>({
		resolver: zodResolver(JenisSpSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const onReset = () => {
		form.reset();
		setOpenJenisSpForm(false);
	};

	const mutation = useGlobalMutation({
		mutationFunction: saveJenisSp,
		queryKeys: [["jenis_sp", params.toString()]],
		actHandler: () => {
			onReset();
		},
	});

	const onSubmit = (values: JenisSpSchema) => {
		mutation.mutate(values);
	};

	const openChangeHandler = () => {
		form.reset();
		setOpenJenisSpForm(!openJenisSpForm);
	};

	useEffect(() => {
		if (jenisSp) setDefaultValues(jenisSp);
	}, [jenisSp, setDefaultValues]);

	return (
		<Dialog open={openJenisSpForm} onOpenChange={openChangeHandler}>
			<DialogContent>
				<DialogTitle>Add Roles</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
						<div className="grid gap-2">
							<InputZod
								id="id"
								label="ID"
								form={form}
								// readonly
								// className="hidden"
							/>
							<InputZod id="kode" label="Kode" form={form} />
							<InputZod id="nama" label="Nama" form={form} />
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
			</DialogContent>
		</Dialog>
	);
};

export default JenisSpFormDialog;
