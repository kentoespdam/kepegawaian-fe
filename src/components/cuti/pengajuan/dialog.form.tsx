"use client";

import { CutiPegawaiSchema } from "@_types/cuti/cuti_pegawai";
import type { CutiJenis } from "@_types/cuti/jenis";
import type { PegawaiDetail } from "@_types/pegawai";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import JenisCutiZod from "@components/form/zod/jenis.cuti";
import SubJenisCutiZod from "@components/form/zod/sub.jenis.cuti";
import TextAreaZod from "@components/form/zod/textarea";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import Fieldset from "@components/ui/fieldset";
import { Form } from "@components/ui/form";
import { Separator } from "@components/ui/separator";
import { getListDataEnc, globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { useGlobalMutation } from "@store/query-store";
import { useQuery } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { savePengajuanCuti } from "./action";

const PengajuanCutiFormDialog = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	const { defaultValue, open, setOpen, setCsrfToken } = usePengajuanCutiStore(
		(state) => ({
			defaultValue: state.defaultValue,
			open: state.open,
			setOpen: state.setOpen,
			setCsrfToken: state.setCsrfToken,
		}),
	);
	const params = useSearchParams();
	const qKey = ["pengajuan-cuti", pegawai.id, params.toString()];
	const qKeyCsrf = ["csrf-token"];

	useQuery({
		queryKey: ["jenis-cuti"],
		queryFn: async () =>
			await getListDataEnc<CutiJenis>({
				path: encodeString("cuti/jenis"),
				isRoot: true,
			}),
		enabled: !!open,
	});

	const form = useForm<CutiPegawaiSchema>({
		resolver: zodResolver(CutiPegawaiSchema),
		defaultValues: defaultValue,
		values: defaultValue,
	});

	const { watch, setValue } = form;

	const mutation = useGlobalMutation({
		mutationFunction: savePengajuanCuti,
		queryKeys: [qKey, qKeyCsrf],
		actHandler: () => cancelHandler(),
		refreshCsrf: setCsrfToken,
	});

	const cancelHandler = () => {
		form.reset();
		setOpen(false);
	};

	const submitHandler = (values: CutiPegawaiSchema) => {
		console.log("submitHandler", values);
		mutation.mutate(values);
	};

	const jenisCutiId = watch("jenisCutiId");
	const tanggalMulai = watch("tanggalMulai");
	const tanggalSelesai = watch("tanggalSelesai");

	useEffect(() => {
		if (jenisCutiId) setValue("subJenisCutiId", 0);
	}, [jenisCutiId, setValue]);

	const { data: jmlHariKerja } = useQuery({
		queryKey: ["jml-hari-kerja", tanggalMulai, tanggalSelesai],
		queryFn: async () =>
			await globalGetDataEnc({
				path: encodeString(
					`cuti/pengajuan/${tanggalMulai}/${tanggalSelesai}/total-hari-kerja`,
				),
			}),
		enabled: !!tanggalMulai && !!tanggalSelesai,
	});

	useEffect(() => {
		const countWorkingDays = (): number => {
			const MS_PER_DAY = 1000 * 60 * 60 * 24;
			const startDateTime = new Date(tanggalMulai).getTime();
			const endDateTime = new Date(tanggalSelesai).getTime();
			const timeDifference = endDateTime - startDateTime;
			const daysDifference = Math.floor(timeDifference / MS_PER_DAY) + 1;
			return daysDifference >= 0 ? daysDifference : 0;
		};
		if (jmlHariKerja) {
			setValue("jumlahHari", countWorkingDays());
			setValue("jumlahHariKerja", Number(jmlHariKerja));
		}
	}, [tanggalMulai, tanggalSelesai, jmlHariKerja, setValue]);

	return (
		<Dialog open={open} onOpenChange={cancelHandler}>
			<DialogContent className="max-h-screen p-2 w-[650px] max-w-full">
				<DialogHeader>
					<DialogTitle>Pengajuan Cuti</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="grid gap-2"
					>
						<div className="grid gap-2 max-h-[80vh] overflow-auto p-1">
							<InputZod type="number" id="id" label="ID" form={form} />
							<InputZod id="csrfToken" label="CSRF Token" form={form} />
							<Fieldset title="Data Karyawan" clasName="p-1">
								<div className="grid gap-2 grid-cols-2">
									<InputZod
										id="pegawaiId"
										label="Pegawai ID"
										form={form}
										className="hidden"
									/>
									<InputZod id="nipam" label="Nipam" form={form} readonly />
									<InputZod id="nama" label="Nama" form={form} readonly />
									<InputZod
										id="pangkatGolongan"
										label="Pangkat Golongan"
										form={form}
										className="col-span-2"
										readonly
									/>
									<InputZod
										id="organisasi"
										label="Organisasi"
										form={form}
										readonly
									/>
									<InputZod id="jabatan" label="Jabatan" form={form} readonly />
								</div>
							</Fieldset>
							<Fieldset title="Data Pengajuan Cuti" clasName="p-1">
								<div className="grid gap-2 grid-cols-2">
									<JenisCutiZod
										id="jenisCutiId"
										label="Jenis Cuti"
										form={form}
									/>
									<SubJenisCutiZod
										id="subJenisCutiId"
										parentId="jenisCutiId"
										label="Sub Jenis Cuti"
										form={form}
									/>
									<DatePickerZod
										id="tanggalMulai"
										label="Tanggal Mulai Cuti"
										form={form}
										popoverDirection="down"
										minDate={new Date()}
									/>
									<DatePickerZod
										id="tanggalSelesai"
										label="Tanggal Akhir Cuti"
										form={form}
										popoverDirection="down"
										minDate={new Date()}
									/>
									<InputZod
										id="jumlahHari"
										label="Jumlah Hari"
										form={form}
										type="number"
										readonly
									/>
									<InputZod
										id="jumlahHariKerja"
										label="Jumlah Hari Kerja"
										form={form}
										type="number"
										readonly
									/>
									<div className="col-span-2">
										<TextAreaZod id="alasan" label="Alasan Cuti" form={form} />
									</div>
								</div>
							</Fieldset>
						</div>
						<Separator />
						<DialogFooter>
							<TooltipBuilder text="Save" delayDuration={100}>
								<LoadingButtonClient
									pending={mutation.isPending}
									type="submit"
									title="Save"
									icon={<SaveIcon />}
								/>
							</TooltipBuilder>
							<TooltipBuilder
								text="Cancel"
								delayDuration={100}
								className="bg-destructive text-destructive-foreground"
							>
								<Button
									type="reset"
									onClick={cancelHandler}
									className="bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
								>
									Batal
								</Button>
							</TooltipBuilder>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default PengajuanCutiFormDialog;
