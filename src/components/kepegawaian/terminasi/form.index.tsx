"use client";

import {
	type RiwayatTerminasi,
	RiwayatTerminasiSchema,
} from "@_types/kepegawaian/terminasi";
import type { Pegawai } from "@_types/pegawai";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatTerminasiStore } from "@store/kepegawaian/detail/riwayat_terminasi";
import { useGlobalMutation } from "@store/query-store";
import { useForm, type UseFormReturn } from "react-hook-form";
import { saveRiwayatTerminasi } from "./action";
import TerminasiAction from "./button.form.action";
import DetailTerminasiForm from "./form.detail";
import DetailPegawaiTerminasiForm from "./dialog.form.pegawai";
import { useEffect } from "react";
import InputZod from "@components/form/zod/input";

export interface TerminasiFormProps {
	form: UseFormReturn<RiwayatTerminasiSchema>;
	defaultValues?: RiwayatTerminasiSchema;
	isEdit?: boolean;
}

interface TerminasiFormComponentProps {
	pegawai?: Pegawai;
	data?: RiwayatTerminasi;
}
const TerminasiFormComponent = ({
	pegawai,
	data,
}: TerminasiFormComponentProps) => {
	const { defaultValues, setDefaultValues } = useRiwayatTerminasiStore();
	const isEdit = !!data?.id;

	const form = useForm<RiwayatTerminasiSchema>({
		resolver: zodResolver(RiwayatTerminasiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRiwayatTerminasi,
		queryKeys: [["riwayat-terminasi", pegawai?.id]],
		redirectTo: "/kepegawaian/terminasi/terminated",
	});
	const onSubmit = (data: RiwayatTerminasiSchema) => {
		const formData = new FormData();
		if (data.fileName)
			formData.set("fileName", data.fileName[0], data.fileName[0].name);
		for (const key in data) {
			if (key === "fileName") continue;
			formData.set(key, data[key as keyof RiwayatTerminasiSchema]);
		}
		mutation.mutate(formData);
	};

	useEffect(() => {
		setDefaultValues(pegawai, data);
	}, [setDefaultValues, pegawai, data]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid gap-2"
			>
				<InputZod type="number" id="id" form={form} className="hidden" />
				<InputZod id="jenisSk" form={form} className="hidden" />
				<DetailPegawaiTerminasiForm form={form} isEdit={isEdit} />
				<DetailTerminasiForm form={form} />
				<TerminasiAction form={form} isPending={mutation.isPending} />
			</form>
		</Form>
	);
};

export default TerminasiFormComponent;
