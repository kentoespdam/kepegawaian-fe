import { type ProfilGaji, ProfilGajiSchema } from "@_types/penggajian/profil";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import TextAreaZod from "@components/form/zod/textarea";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { getDataById } from "@helpers/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfilGajiStore } from "@store/penggajian/profil";
import { useGlobalMutation } from "@store/query-store";
import { useQuery } from "@tanstack/react-query";
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveProfilGaji } from "./action";

const ProfilGajiFormComponent = () => {
	const {
		profilGajiId,
		setProfilGajiId,
		defaultValues,
		showForm,
		setShowForm,
	} = useProfilGajiStore(
		useShallow((state) => ({
			profilGajiId: state.profilGajiId,
			setProfilGajiId: state.setProfilGajiId,
			defaultValues: state.defaultValues,
			showForm: state.showForm,
			setShowForm: state.setShowForm,
		})),
	);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [["profil_gaji", profilGajiId]],
		queryFn: async () =>
			await getDataById<ProfilGaji>({
				path: "penggajian/profil",
				id: profilGajiId,
				isRoot: true,
			}),
	});

	const form = useForm<ProfilGajiSchema>({
		resolver: zodResolver(ProfilGajiSchema),
		defaultValues: defaultValues,
		values: {
			id: data?.id ?? 0,
			nama: data?.nama ?? "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilGaji,
		queryKeys: [["profil_gaji"]],
		actHandler: () => {
			setProfilGajiId(0);
			setShowForm(false);
		},
	});

	const onSubmit = (data: ProfilGajiSchema) => {
		mutation.mutate(data);
	};

	const cancelHandler = () => {
		form.reset();
		setProfilGajiId(0);
		setShowForm(false);
	};

	return (
		<Dialog open={showForm} onOpenChange={setShowForm}>
			<DialogContent>
				{isLoading || isFetching ? (
					<>Loading....</>
				) : (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<InputZod id="id" label="ID" form={form} className="hidden" />
							<TextAreaZod id="nama" label="Nama" form={form} />
							<div className="mt-2 flex gap-2 justify-end">
								<TooltipBuilder text="Save" delayDuration={100}>
									<LoadingButtonClient
										pending={mutation.isPending}
										type="submit"
										variant="ghost"
										size="icon"
										icon={<SaveIcon className="text-primary" />}
									/>
								</TooltipBuilder>
								<TooltipBuilder text="Cancel" delayDuration={100}>
									<Button
										type="reset"
										variant="ghost"
										size="icon"
										onClick={cancelHandler}
									>
										<XCircleIcon className="text-destructive" />
									</Button>
								</TooltipBuilder>
							</div>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ProfilGajiFormComponent;
