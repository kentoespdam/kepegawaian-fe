"use client";

import type { Profesi } from "@_types/master/profesi";
import { ProfesiSchema } from "@_types/master/profesi";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import SelectGradeZod from "@components/form/zod/grade";
import InputZod from "@components/form/zod/input";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import TextAreaZod from "@components/form/zod/textarea";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfesiStore } from "@store/master/profesi";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveProfesi } from "./action";
interface ProfesiFormComponentProps {
	data?: Profesi;
}
const ProfesiFormComponent = ({ data }: ProfesiFormComponentProps) => {
	const router = useRouter();
	const { defaultValues, setDefaultValues } = useProfesiStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const form = useForm<ProfesiSchema>({
		resolver: zodResolver(ProfesiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfesi,
		queryKeys: [["profesi"]],
		redirectTo: "/master/profesi",
	});

	const onSubmit = (values: ProfesiSchema) => {
		// console.dir(values, { depth: 2 })
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
				<SelectOrganisasiZod id="organisasiId" label="Unit Kerja" form={form} />
				<SelectJabatanZod id="jabatanId" label="Jabatan" form={form} />
				<SelectGradeZod id="gradeId" label="Grade" form={form} />
				<InputZod id="nama" label="Nama" form={form} />
				<TextAreaZod id="detail" label="Detail" form={form} />
				<TextAreaZod id="resiko" label="Resiko" form={form} />
				<div className="mt-2 flex gap-2 justify-end">
					<LoadingButtonClient
						pending={mutation.isPending}
						type="submit"
						title="Save"
						icon={<SaveIcon />}
					/>
					<Button type="reset" variant="destructive" onClick={cancelHandler}>
						Batal
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProfesiFormComponent;
