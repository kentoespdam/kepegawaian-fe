"use client";
import { type PegawaiDetail, ProfilPribadiSchema } from "@_types/pegawai";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import Fieldset from "@components/ui/fieldset";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { patchProfilPribadi } from "./action";
import BiodataComponent from "./bio";
import ProfilKepegawaianComponent from "./kepegawaian";

interface EditProfilPribadiFormProps {
	open: boolean;
	pegawai?: PegawaiDetail;
	isUser?: boolean;
}
const EditProfilPribadiFormComponent = ({
	pegawai,
	open,
	isUser = false,
}: EditProfilPribadiFormProps) => {
	const params = useSearchParams();
	const callback = params.get("callbackUrl")
		? atob(params.get("callbackUrl") as string)
		: "";

	const { defaultValues, setDefaultValues, setOpen } = useProfilPribadiStore(
		(state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
			setOpen: state.setOpen,
		}),
	);

	const form = useForm<ProfilPribadiSchema>({
		resolver: zodResolver(ProfilPribadiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: patchProfilPribadi,
		queryKeys: [["data_pegawai", callback]],
		actHandler: () => {
			cancelHandler();
		},
	});

	const submitHandler = (values: ProfilPribadiSchema) => {
		// console.dir(values, { depth: 2 })
		mutation.mutate(values);
	};

	const cancelHandler = () => {
		form.reset();
		setOpen(false);
	};

	useEffect(() => setDefaultValues(pegawai), [setDefaultValues, pegawai]);

	return (
		<Dialog open={open} onOpenChange={cancelHandler}>
			<DialogContent className="min-w-[80%] max-h-screen">
				<DialogHeader>
					<DialogTitle>Edit Profil Karyawan</DialogTitle>
				</DialogHeader>
				<div className="h-full overflow-auto">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submitHandler)}
							className="grid gap-2"
						>
							<InputZod id="id" label="ID" form={form} className="hidden" />
							<BiodataComponent form={form} />
							{isUser ? null : (
								<>
									<ProfilKepegawaianComponent form={form} />
									<Fieldset title="Data Absesnsi">
										<InputZod
											type="number"
											id="absensiId"
											label="ID Absensi"
											form={form}
										/>
									</Fieldset>
								</>
							)}
							<div className="mt-2 flex gap-2 justify-end">
								<TooltipBuilder text="Save" delayDuration={100}>
									<LoadingButtonClient
										pending={mutation.isPending}
										type="submit"
										title="Save"
										icon={<SaveIcon />}
									/>
								</TooltipBuilder>
								<TooltipBuilder
									text="Cancel"
									delayDuration={100}
									className="bg-destructive text-destructive-foreground"
								>
									<Button
										type="reset"
										onClick={cancelHandler}
										className="bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
									>
										Batal
									</Button>
								</TooltipBuilder>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfilPribadiFormComponent;
