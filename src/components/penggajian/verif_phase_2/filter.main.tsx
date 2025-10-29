"use client"

import {
	getIndexOfKeyStatusProsesGaji,
	getKeyStatusProsesGaji,
	STATUS_PROSES_GAJI,
} from "@_types/enums/status_proses_gaji"
import type { Pageable } from "@_types/index"
import type { PegawaiDetail } from "@_types/pegawai"
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root"
import type { VerifikasiSchema } from "@_types/penggajian/verifikasi"
import SelectBulanZod from "@components/form/zod/bulan"
import SelectTahunZod from "@components/form/zod/tahun"
import { Form } from "@components/ui/form"
import { Label } from "@components/ui/label"
import { base64toBlob } from "@helpers/string"
import { LoopIcon } from "@radix-ui/react-icons"
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses"
import { useGlobalMutation } from "@store/query-store"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon, SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import GajiVerifActionButton from "../button_verif_action"
import { reprocessGaji, verifikasiProses } from "../proses_gaji/action"
import type { PeriodeBatchRootSchema } from "../verif_phase_1/filter.main"
import { downloadTemplatePotonganGaji, rollbackAdditionalGaji } from "./action"
import VerifPhase2DownloadButton from "@components/penggajian/verif_phase_2/button.filter.download"

type VerifPhase2MainFilterProps = {
	pegawai: PegawaiDetail
	gajiBatchRoot?: Pageable<GajiBatchRoot>
}

const useVerifPhase2MainFilter = (
	pegawai: PegawaiDetail,
	gajiBatchRoot?: Pageable<GajiBatchRoot>
) => {
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const { batchMasterId, setBatchMasterId } = useGajiBatchMasterProsesStore(
		(state) => ({
			batchMasterId: state.batchMasterId,
			setBatchMasterId: state.setBatchMasterId,
		})
	)

	const defaultValues = useMemo(() => {
		const periode = searchParams.get("periode") ?? ""
		const currentYear = new Date().getFullYear().toString()

		if (periode && periode.length >= 6) {
			return {
				bulan: periode.substring(4, 6),
				tahun: periode.substring(0, 4),
			}
		}

		return {
			bulan: new Date().getMonth().toString(),
			tahun: currentYear,
		}
	}, [searchParams])

	const searchParamString = useMemo(() => {
		const search = new URLSearchParams(searchParams)
		return `${search.toString()}&status=${getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_2)}`
	}, [searchParams])

	const [formValues, setFormValues] =
		useState<PeriodeBatchRootSchema>(defaultValues)

	const form = useForm<PeriodeBatchRootSchema>({
		defaultValues: formValues,
		values: formValues,
	})

	const { rootBatchId, verifPhase, disableVerifAndDownload, disableVerif } =
		useMemo(() => {
			if (!gajiBatchRoot?.content?.length || gajiBatchRoot.empty) {
				return {
					rootBatchId: "",
					verifPhase: "",
					disableVerifAndDownload: true,
					disableVerif: true,
				}
			}

			const firstBatch = gajiBatchRoot.content[0]
			const statusIndex = getIndexOfKeyStatusProsesGaji(firstBatch.status)

			return {
				rootBatchId: firstBatch.id,
				verifPhase: firstBatch.status,
				disableVerifAndDownload: false,
				disableVerif: statusIndex > 3,
			}
		}, [gajiBatchRoot])

	const downloadFile = useMutation({
		mutationFn: downloadTemplatePotonganGaji,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type)
			const url = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.setAttribute("download", `potongan-gaji_${rootBatchId}`)
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		},
	})

	const downloadHandler = useCallback(() => {
		if (disableVerifAndDownload) return
		downloadFile.mutate(rootBatchId)
	}, [disableVerifAndDownload, rootBatchId, downloadFile])

	const rollback = useGlobalMutation({
		mutationFunction: rollbackAdditionalGaji,
		queryKeys: [
			["gaji_batch_master", searchParamString],
			["gaji_batch_master_proses", batchMasterId],
		],
		refreshPage: true,
	})

	const rollbackHandler = useCallback(() => {
		if (disableVerifAndDownload) return
		const c = confirm("Apakah anda yakin membatalkan semua perubahan?")
		if (!c) return
		rollback.mutate(rootBatchId)
	}, [disableVerifAndDownload, rollback, rootBatchId])

	const verifikasi = useGlobalMutation({
		mutationFunction: verifikasiProses,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	})

	const verifikasiHandler = useCallback(() => {
		const x = confirm("Apakah anda yakin memverifikasi data ini?")
		if (!x) return
		if (disableVerifAndDownload) return
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama ?? "",
			phase: verifPhase,
		}
		verifikasi.mutate(formData)
	}, [disableVerifAndDownload, verifikasi, rootBatchId, verifPhase, pegawai])

	const reprocess = useGlobalMutation({
		mutationFunction: reprocessGaji,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	})

	const prosesUlangHandler = useCallback(() => {
		const x = confirm("Apakah anda yakin memproses ulang data ini?")
		if (!x) return
		if (disableVerifAndDownload) return
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama ?? "",
			phase: verifPhase,
		}
		reprocess.mutate(formData)
	}, [disableVerifAndDownload, reprocess, rootBatchId, verifPhase, pegawai])

	const onSubmit = useCallback(
		(values: PeriodeBatchRootSchema) => {
			const search = new URLSearchParams(searchParams)
			if (values.bulan === "" || values.tahun === "") return
			search.set("periode", `${values.tahun}${values.bulan}`)
			replace(`?${search.toString()}`)
			setBatchMasterId(0)
		},
		[replace, searchParams, setBatchMasterId]
	)

	useEffect(() => setFormValues(defaultValues), [defaultValues])

	return {
		rootBatchId,
		form,
		onSubmit,
		disableVerifAndDownload,
		disableVerif,
		downloadHandler,
		rollbackHandler,
		verifikasiHandler,
		prosesUlangHandler,
	}
}

