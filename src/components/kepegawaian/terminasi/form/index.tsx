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
import { saveRiwayatTerminasi } from "../action";
import TerminasiAction from "../button/form-action";
import DetailTerminasiForm from "./detail";
import DetailPegawaiTerminasiForm from "./pegawai";
import { useEffect } from "react";

export interface TerminasiFormProps {
	form: UseFormReturn<RiwayatTerminasiSchema>;
	defaultValues?: RiwayatTerminasiSchema;
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
	const onSubmit = (data: RiwayatTerminasiSchema) => mutation.mutate(data);

	useEffect(() => {
		setDefaultValues(pegawai, data);
	}, [setDefaultValues, pegawai, data]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid gap-2"
			>
				<DetailPegawaiTerminasiForm form={form} />
				<DetailTerminasiForm form={form} />
				<TerminasiAction form={form} isPending={mutation.isPending} />
			</form>
		</Form>
	);
};

export default TerminasiFormComponent;
