"use client";

import { PegawaiSchema, type PegawaiDetail } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import SelectStatusPegawaiZod from "@components/form/zod/status-pegawai";
import PegawaiActionComponent from "@components/kepegawaian/data_pegawai/add/action";
import PegawaiBiodataComponent from "@components/kepegawaian/data_pegawai/add/biodata";
import PegawaiDetailComponent from "@components/kepegawaian/data_pegawai/add/detail_pegawai";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePegawaiStore } from "@store/kepegawaian/data_pegawai/pegawai";
import { useGlobalMutation } from "@store/query-store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveKepegawaian } from "./action";
import { useShallow } from "zustand/shallow";

type PegawaiFormProps = {
	biodata?: Biodata;
	pegawai?: PegawaiDetail;
};
const PegawaiForm = ({ biodata, pegawai }: PegawaiFormProps) => {
	const { defaultValues, setDefaultValues } = usePegawaiStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const form = useForm<PegawaiSchema>({
		resolver: zodResolver(PegawaiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const statusPegawai = form.watch("statusPegawai");

	const mutation = useGlobalMutation({
		mutationFunction: saveKepegawaian,
		queryKeys: [["data-pegawai", "data-biodata"]],
		redirectTo: "/kepegawaian/data_pegawai",
	});

	const onSubmit = (values: PegawaiSchema) => {
		Object.assign(values, {
			statusKerja: "KARYAWAN_AKTIF",
		});
		mutation.mutate(values);
	};

	useEffect(
		() => setDefaultValues(pegawai, biodata),
		[setDefaultValues, pegawai, biodata],
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<SelectStatusPegawaiZod
					id="statusPegawai"
					label="Status Pegawai"
					form={form}
				/>
				{statusPegawai !== "NON_PEGAWAI" ? (
					<PegawaiDetailComponent form={form} />
				) : null}

				<PegawaiBiodataComponent form={form} />

				<PegawaiActionComponent pending={mutation.isPending} />
			</form>
		</Form>
	);
};

export default PegawaiForm;
