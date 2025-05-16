"use client";
import { type RumahDinas, RumahDinasSchema } from "@_types/master/rumah_dinas";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRumahDinasStore } from "@store/master/rumah_dinas";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveRumahDinas } from "./action";

interface RumahDinasFormComponentProps {
	data?: RumahDinas;
}
const RumahDinasFormComponent = ({ data }: RumahDinasFormComponentProps) => {
	const router = useRouter();
	const { defaultValues, setDefaultValues } = useRumahDinasStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);

	const form = useForm<RumahDinasSchema>({
		resolver: zodResolver(RumahDinasSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRumahDinas,
		queryKeys: [["rumah_dinas"]],
		redirectTo: "/master/rumah_dinas",
	});

	const onSubmit = (values: RumahDinasSchema) => {
		// console.dir(values, { depth: 2 })
		mutation.mutate(values);
	};

	const cancelHandler = () => {
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
				<InputZod id="id" label="ID" form={form} className="hidden" />
				<InputZod id="nama" label="Nama" form={form} />
				<InputZod type="number" id="nilai" label="Nilai" form={form} />
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

export default RumahDinasFormComponent;
