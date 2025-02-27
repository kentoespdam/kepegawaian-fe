"use client";

import {
	RiwayatSpSchema,
	type RiwayatSp,
} from "@_types/kepegawaian/riwayat-sp";
import type { Pegawai } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatSpStore } from "@store/kepegawaian/detail/riwayat_sp";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { saveRiwayatSp } from "../action";
import RiwayatSpActionButton from "../button/form-action";
import DetailSpPegawaiForm from "./data-pegawai";
import DetailSpFormComponent from "./detail-sp";

export interface SpFormProps {
	form: UseFormReturn<RiwayatSpSchema>;
	// defaultValues?: RiwayatSpSchema;
}

type RiwayatSpFormProps = {
	pegawai: Pegawai;
	data?: RiwayatSp;
};
const RiwayatSpFormComponent = ({ pegawai, data }: RiwayatSpFormProps) => {
	const { defaultValues, setDefaultValues, jenisSp, setJenisSp } =
		useRiwayatSpStore((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
			jenisSp: state.jenisSp,
			setJenisSp: state.setJenisSp,
		}));

	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const form = useForm<RiwayatSpSchema>({
		resolver: zodResolver(RiwayatSpSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRiwayatSp,
		queryKeys: [["riwayat-sp", defaultValues.pegawaiId, search.toString()]],
		redirectTo: `/kepegawaian/detail/riwayat_sp/${pegawai.id}`,
	});

	const onSubmit = (values: RiwayatSpSchema) => {
		const formData = new FormData();
		// console.log(values);
		if (values.fileName)
			formData.set("fileName", values.fileName[0], values.fileName[0].name);
		for (const key in values) {
			if (key === "fileName") continue;
			formData.set(key, values[key as keyof RiwayatSpSchema]);
		}
		mutation.mutate(formData);
	};

	useEffect(() => {
		setDefaultValues(pegawai, data);
		if (data) {
			const currentJenisSp = { id: data.jenisSp, nama: "" };
			setJenisSp(currentJenisSp);
		}
	}, [setDefaultValues, setJenisSp, pegawai, data]);

	return (
		<div className="h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2 pl-4 pr-2 pb-4">
						<InputZod
							type="number"
							id="id"
							label="ID"
							form={form}
							className="hidden"
						/>
						<DetailSpPegawaiForm form={form} />
						<DetailSpFormComponent form={form} />
						<RiwayatSpActionButton form={form} isPending={mutation.isPending} />
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RiwayatSpFormComponent;
