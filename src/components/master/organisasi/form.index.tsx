"use client";

import { OrganisasiSchema, type Organisasi } from "@_types/master/organisasi";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import SelectLevelZod from "@components/form/zod/level";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganisasiStore } from "@store/master/organisasi";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveOrganisasi } from "./action";
import TooltipBuilder from "@components/builder/tooltip";
import { useShallow } from "zustand/shallow";

interface OrganisasiFormComponentProps {
	data?: Organisasi;
}

const OrganisasiFormComponent = ({ data }: OrganisasiFormComponentProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const callbackUrl = search.get("callback")
		? atob(search.get("callback") as string)
		: "";
	const router = useRouter();

	const { defaultValues, setDefaultValues } = useOrganisasiStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const form = useForm<OrganisasiSchema>({
		resolver: zodResolver(OrganisasiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveOrganisasi,
		queryKeys: [["organisasi", search.toString()]],
		redirectTo: `/master/organisasi?${callbackUrl}`,
	});

	const onSubmit = (values: OrganisasiSchema) => {
		mutation.mutate(values);
	};

	const cancelHandler = () => {
		form.reset();
		router.back();
	};

	useEffect(() => setDefaultValues(data), [setDefaultValues, data]);
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid gap-2"
			>
				<SelectOrganisasiZod
					id="parentId"
					label="Organisasi Induk"
					form={form}
				/>
				<SelectLevelZod id="levelOrganisasi" label="Level" form={form} />
				<InputZod id="kode" label="Kode" form={form} />
				<InputZod id="nama" label="Nama" form={form} />
				<div className="mt-2 flex gap-2 justify-end">
					<TooltipBuilder text="Simpan" delayDuration={100}>
						<LoadingButtonClient
							pending={mutation.isPending}
							type="submit"
							title="Save"
							icon={<SaveIcon />}
						/>
					</TooltipBuilder>
					<TooltipBuilder
						text="Batal"
						delayDuration={100}
						className="bg-destructive text-destructive-foreground"
					>
						<Button type="reset" variant="destructive" onClick={cancelHandler}>
							Batal
						</Button>
					</TooltipBuilder>
				</div>
			</form>
		</Form>
	);
};

export default OrganisasiFormComponent;
