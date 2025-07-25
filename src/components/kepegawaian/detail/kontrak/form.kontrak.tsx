"use client";

import {
	type RiwayatKontrak,
	RiwayatKontrakSchema,
} from "@_types/kepegawaian/riwayat_kontrak";
import type { PegawaiDetail } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { encodeId } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { saveRiwayatKontrak } from "./action";
import RiwayatKontrakAction from "./button.form.action";
import DataKontrakForm from "./form.kontrak.data";
import KontrakPegawaiForm from "./form.kontrak.pegawai";
import RiwayatKontrakForm from "./form.kontrak.riwayat";

export interface KontrakFormProps {
	form: UseFormReturn<RiwayatKontrakSchema>;
}

const RiwayatKontrakFormComponent = ({
	pegawai,
	riwayatKontrak,
}: {
	pegawai: PegawaiDetail;
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
			["riwayat-kontrak", pegawai.id, search.toString()],
			["pegawai", pegawai.id],
		],
		redirectTo: `/kepegawaian/detail/riwayat_kontrak/${encodeId(pegawai.id)}`,
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
				<form name="form" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2 pb-2">
						<InputZod
							type="number"
							id="id"
							label="ID"
							form={form}
							className="hidden"
						/>
						<KontrakPegawaiForm form={form} />
						<RiwayatKontrakForm
							pegawaiId={pegawai.id}
							riwayatKontrak={riwayatKontrak}
						/>
						<DataKontrakForm form={form} />
					</div>
					<RiwayatKontrakAction form={form} isPending={mutation.isPending} />
				</form>
			</Form>
		</div>
	);
};

export default RiwayatKontrakFormComponent;
