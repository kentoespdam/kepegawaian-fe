"use client";
import { PendidikanSchema } from "@_types/profil/pendidikan";
import { saveProfilPendidikan } from "@app/kepegawaian/pendukung/pendidikan/action";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import JenjangPendidikanZod from "@components/form/zod/jenjang-pendidikan";
import YesNoZod from "@components/form/zod/yes-no";
import { Button } from "@components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { Separator } from "@components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ProfilPendidikanForm = () => {
	const { defaultValues, setOpen } = usePendidikanStore((store) => ({
		defaultValues: store.defaultValues,
		setOpen: store.setOpen,
	}));
	const form = useForm<PendidikanSchema>({
		resolver: zodResolver(PendidikanSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveProfilPendidikan,
		queryKeys: [["profil-pendidikan", defaultValues.biodataId]],
	});

	useEffect(() => {
		if (mutation.isSuccess) {
			mutation.reset();
			form.reset();
			setOpen(false);
		}
	}, [mutation, form, setOpen]);

	const onSubmit = (values: PendidikanSchema) => {
		mutation.mutate(values);
	};

	return (
		<DialogContent className="p-0">
			<DialogHeader className="px-4 py-2 space-y-0">
				Data Pendidikan Pegawai
			</DialogHeader>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
						<InputZod type="hidden" id="id" label="ID" form={form} />
						<InputZod
							type="hidden"
							id="biodataId"
							label="NIK"
							form={form}
							disabled
						/>
						<InputZod
							type="hidden"
							id="biodataName"
							label="Nama"
							form={form}
							disabled
						/>
						<JenjangPendidikanZod
							id="jenjangPendidikanId"
							label="Jenjang Pendidikan"
							form={form}
						/>
						<div className="grid grid-cols-2 gap-4">
							<InputZod id="gelarDepan" label="Gelar Depan" form={form} />
							<InputZod id="gelarBelakang" label="Gelar Belakang" form={form} />
						</div>
						<InputZod id="institusi" label="Institusi" form={form} />
						<InputZod id="jurusan" label="Jurusan" form={form} />
						<InputZod id="kota" label="Kota" form={form} />
						<div className="grid grid-cols-2 gap-4">
							<InputZod
								id="tahunMasuk"
								label="Tahun Masuk"
								form={form}
								type="number"
							/>
							<InputZod
								id="tahunLulus"
								label="Tahun Lulus"
								form={form}
								type="number"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<InputZod id="gpa" label="GPA" form={form} type="float" />
							<YesNoZod id="isLatest" label="Pendidikan Terakhir" form={form} />
						</div>
					</div>
					<Separator />
					<DialogFooter className="px-4 py-2">
						<DialogClose asChild>
							<Button
								type="reset"
								variant="destructive"
								onClick={() => form.reset()}
							>
								Cancel
							</Button>
						</DialogClose>
						<LoadingButtonClient
							type="submit"
							title="Save"
							pending={mutation.isPending}
							icon={<SaveIcon />}
						/>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
};

export default ProfilPendidikanForm;
