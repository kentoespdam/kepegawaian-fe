"use client";
import {
	type AlasanBerhenti,
	AlasanBerhentiSchema,
} from "@_types/master/alasan_berhenti";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import TextAreaZod from "@components/form/zod/textarea";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlasanBerhentiStore } from "@store/master/alasan_berhenti";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { saveAlasanBerhenti } from "./action";
import { useEffect } from "react";

interface AlasanBerhentiFormComponentProps {
	data?: AlasanBerhenti;
}
const AlasanBerhentiFormComponent = ({
	data,
}: AlasanBerhentiFormComponentProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const router = useRouter();
	const { defaultValues, setDefaultValues } = useAlasanBerhentiStore(
		(state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		}),
	);

	const form = useForm<AlasanBerhentiSchema>({
		resolver: zodResolver(AlasanBerhentiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveAlasanBerhenti,
		queryKeys: [["alasan_berhenti", search.toString()]],
		redirectTo: "/master/alasan_berhenti",
	});

	const onSubmit = (values: AlasanBerhentiSchema) => {
		mutation.mutate(values);
	};

	const cancelHandler = () => {
		// setJenisMutasi();
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
				<InputZod id="nama" label="Nama Alasan Berhenti" form={form} />
				<TextAreaZod id="notes" label="Notes" form={form} />

				<Fieldset title="Action" clasName="p-0">
					<div className="flex justify-end gap-2 p-0">
						<LoadingButtonClient
							type="submit"
							title="Save"
							pending={mutation.isPending}
							icon={<SaveIcon />}
						/>
						<Button type="reset" variant="destructive" onClick={cancelHandler}>
							Cancel
						</Button>
					</div>
				</Fieldset>
			</form>
		</Form>
	);
};

export default AlasanBerhentiFormComponent;
