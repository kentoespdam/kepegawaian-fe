"use client";

import {
	RiwayatMutasiSchema,
	type RiwayatMutasi,
} from "@_types/kepegawaian/riwayat-mutasi";
import type { Pegawai } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
import TextAreaZod from "@components/form/zod/textarea";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { saveRiwayatMutasi } from "../action";
import RiwayatMutasiFormAction from "../button/form-action";
import MutasiGolonganForm from "./mutasi_golongan";
import MutasiJabatanForm from "./mutasi_jabatan";
import MutasiSkForm from "./mutasi_sk";
import MutasiPegawaiForm from "./pegawai";

export interface MutasiFormProps {
	form: UseFormReturn<RiwayatMutasiSchema>;
	defaultValues?: RiwayatMutasiSchema;
}

type RiwayatMutasiFormComponentProps = {
	pegawai: Pegawai;
	data?: RiwayatMutasi;
};

const RiwayatMutasiFormComponent = (props: RiwayatMutasiFormComponentProps) => {
	const { pegawai, data: riwayatMutasi } = props;
	const { defaultValues, setDefaultValues, jenisMutasi, setJenisMutasi } =
		useRiwayatMutasiStore((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
			jenisMutasi: state.jenisMutasi,
			setJenisMutasi: state.setJenisMutasi,
		}));

	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const form = useForm<RiwayatMutasiSchema>({
		resolver: zodResolver(RiwayatMutasiSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRiwayatMutasi,
		queryKeys: [["riwayat-mutasi", defaultValues.pegawaiId, search.toString()]],
		redirectTo: `/kepegawaian/detail/mutasi/${pegawai.id}`,
	});

	const onSubmit = (values: RiwayatMutasiSchema) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		setDefaultValues(pegawai, riwayatMutasi);

		if (riwayatMutasi) {
			const currentJenisMutasi = { id: riwayatMutasi?.jenisMutasi, nama: "" };
			setJenisMutasi(currentJenisMutasi);
		}
	}, [setDefaultValues, setJenisMutasi, pegawai, riwayatMutasi]);

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
						<MutasiPegawaiForm form={form} />
						<MutasiSkForm form={form} />
						{jenisMutasi &&
						["MUTASI_GOLONGAN", "MUTASI_GAJI", "MUTASI_GAJI_BERKALA"].includes(
							jenisMutasi.id,
						) ? (
							<MutasiGolonganForm form={form} />
						) : null}
						{jenisMutasi &&
						["MUTASI_LOKER", "MUTASI_JABATAN"].includes(jenisMutasi.id) ? (
							<MutasiJabatanForm form={form} defaultValues={defaultValues} />
						) : null}
						<TextAreaZod id="notes" label="Notes" form={form} />
						<RiwayatMutasiFormAction
							form={form}
							isPending={mutation.isPending}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RiwayatMutasiFormComponent;
