"use client";

import {
	type RiwayatKontrak,
	RiwayatKontrakSchema,
} from "@_types/kepegawaian/riwayat_kontrak";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";
import { saveRiwayatKontrak } from "../action";
import KontrakPegawaiForm from "./pegawai";
import RiwayatKontrakForm from "./riwayat";
import DataKontrakForm from "./data-kontrak";
import RiwayatKontrakAction from "../button/form-action";
import { useEffect } from "react";
import type { Pegawai } from "@_types/pegawai";

export interface KontrakFormProps {
	form: UseFormReturn<RiwayatKontrakSchema>;
}

const RiwayatKontrakFormComponent = ({
	pegawaiId,
	pegawai,
	riwayatKontrak,
}: {
	pegawaiId: number;
	pegawai?: Pegawai;
	riwayatKontrak?: RiwayatKontrak;
}) => {
	const { defaultValues, setDefaultValues } = useRiwayatKontrakStore(
		(state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		}),
	);
	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const form = useForm<RiwayatKontrakSchema>({
		resolver: zodResolver(RiwayatKontrakSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRiwayatKontrak,
		queryKeys: [
			["riwayat-kontrak", pegawaiId, search.toString()],
			["pegawai", pegawaiId],
		],
		redirectTo: `/kepegawaian/detail/riwayat_kontrak/${pegawaiId}`,
	});

	const onSubmit = (values: RiwayatKontrakSchema) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		setDefaultValues(pegawai, riwayatKontrak ?? undefined);
	}, [setDefaultValues, pegawai, riwayatKontrak]);

	return (
		<div className="h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2 pb-2">
						<InputZod type="number" id="id" label="ID" form={form} className="hidden"/>
						<KontrakPegawaiForm form={form} />
						<RiwayatKontrakForm pegawaiId={pegawaiId} />
						<DataKontrakForm form={form} />
					</div>
					<RiwayatKontrakAction form={form} isPending={mutation.isPending} />
				</form>
			</Form>
		</div>
	);
};

export default RiwayatKontrakFormComponent;