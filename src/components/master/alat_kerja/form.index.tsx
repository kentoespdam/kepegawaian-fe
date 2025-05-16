"use client";

import { type AlatKerja, AlatKerjaSchema } from "@_types/master/alat_kerja";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlatKerjaStore } from "@store/master/alat_kerja";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveAlatKerja } from "./action";

interface AlatKerjaFormComponentProps {
	profesiId?: number;
	data?: AlatKerja;
}
const AlatKerjaFormComponent = ({
	profesiId,
	data,
}: AlatKerjaFormComponentProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const callbackUrl = search.get("callback")
		? atob(search.get("callback") as string)
		: "";
	const router = useRouter();

	const { defaultValues, setDefaultValues } = useAlatKerjaStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const form = useForm<AlatKerjaSchema>({
		resolver: zodResolver(AlatKerjaSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveAlatKerja,
		queryKeys: [["alat-kerja"]],
		redirectTo: search.get("callback") ? callbackUrl : "/master/alat_kerja",
	});

	const onSubmit = (values: AlatKerjaSchema) => {
		mutation.mutate(values);
	};

	const cancelHandler = () => {
		form.reset();
		router.back();
	};

	useEffect(
		() => setDefaultValues({ data: data, profesiId: profesiId }),
		[setDefaultValues, data, profesiId],
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid gap-2"
			>
				<InputZod type="number" id="id" label="ID" form={form} />
				<InputZod type="number" id="profesiId" label="Profesi ID" form={form} />
				<InputZod id="nama" label="Nama Alat Kerja" form={form} />
				<div className="mt-2 flex gap-2 justify-end">
					<LoadingButtonClient
						pending={mutation.isPending}
						type="submit"
						title="Save"
						icon={<SaveIcon />}
					/>
					<Button type="reset" variant="destructive" onClick={cancelHandler}>
						Batal
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default AlatKerjaFormComponent;
