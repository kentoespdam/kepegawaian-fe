"use client";
import {
    type JenjangPendidikan,
    JenjangPendidikanSchema,
} from "@_types/master/jenjang_pendidikan";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { saveJenjangPendidikan } from "./action";

type JenjangPendidikanFormComponentProps = {
	data?: JenjangPendidikan;
};
const JenjangPendidikanFormComponent = memo(({
	data,
}: JenjangPendidikanFormComponentProps) => {
	const { back } = useRouter();

	const defaultValues = useMemo(() => {
		const result = data
			? {
					id: data.id,
					nama: data.nama,
					seq: data.seq,
				}
			: {
					id: 0,
					nama: "",
					seq: 0,
				};
		return result as JenjangPendidikan;
	}, [data]);

	const form = useForm<JenjangPendidikanSchema>({
		resolver: zodResolver(JenjangPendidikanSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveJenjangPendidikan,
		queryKeys: [["jenjang_pendidikan", ""]],
		redirectTo: "/master/jenjang_pendidikan",
	});

	const onSubmit = useCallback(
		(value: JenjangPendidikanSchema) => {
			mutation.mutate(value);
		},
		[mutation],
	);

	const cancelHandler = useCallback(() => {
		form.reset();
		back();
	}, [form, back]);

	return (
		<Form {...form}>
			<form
				className="space-y-4 md:space-y-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<InputZod id="id" form={form} className="hidden" />
				<InputZod id="nama" label="Nama Jenjang Pendidikan" form={form} />
				<InputZod
					id="seq"
					label="Urut Jenjang Pendidikan"
					type="number"
					form={form}
				/>
				<div className="flex flex-row justify-end gap-2">
					<LoadingButtonClient
						type="submit"
						title="Save"
						pending={mutation.isPending}
						icon={<SaveIcon />}
					/>
					<Button type="reset" variant="destructive" onClick={cancelHandler}>
						Cancel
					</Button>
					<input type="hidden" name="id" value={data?.id} />
				</div>
			</form>
		</Form>
	);
});

JenjangPendidikanFormComponent.displayName = "JenjangPendidikanFormComponent";

export default JenjangPendidikanFormComponent;