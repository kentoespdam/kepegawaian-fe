"use client";

import { getIndexOfKeyStatusProsesGaji } from "@_types/enums/status_proses_gaji";
import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import type { VerifikasiSchema } from "@_types/penggajian/verifikasi";
import TooltipBuilder from "@components/builder/tooltip";
import SelectBulanZod from "@components/form/zod/bulan";
import SelectTahunZod from "@components/form/zod/tahun";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { base64toBlob } from "@helpers/string";
import { LoopIcon } from "@radix-ui/react-icons";
import { useGlobalMutation } from "@store/query-store";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { verifikasiProses } from "../proses_gaji/action";
import type { PeriodeBatchRootSchema } from "../verif_phase_1/filter.main";
import { downloadTemplatePotonganGaji, rollbackAdditionalGaji } from "./action";
import VerifPhase2DownloadButton from "./button.filter.download";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";

interface VerifPhase2MainFilterProps {
	pegawai: Pegawai;
	gajiBatchRoot?: Pageable<GajiBatchRoot>;
}
const VerifPhase2MainFilter = ({
	pegawai,
	gajiBatchRoot,
}: VerifPhase2MainFilterProps) => {
	const { replace } = useRouter();
	const { batchMasterId } = useGajiBatchMasterProsesStore((state) => ({
		batchMasterId: state.batchMasterId,
	}));
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams.toString());
	const periode = searchParams.get("periode") ?? "";
	const [defaultValues, setDefaultValues] = useState<PeriodeBatchRootSchema>({
		bulan: "",
		tahun: "",
	});
	const rootBatchId = gajiBatchRoot?.content?.[0]?.id ?? "";
	const disableVerifAndDownload = !gajiBatchRoot || gajiBatchRoot.empty;
	const disableVerif =
		!gajiBatchRoot ||
		gajiBatchRoot.empty ||
		getIndexOfKeyStatusProsesGaji(gajiBatchRoot.content[0].status) > 3;

	const downloadFile = useMutation({
		mutationFn: downloadTemplatePotonganGaji,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `potongan-gaji_${rootBatchId}`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	const downloadHandler = () => {
		if (!gajiBatchRoot || gajiBatchRoot.empty) return;
		downloadFile.mutate(rootBatchId);
	};

	const rollback = useGlobalMutation({
		mutationFunction: rollbackAdditionalGaji,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	});

	const rollbackHandler = () => {
		if (!gajiBatchRoot || gajiBatchRoot.empty) return;
		const c = confirm("Apakah anda yakin membatalkan semua perubahan?");
		if (!c) return;
		rollback.mutate(rootBatchId);
	};

	const verifikasi = useGlobalMutation({
		mutationFunction: verifikasiProses,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	});

	const verifikasiHandler = () => {
		if (!gajiBatchRoot || gajiBatchRoot.empty) return;
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan.nama,
			phase: "verify2",
		};
		verifikasi.mutate(formData);
	};

	const prosesUlangHandler = () => {
		if (!gajiBatchRoot || gajiBatchRoot.empty) return;
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan.nama,
			phase: "reprocess",
		};
		console.log(formData);
		verifikasi.mutate(formData);
	};

	const form = useForm<PeriodeBatchRootSchema>({
		defaultValues: defaultValues,
		values: defaultValues,
	});

	const onSubmit = (values: PeriodeBatchRootSchema) => {
		if (values.bulan === "" || values.tahun === "") return;
		search.set("periode", `${values.tahun}${values.bulan}`);
		replace(`?${search.toString()}`);
	};

	useEffect(() => {
		const bulan = periode ? periode.substring(4, 6) : "";
		const tahun = periode
			? periode.substring(0, 4)
			: `${new Date(Date.now()).getFullYear()}`;
		setDefaultValues({ bulan, tahun });
	}, [periode]);

	return (
		<Form {...form}>
			<div className="flex justify-center items-center gap-2">
				<Label className="mt-2">
					Periode Gaji:<b className="text-destructive">*</b>{" "}
				</Label>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
					<SelectBulanZod id="bulan" form={form} className="w-fit" />
					<SelectTahunZod id="tahun" form={form} className="w-fit" />
					<TooltipBuilder
						text="Tampilkan Data"
						delayDuration={10}
						className="bg-info text-info-foreground"
						key="show"
					>
						<Button
							type="submit"
							className="flex gap-2 mt-2 bg-info text-info-foreground hover:bg-info/90 hover:text-info-foreground/90"
						>
							<SearchIcon className="w-4 h-4" />
							Tampilkan
						</Button>
					</TooltipBuilder>
					<VerifPhase2DownloadButton
						rootBatchId={rootBatchId}
						downloadHandler={downloadHandler}
						rollbackHandler={rollbackHandler}
					/>
					<TooltipBuilder text="Verifikasi Data" delayDuration={10}>
						<Button
							type="submit"
							className="flex gap-2 mt-2"
							disabled={disableVerifAndDownload || disableVerif}
							onClick={verifikasiHandler}
							key="verifikasi"
						>
							<CheckIcon className="w-4 h-4" />
							Verifikasi
						</Button>
					</TooltipBuilder>
					<TooltipBuilder
						text="Proses Ulang"
						className="bg-destructive text-destructive-foreground"
						delayDuration={10}
						key="proses-ulang"
					>
						<Button
							type="submit"
							variant="destructive"
							className="flex gap-2 mt-2"
							disabled={disableVerifAndDownload || disableVerif}
							onClick={prosesUlangHandler}
						>
							<LoopIcon className="w-4 h-4" />
							Proses Ulang
						</Button>
					</TooltipBuilder>
				</form>
			</div>
		</Form>
	);
};

export default VerifPhase2MainFilter;
