"use client";

import { KlaimCutiPegawaiSchema } from "@_types/cuti/cuti_pegawai";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import RealisasiCutiZod from "@components/form/zod/realisasi-cuti";
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
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { useGlobalMutation } from "@store/query-store";
import { type QueryKey, useQuery } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveKlaimCutiPegawai } from "./action";

type PengajuanCutiClaimTableActionButtonProps = {
	qKey: QueryKey;
};
const KlaimPengajuanCutiFormDialog = ({
	qKey,
}: PengajuanCutiClaimTableActionButtonProps) => {
	const { defaultKlaimCutiPegawai, openKlaim, setOpenKlaim } =
		usePengajuanCutiStore((state) => ({
			defaultKlaimCutiPegawai: state.defaultKlaimCutiPegawai,
			openKlaim: state.openKlaim,
			setOpenKlaim: state.setOpenKlaim,
		}));

	const qKeyCsrf = ["csrf-token"];
	const csrffQuery = useQuery({
		queryKey: qKeyCsrf,
		queryFn: async () =>
			await globalGetDataEnc({
				path: encodeString("auth/csrf-token"),
			}),
		enabled: !!open,
	});

	const form = useForm<KlaimCutiPegawaiSchema>({
		resolver: zodResolver(KlaimCutiPegawaiSchema),
		defaultValues: defaultKlaimCutiPegawai,
		values: defaultKlaimCutiPegawai,
	});

	const { watch, setValue, reset } = form;

	const mutation = useGlobalMutation({
		mutationFunction: saveKlaimCutiPegawai,
		queryKeys: [qKey],
		actHandler: () => cancelHandler(),
		// refreshCsrf: setCsrfToken,
	});

	const cancelHandler = () => {
		reset();
		setOpenKlaim(false);
	};

	const submitHandler = (values: KlaimCutiPegawaiSchema) => {
		console.log("submitHandler", values);
		// mutation.mutate(values);
	};

	useEffect(() => {
		setValue("csrfToken", String(csrffQuery.data));
	}, [csrffQuery.data, setValue]);

	return (
		<Dialog open={openKlaim} onOpenChange={cancelHandler}>
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
									<InputZod
										type="hidden"
										id="jenisCutiId"
										label="Jenis Cuti"
										form={form}
									/>
									<InputZod
										id="jenisCutiNama"
										label="Jenis Cuti"
										form={form}
										readonly
									/>
									<InputZod
										type="hidden"
										id="subJenisCutiId"
										label="Sub Jenis Cuti"
										form={form}
									/>
									<InputZod
										id="subJenisCutiNama"
										label="Sub Jenis Cuti"
										form={form}
										readonly
									/>
									<InputZod
										id="tanggalMulai"
										label="Tanggal Mulai Cuti"
										form={form}
										readonly
									/>
									<InputZod
										id="tanggalSelesai"
										label="Tanggal Akhir Cuti"
										form={form}
										readonly
									/>
									<div className="col-span-2">
										<TextAreaZod
											id="alasan"
											label="Alasan Cuti"
											form={form}
											readonly
										/>
									</div>
									<div className="col-span-2">
										<RealisasiCutiZod
											id="listHari"
											label="Realisasi Cuti"
											form={form}
											startDate={watch("tanggalMulai")}
											endDate={watch("tanggalSelesai")}
										/>
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

export default KlaimPengajuanCutiFormDialog;
