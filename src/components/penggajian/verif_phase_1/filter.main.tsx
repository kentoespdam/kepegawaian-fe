"use client"
import { getIndexOfKeyStatusProsesGaji } from "@_types/enums/status_proses_gaji"
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
import { CheckIcon, FileSpreadsheetIcon, SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { verifikasiProses } from "../proses_gaji/action"
import { downloadTableGajiExcel } from "./action"
import GajiVerifActionButton from "@components/penggajian/button_verif_action"

export const PeriodeBatchRootSchema = z.object({
	bulan: z.optional(z.string()),
	tahun: z.optional(z.string()),
})

export type PeriodeBatchRootSchema = z.infer<typeof PeriodeBatchRootSchema>

type VerifPhase1MainFilterProps = {
	pegawai: PegawaiDetail
	gajiBatchRoot?: Pageable<GajiBatchRoot>
}

// Custom hook untuk encapsulate business logic
const useVerifPhase1Filter = (
	pegawai: PegawaiDetail,
	gajiBatchRoot?: Pageable<GajiBatchRoot>
) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { setBatchMasterId } = useGajiBatchMasterProsesStore((state) => ({
		setBatchMasterId: state.setBatchMasterId,
	}))

	// Parse periode dari URL search params
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
			bulan: "",
			tahun: currentYear,
		}
	}, [searchParams])

	const [formValues, setFormValues] =
		useState<PeriodeBatchRootSchema>(defaultValues)

	// Precompute derived values
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
				rootBatchId: firstBatch.id ?? "",
				verifPhase: firstBatch.status ?? "",
				disableVerifAndDownload: false,
				disableVerif: statusIndex > 2,
			}
		}, [gajiBatchRoot])

	const form = useForm<PeriodeBatchRootSchema>({
		defaultValues: formValues,
		values: formValues,
	})

	// Download mutation
	const downloadFile = useMutation({
		mutationFn: downloadTableGajiExcel,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type)
			const url = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.setAttribute("download", `table-gaji_${rootBatchId}.xlsx`)
			document.body.appendChild(link)
			link.click()
			URL.revokeObjectURL(url) // Clean up memory
			document.body.removeChild(link)
		},
		onError: (error) => {
			console.error("Download failed:", error)
			alert("Gagal mengunduh file. Silakan coba lagi.")
		},
	})

	// Verifikasi mutation
	const verifikasiMutation = useGlobalMutation({
		mutationFunction: verifikasiProses,
		queryKeys: [],
		actHandler: () => {
			router.refresh()
		},
	})

	// Event handlers
	const downloadHandler = useCallback(() => {
		if (disableVerifAndDownload || !rootBatchId) return
		downloadFile.mutate(rootBatchId)
	}, [disableVerifAndDownload, rootBatchId, downloadFile])

	const createVerifikasiData = useCallback(
		(): VerifikasiSchema => ({
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama ?? "",
			phase: verifPhase,
		}),
		[rootBatchId, pegawai, verifPhase]
	)

	const verifikasiHandler = useCallback(() => {
		if (disableVerifAndDownload) return

		const konfirmasi = window.confirm(
			"Apakah anda yakin memverifikasi data ini?"
		)
		if (!konfirmasi) return

		verifikasiMutation.mutate(createVerifikasiData())
	}, [disableVerifAndDownload, verifikasiMutation, createVerifikasiData])

	const prosesUlangHandler = useCallback(() => {
		if (disableVerifAndDownload) return

		const konfirmasi = window.confirm(
			"Apakah anda yakin memproses ulang data ini?"
		)
		if (!konfirmasi) return

		verifikasiMutation.mutate(createVerifikasiData())
	}, [disableVerifAndDownload, verifikasiMutation, createVerifikasiData])

	const onSubmit = useCallback(
		(values: PeriodeBatchRootSchema) => {
			if (!values.bulan || !values.tahun) return

			const search = new URLSearchParams(searchParams)
			search.set(
				"periode",
				`${values.tahun}${values.bulan.padStart(2, "0")}`
			)
			router.replace(`?${search.toString()}`)
			setBatchMasterId(0)
		},
		[router, setBatchMasterId, searchParams]
	)

	// Sync form values dengan URL changes
	useEffect(() => {
		setFormValues(defaultValues)
	}, [defaultValues])

	return {
		form,
		onSubmit,
		downloadHandler,
		verifikasiHandler,
		prosesUlangHandler,
		disableVerifAndDownload,
		disableVerif,
		isDownloading: downloadFile.isPending,
		isVerifying: verifikasiMutation.isPending,
	}
}

const VerifPhase1MainFilter = ({
	pegawai,
	gajiBatchRoot,
}: VerifPhase1MainFilterProps) => {
	const {
		form,
		onSubmit,
		downloadHandler,
		verifikasiHandler,
		prosesUlangHandler,
		disableVerifAndDownload,
		disableVerif,
		isDownloading,
		isVerifying,
	} = useVerifPhase1Filter(pegawai, gajiBatchRoot)

	const isMutationPending = isDownloading || isVerifying

	return (
		<Form {...form}>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Label className="mt-2 whitespace-nowrap">
					Periode Gaji:
					<span className="ml-1 text-destructive">*</span>
				</Label>

				<div className="flex flex-wrap items-center gap-2">
					<div className="flex gap-2">
						<SelectBulanZod
							id="bulan"
							form={form}
							className="w-32"
						/>
						<SelectTahunZod
							id="tahun"
							form={form}
							className="w-28"
						/>
					</div>

					<div className="flex flex-wrap gap-2">
						<GajiVerifActionButton
							tooltip="Tampilkan Data"
							className="bg-info text-info-foreground hover:bg-info/90"
							disabled={isMutationPending}
							onClick={form.handleSubmit(onSubmit)}
							icon={SearchIcon}
							title="Tampilkan"
						/>

						<GajiVerifActionButton
							tooltip="Download File Excel"
							className="bg-warning text-warning-foreground hover:bg-warning/90"
							disabled={
								disableVerifAndDownload || isMutationPending
							}
							onClick={downloadHandler}
							icon={FileSpreadsheetIcon}
							title="Download"
							pending={isDownloading}
						/>

						<GajiVerifActionButton
							tooltip="Verifikasi Data"
							disabled={
								disableVerifAndDownload ||
								disableVerif ||
								isMutationPending
							}
							onClick={verifikasiHandler}
							icon={CheckIcon}
							title="Verifikasi"
							pending={isVerifying}
						/>

						<GajiVerifActionButton
							tooltip="Proses Ulang"
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							variant="destructive"
							disabled={
								disableVerifAndDownload ||
								disableVerif ||
								isMutationPending
							}
							onClick={prosesUlangHandler}
							icon={LoopIcon}
							title="Proses Ulang"
							pending={isVerifying}
						/>
					</div>
				</div>
			</div>
		</Form>
	)
}

export default React.memo(VerifPhase1MainFilter)
