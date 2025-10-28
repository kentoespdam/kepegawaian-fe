"use client"

import { type CutiKuota, CutiKuotaSchema } from "@_types/cuti/kuota"
import type { PegawaiList } from "@_types/pegawai"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import DatePickerZod from "@components/form/zod/date-picker"
import InputZod from "@components/form/zod/input"
import PegawaiSearchDialog from "@components/form/zod/pegawai-search.dialog"
import { Button } from "@components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog"
import { Form } from "@components/ui/form"
import { getDataByIdEnc } from "@helpers/action"
import { encodeId, encodeString } from "@helpers/number"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCutiKuotaStore } from "@store/cuti/kuota"
import { useGlobalMutation } from "@store/query-store"
import { useQuery } from "@tanstack/react-query"
import { SaveIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { saveKuotaCuti } from "./action"

type CutiKuotaFormDialogProps = { tahun: number }
// Constants
const CUTI_KUOTA_PATH = "cuti/kuota"

const useCutiKuotaFormDialog = (tahun: number) => {
	const params = useSearchParams()

	// Optimize query key calculation
	const queryKey = useMemo(() => ["cuti-kuota", params.toString()], [params])

	// Zustand store selection - efficient dengan selector sederhana
	const { selectedDataId, defaultValue, setDefaultValue, open, setOpen } =
		useCutiKuotaStore((state) => ({
			selectedDataId: state.selectedDataId,
			defaultValue: state.defaultValue,
			setDefaultValue: state.setDefaultValue,
			open: state.open,
			setOpen: state.setOpen,
		}))

	// Optimize form default values
	const formDefaultValues = useMemo(
		() => ({
			...defaultValue,
			tahun: tahun,
			expired: `${tahun + 1}-06-30`,
		}),
		[defaultValue, tahun]
	)

	const form = useForm<CutiKuotaSchema>({
		resolver: zodResolver(CutiKuotaSchema),
		defaultValues: formDefaultValues,
		values: formDefaultValues,
	})

	// Data fetching untuk edit mode
	const { data: queryData } = useQuery({
		queryKey: ["cuti-kuota-detail", selectedDataId],
		queryFn: async () =>
			await getDataByIdEnc<CutiKuota>({
				path: encodeString(CUTI_KUOTA_PATH),
				id: encodeId(selectedDataId),
				isRoot: true,
			}),
		enabled: !!selectedDataId && selectedDataId > 0,
		staleTime: 2 * 60 * 1000, // 2 minutes cache
	})

	// Mutation untuk save
	const mutation = useGlobalMutation({
		mutationFunction: saveKuotaCuti,
		queryKeys: [queryKey],
		actHandler: () => cancelHandler(),
	})

	// Event handlers dengan useCallback
	const submitHandler = useCallback(
		(values: CutiKuotaSchema) => {
			mutation.mutate(values)
		},
		[mutation]
	)

	const cancelHandler = useCallback(() => {
		form.reset()
		setDefaultValue(Number(tahun))
		setOpen(false)
	}, [form, setDefaultValue, setOpen, tahun])

	const handleSearchPegawai = useCallback(
		(pegawai: PegawaiList) => {
			setDefaultValue(Number(tahun), pegawai)
		},
		[setDefaultValue, tahun]
	)

	// Effect untuk sync query data ke form
	useEffect(() => {
		if (queryData) {
			setDefaultValue(queryData.tahun, undefined, queryData)
		}
	}, [queryData, setDefaultValue])

	// Precompute apakah dalam mode edit
	const isEditMode = useMemo(
		() => !!selectedDataId && selectedDataId > 0,
		[selectedDataId]
	)

	return {
		open: open,
		form: form,
		isEditMode: isEditMode,
		mutation: mutation,
		submitHandler: submitHandler,
		cancelHandler: cancelHandler,
		handleSearchPegawai: handleSearchPegawai,
	}
}

const CutiKuotaFormDialog = ({ tahun }: CutiKuotaFormDialogProps) => {
	// const params = useSearchParams()
	// const search = new URLSearchParams(params)
	// const qKey = ["cuti-kuota", search.toString()]
	//
	// const { selectedDataId, defaultValue, setDefaultValue, open, setOpen } =
	// 	useCutiKuotaStore((state) => ({
	// 		selectedDataId: state.selectedDataId,
	// 		defaultValue: state.defaultValue,
	// 		setDefaultValue: state.setDefaultValue,
	// 		open: state.open,
	// 		setOpen: state.setOpen,
	// 	}))
	//
	// const query = useQuery({
	// 	queryKey: ["cuti-kuota-detail", selectedDataId],
	// 	queryFn: async () =>
	// 		await getDataByIdEnc<CutiKuota>({
	// 			path: encodeString("cuti/kuota"),
	// 			id: encodeId(selectedDataId),
	// 			isRoot: true,
	// 		}),
	// 	enabled: !!selectedDataId && selectedDataId > 0,
	// })
	//
	// const form = useForm<CutiKuotaSchema>({
	// 	resolver: zodResolver(CutiKuotaSchema),
	// 	defaultValues: {
	// 		...defaultValue,
	// 		tahun: tahun,
	// 		expired: `${tahun + 1}-06-30`,
	// 	},
	// 	values: defaultValue,
	// })
	//
	// const mutation = useGlobalMutation({
	// 	mutationFunction: saveKuotaCuti,
	// 	queryKeys: [qKey],
	// 	actHandler: () => cancelHandler(),
	// })
	//
	// const submitHandler = (values: CutiKuotaSchema) => mutation.mutate(values)
	//
	// const cancelHandler = () => {
	// 	form.reset()
	// 	setDefaultValue(Number(tahun))
	// 	setOpen(false)
	// }
	//
	// const handleSearchPegawai = (pegawai: PegawaiList) =>
	// 	setDefaultValue(Number(tahun), pegawai)
	//
	// useEffect(() => {
	// 	if (query.data) {
	// 		setDefaultValue(query.data.tahun, undefined, query.data)
	// 	}
	// }, [query.data, setDefaultValue])

	const {
		open,
		form,
		isEditMode,
		mutation,
		submitHandler,
		cancelHandler,
		handleSearchPegawai,
	} = useCutiKuotaFormDialog(tahun)

	return (
		<Dialog open={open} onOpenChange={cancelHandler}>
			<DialogContent className="max-h-screen w-[500px] max-w-full p-2">
				<DialogHeader>
					<DialogTitle>Add/Edit Kuota Cuti</DialogTitle>
					<DialogDescription className="sr-only" />
				</DialogHeader>
				<div className="h-full overflow-auto p-1">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(submitHandler)}
							className="grid gap-2"
						>
							<InputZod
								id="id"
								label="ID"
								form={form}
								className="hidden"
							/>
							<InputZod
								id="pegawaiId"
								label="Pegawai ID"
								form={form}
								className="hidden"
							/>
							<div className="grid grid-cols-2 gap-2">
								{isEditMode ? (
									<InputZod
										id="nipam"
										label="NIPAM"
										form={form}
										readonly
									/>
								) : (
									<PegawaiSearchDialog
										id="nipam"
										label="NIPAM"
										form={form}
										handleSearchPegawai={
											handleSearchPegawai
										}
									/>
								)}
								<InputZod
									id="nama"
									label="Nama"
									form={form}
									readonly
								/>
								<InputZod
									id="statusPegawai"
									label="Status Pegawai"
									form={form}
									readonly
								/>
								<InputZod
									id="jabatan"
									label="Jabatan"
									form={form}
									readonly
								/>
								<InputZod
									id="tahun"
									label="Tahun"
									form={form}
									type="number"
								/>
								<InputZod
									id="kuota"
									label="Kuota"
									form={form}
									type="number"
								/>
								<InputZod
									id="kuotaTambahan"
									label="Kuota Tambahan"
									form={form}
									type="number"
								/>
								<InputZod
									id="sisaKuota"
									label="Sisa Kuota"
									form={form}
									type="number"
								/>
								<DatePickerZod
									id="expired"
									label="Expired"
									form={form}
									popoverDirection="down"
								/>
							</div>
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
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CutiKuotaFormDialog
