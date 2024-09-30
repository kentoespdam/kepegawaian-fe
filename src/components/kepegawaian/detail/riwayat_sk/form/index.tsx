"use client";
import { RiwayatSkSchema } from "@_types/kepegawaian/riwayat_sk";
import type { DetailDasarGaji } from "@_types/penggajian/detail_dasar_gaji";
import ActionButtonZod from "@components/form/zod/action-button";
import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import SelectJenisSkZod from "@components/form/zod/jenis-sk";
import TextAreaZod from "@components/form/zod/textarea";
import YesNoZod from "@components/form/zod/yes-no";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { Separator } from "@components/ui/separator";
import { globalGetData } from "@helpers/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { saveRiwayatSk } from "../action";

const RiwayatSkFormComponent = () => {
	const { defaultValues, open, setOpen } = useRiwayatSkStore((state) => ({
		defaultValues: state.defaultValues,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const form = useForm<RiwayatSkSchema>({
		resolver: zodResolver(RiwayatSkSchema),
		defaultValues,
		values: defaultValues,
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRiwayatSk,
		queryKeys: [["riwayat-sk", defaultValues.pegawaiId, search.toString()]],
		actHandler: () => {
			mutation.reset();
			form.reset();
			setOpen(false);
		},
	});

	const onSubmit = (values: RiwayatSkSchema) => {
		mutation.mutate(values);
	};

	const cariGaji = async () => {
		const data = await globalGetData<DetailDasarGaji>({
			path: `penggajian/detail-dasar-gaji/${form.getValues().golonganId}/${form.getValues().mkgTahun}`,
		});
		form.setValue("gajiPokok", data.nominal);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0">
				<DialogHeader className="px-4 py-2 space-y-0">
					Data Surat Keputusan
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-2 max-h-[450px] overflow-auto pl-4 pr-2 pb-4">
							<InputZod
								type="number"
								id="id"
								label="ID"
								form={form}
								className="hidden"
							/>
							<InputZod
								type="number"
								id="pegawaiId"
								label="Pegawai ID"
								form={form}
								className="hidden"
							/>
							<SelectJenisSkZod id="jenisSk" form={form} />
							<InputZod type="text" id="nomorSk" label="Nomor SK" form={form} />
							<div className="grid grid-cols-2 gap-2">
								<DatePickerZod id="tanggalSk" label="Tanggal SK" form={form} />
								<DatePickerZod
									id="tmtBerlaku"
									label="TMT Berlaku"
									form={form}
								/>
							</div>
							<SelectGolonganZod id="golonganId" label="Golongan" form={form} />
							<div className="grid grid-cols-2 gap-2">
								<InputZod
									type="number"
									id="mkgTahun"
									label="MKG Tahun"
									form={form}
								/>
								<InputZod
									type="number"
									id="mkgBulan"
									label="MKG Bulan"
									form={form}
								/>
							</div>
							<div className="grid grid-cols-4 gap-2 items-end align-center">
								<div className="col-span-3">
									<InputZod
										type="number"
										id="gajiPokok"
										label="Gaji Pokok"
										form={form}
									/>
								</div>
								<div>
									<Button type="button" variant={"outline"} onClick={cariGaji}>
										CARI
									</Button>
								</div>
							</div>
							<DatePickerZod
								id="kenaikanBerikutnya"
								label="Kenaikan Berikutnya"
								form={form}
							/>
							<div className="grid grid-cols-2 gap-2">
								<InputZod
									type="number"
									id="mkgbTahun"
									label="MKGb Tahun"
									form={form}
								/>
								<InputZod
									type="number"
									id="mkgbBulan"
									label="MKGb Bulan"
									form={form}
								/>
							</div>
							<YesNoZod id="updateMaster" label="Update Master" form={form} />
							<TextAreaZod id="notes" label="Notes" form={form} />
						</div>
						<Separator />
						<ActionButtonZod form={form} isPending={mutation.isPending} />
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default RiwayatSkFormComponent;
