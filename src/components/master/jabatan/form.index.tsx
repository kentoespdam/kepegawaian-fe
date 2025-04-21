"use client";

import { type Jabatan, JabatanSchema } from "@_types/master/jabatan";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectLevelZod from "@components/form/zod/level";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJabatanStore } from "@store/master/jabatan";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveJabatan } from "./action";

const JabatanFormComponent = ({ data }: { data?: Jabatan }) => {
	console.log(data);
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const callbackUrl = search.get("callback")
		? atob(search.get("callback") as string)
		: "";
	const router = useRouter();

	const { defaultValues, setDefaultValues } = useJabatanStore((state) => ({
		defaultValues: state.defaultValues,
		setDefaultValues: state.setDefaultValues,
	}));

	const form = useForm<JabatanSchema>({
		resolver: zodResolver(JabatanSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveJabatan,
		queryKeys: [["organisasi", search.toString()]],
		redirectTo: `/master/jabatan?${callbackUrl}`,
	});

	const onSubmit = (values: JabatanSchema) => {
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
				<SelectOrganisasiZod id="organisasiId" label="Organisasi" form={form} />
				<SelectJabatanZod id="parentId" label="Parent Jabatan" form={form} />
				<SelectLevelZod id="levelId" label="Level" form={form} />
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

export default JabatanFormComponent;
