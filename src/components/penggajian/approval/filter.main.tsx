"use client"
import {
	getKeyStatusProsesGaji,
	STATUS_PROSES_GAJI,
} from "@_types/enums/status_proses_gaji"
import type { Pageable } from "@_types/index"
import type { Pegawai } from "@_types/pegawai"
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root"
import type { VerifikasiSchema } from "@_types/penggajian/verifikasi"
import SelectBulanZod from "@components/form/zod/bulan"
import SelectTahunZod from "@components/form/zod/tahun"
import { Form } from "@components/ui/form"
import { Label } from "@components/ui/label"
import { LoopIcon } from "@radix-ui/react-icons"
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses"
import { useGlobalMutation } from "@store/query-store"
import { CheckIcon, SearchIcon, SendIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import GajiVerifActionButton from "../button_verif_action"
import { reprocessGaji, verifikasiProses } from "../proses_gaji/action"
import type { PeriodeBatchRootSchema } from "../verif_phase_1/filter.main"

type ApprovalFilterMainProps = {
	pegawai: Pegawai
	gajiBatchRoot?: Pageable<GajiBatchRoot>
}

const useApprovalFilterMain = (
	pegawai: Pegawai,
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
			bulan: "",
			tahun: currentYear,
		}
	}, [searchParams])

	const [formValues, setFormValues] =
		useState<PeriodeBatchRootSchema>(defaultValues)

	const form = useForm<PeriodeBatchRootSchema>({
		defaultValues: formValues,
		values: formValues,
	})

	const { isApproved, rootBatchId, verifPhase } = useMemo(() => {
		if (!gajiBatchRoot || gajiBatchRoot.empty)
			return {
				isApproved: false,
				rootBatchId: "",
				verifPhase: "",
			}
		const content = gajiBatchRoot.content[0]
		return {
			isApproved:
				content.status ===
				getKeyStatusProsesGaji(STATUS_PROSES_GAJI.FINISHED),
			rootBatchId: content.id ?? "",
			verifPhase: content.status ?? "",
		}
	}, [gajiBatchRoot])

	const verifikasi = useGlobalMutation({
		mutationFunction: verifikasiProses,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	})

	const reprocess = useGlobalMutation({
		mutationFunction: reprocessGaji,
		queryKeys: [["gaji_batch_master_proses", batchMasterId]],
		refreshPage: true,
	})

	const verifikasiHandler = useCallback(() => {
		const x = confirm("Apakah anda yakin memverifikasi data ini?")
		if (!x) return
		if (isApproved) return
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama ?? "",
			phase: verifPhase,
		}
		verifikasi.mutate(formData)
	}, [isApproved, pegawai, rootBatchId, verifikasi, verifPhase])

	const prosesUlangHandler = useCallback(() => {
		const x = confirm("Apakah anda yakin memproses ulang data ini?")
		if (!x) return
		if (isApproved) return
		const formData: VerifikasiSchema = {
			id: rootBatchId,
			nama: pegawai.biodata.nama,
			jabatan: pegawai.jabatan?.nama ?? "",
			phase: verifPhase,
		}
		reprocess.mutate(formData)
	}, [isApproved, pegawai, rootBatchId, reprocess, verifPhase])

	const onSubmit = useCallback(
		(values: PeriodeBatchRootSchema) => {
			const search = new URLSearchParams(searchParams)
			if (values.bulan === "" || values.tahun === "") return
			search.set("periode", `${values.tahun}${values.bulan}`)
			replace(`?${search.toString()}`)
			setBatchMasterId(0)
		},
		[searchParams, replace, setBatchMasterId]
	)

	useEffect(() => {
		setFormValues(defaultValues)
	}, [defaultValues])

	return {
		rootBatchId,
		isApproved,
		form,
		onSubmit,
		verifikasiHandler,
		prosesUlangHandler,
	}
}

const ApprovalFilterMain = ({
	pegawai,
	gajiBatchRoot,
}: ApprovalFilterMainProps) => {
	const {
		rootBatchId,
		isApproved,
		form,
		onSubmit,
		verifikasiHandler,
		prosesUlangHandler,
	} = useApprovalFilterMain(pegawai, gajiBatchRoot)
	return (
		<Form {...form}>
			<div className="flex items-center justify-center gap-2">
				<Label className="mt-2">
					Periode Gaji:<b className="text-destructive">*</b>{" "}
				</Label>
				<div className="flex gap-2">
					<SelectBulanZod id="bulan" form={form} className="w-fit" />
					<SelectTahunZod id="tahun" form={form} className="w-fit" />
					<GajiVerifActionButton
						tooltip="Tampilkan Data"
						className="mt-2 flex gap-2 bg-info text-info-foreground hover:bg-info/90 hover:text-info-foreground/90"
						variant="default"
						key="show"
						icon={SearchIcon}
						title="Tampilkan"
						onClick={form.handleSubmit(onSubmit)}
					/>
					<GajiVerifActionButton
						tooltip="Verifikasi Data"
						variant="default"
						disabled={isApproved || rootBatchId === ""}
						icon={CheckIcon}
						title="Verifikasi"
						key="verifikasi"
						onClick={verifikasiHandler}
					/>
					<GajiVerifActionButton
						tooltip="Proses Ulang"
						variant="destructive"
						disabled={isApproved || rootBatchId === ""}
						icon={LoopIcon}
						title="Proses Ulang"
						key="proses-ulang"
						onClick={prosesUlangHandler}
					/>
					<GajiVerifActionButton
						tooltip="Kirim Slip Gaji"
						variant="default"
						className="bg-warning text-warning-foreground hover:bg-warning/90 hover:text-warning-foreground/90"
						disabled={!isApproved}
						icon={SendIcon}
						title="Kirim Slip Gaji"
						key="kirim-slip-gaji"
						onClick={() => {}}
					/>
				</div>
			</div>
		</Form>
	)
}

export default ApprovalFilterMain