const VerifPhase2MainFilter = ({
	pegawai,
	gajiBatchRoot,
}: VerifPhase2MainFilterProps) => {
	const {
		rootBatchId,
		form,
		onSubmit,
		disableVerifAndDownload,
		disableVerif,
		downloadHandler,
		rollbackHandler,
		verifikasiHandler,
		prosesUlangHandler,
	} = useVerifPhase2MainFilter(pegawai, gajiBatchRoot)

	return (
		<Form {...form}>
			<div className="flex items-center justify-center gap-2">
				<Label className="mt-2">
					Periode Gaji:<b className="text-destructive">*</b>{" "}
				</Label>
				<div
					// name="form"
					// onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-2"
				>
					<SelectBulanZod id="bulan" form={form} className="w-fit" />
					<SelectTahunZod id="tahun" form={form} className="w-fit" />
					<GajiVerifActionButton
						tooltip="Tampilkan Data"
						className="bg-info text-info-foreground"
						key="show"
						onClick={form.handleSubmit(onSubmit)}
						icon={SearchIcon}
						title="Tampilkan"
					/>
					<VerifPhase2DownloadButton
						rootBatchId={rootBatchId}
						downloadHandler={downloadHandler}
						rollbackHandler={rollbackHandler}
					/>
					<GajiVerifActionButton
						tooltip="Verifikasi Data"
						key="verifikasi"
						onClick={verifikasiHandler}
						icon={CheckIcon}
						title="Verifikasi"
						disabled={disableVerifAndDownload || disableVerif}
					/>
					<GajiVerifActionButton
						tooltip="Proses Ulang"
						className="bg-destructive text-destructive-foreground"
						variant="destructive"
						key="proses-ulang"
						onClick={prosesUlangHandler}
						icon={LoopIcon}
						title="Proses Ulang"
						disabled={disableVerifAndDownload || disableVerif}
					/>
				</div>
			</div>
		</Form>
	)
}

export default VerifPhase2MainFilter
