"use client";

import { type Sanksi, SanksiSchema } from "@_types/master/sanksi";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import SelectJenisSpZod from "@components/form/zod/jenis-sp";
import YesNoZod from "@components/form/zod/yes-no";
import { Button } from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSanksiStore } from "@store/master/sanksi";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { saveSanksi } from "./action";

interface SanksiFormProps {
	qKey: string[];
	setOpenSanksiForm: (val: boolean) => void;
	sanksi?: Sanksi;
}
const SanksiForm = ({ qKey, setOpenSanksiForm, sanksi }: SanksiFormProps) => {
	const { defaultValues, setDefaultValues } = useSanksiStore(
		useShallow((state) => ({
			defaultValues: state.defaultValues,
			setDefaultValues: state.setDefaultValues,
		})),
	);
	const form = useForm<SanksiSchema>({
		resolver: zodResolver(SanksiSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const onReset = () => {
		form.reset();
		setOpenSanksiForm(false);
	};

	const mutation = useGlobalMutation({
		mutationFunction: saveSanksi,
		queryKeys: [qKey],
		actHandler: onReset,
	});

	const onSubmit = (data: SanksiSchema) => {
		mutation.mutate(data);
	};

	const isPotonganTkk = form.watch("potTkk");

	useEffect(() => {
		setDefaultValues(sanksi);
	}, [sanksi, setDefaultValues]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
				<div className="grid gap-2 scroll-auto">
					<InputZod
						id="id"
						label="id"
						form={form}
						// readonly
						// className="hidden"
					/>
					<SelectJenisSpZod id="jenisSpId" form={form} />
					<InputZod id="kode" label="Kode" form={form} />
					<InputZod id="keterangan" label="Keterangan" form={form} />
					<div className="grid grid-cols-2 gap-2">
						<YesNoZod id="potTkk" label="Potongan TKK" form={form} />
						<InputZod
							id="jmlPotTkk"
							label="Jumlah Potongan TKK (Bulan)"
							type="number"
							form={form}
							readonly={!isPotonganTkk}
						/>
						<YesNoZod
							id="isPendingPangkat"
							label="Penundaan Kenaikan Pangkat"
							form={form}
						/>
						<YesNoZod
							id="isPendingGaji"
							label="Penundaan Kenaikan Gaji"
							form={form}
						/>
						<YesNoZod id="isTurunPangkat" label="Turun Pangkat" form={form} />
						<YesNoZod id="isTurunJabatan" label="Turun Jabatan" form={form} />
						<YesNoZod
							id="isSuspension"
							label="Pemberhentian Sementara"
							form={form}
						/>
						<YesNoZod
							id="isTerminateDh"
							label="Pemberhentian dengan hormat"
							form={form}
						/>
						<YesNoZod
							id="isTerminateTh"
							label="Pemberhentian dengan tidak hormat"
							form={form}
						/>
					</div>
				</div>
				<DialogFooter className="mt-2">
					<LoadingButtonClient
						pending={mutation.isPending}
						type="submit"
						title="Save"
						icon={<SaveIcon />}
					/>
					<Button type="reset" variant="destructive" onClick={onReset}>
						<XCircleIcon className="mr-2" />
						<span>Batal</span>
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default SanksiForm;
