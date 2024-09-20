"use client";

import { RiwayatMutasiSchema } from "@_types/kepegawaian/riwayat-mutasi";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";
import { saveRiwayatMutasi } from "../action";
import RiwayatMutasiFormAction from "../button/form-action";
import MutasiGolonganForm from "./mutasi_golongan";
import MutasiJabatanForm from "./mutasi_jabatan";
import MutasiSkForm from "./mutasi_sk";
import MutasiPegawaiForm from "./pegawai";
import TextAreaZod from "@components/form/zod/textarea";

export interface MutasiFormProps {
	form: UseFormReturn<RiwayatMutasiSchema>;
}

const RiwayatMutasiFormComponent = (props: { pegawaiId: number }) => {
	const { defaultValues, jenisMutasi } = useRiwayatMutasiStore((state) => ({
		defaultValues: state.defaultValues,
		open: state.open,
		setOpen: state.setOpen,
		jenisMutasi: state.jenisMutasi,
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
		redirectTo: `/kepegawaian/detail/mutasi/${props.pegawaiId}`,
	});

	const onSubmit = (values: RiwayatMutasiSchema) => {
		mutation.mutate(values);
		// console.log(values);
	};

	return (
		<div className="h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2 pl-4 pr-2 pb-4">
						<InputZod type="hidden" id="id" label="ID" form={form} />
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
							<MutasiJabatanForm form={form} />
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
