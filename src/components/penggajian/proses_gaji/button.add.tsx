"use client"
import type { PegawaiDetail } from "@_types/pegawai"
import { GajiBatchRootSchema } from "@_types/penggajian/gaji_batch_root"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import InputFileZod from "@components/form/zod/file"
import InputZod from "@components/form/zod/input"
import { Button } from "@components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@components/ui/dialog"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGajiBatchRootStore } from "@store/penggajian/gaji_batch_root"
import { useGlobalMutation } from "@store/query-store"
import { PlusCircleIcon, SaveIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { saveGajiBatchRoot } from "./action"

interface AddProsesGajiButonProps {
	pegawai: PegawaiDetail
}

// Custom hook untuk encapsulate form logic
const useGajiBatchForm = (pegawai: PegawaiDetail, onClose: () => void) => {
	const params = useSearchParams()
	const search = useMemo(() => new URLSearchParams(params), [params])

	// Precompute current date values
	const { tahun, bulan } = useMemo(() => {
		const today = new Date()
		return {
			tahun: today.getFullYear().toString(),
			bulan: (today.getMonth() + 1).toString().padStart(2, "0"),
		}
	}, [])

	const form = useForm<GajiBatchRootSchema>({
		resolver: zodResolver(GajiBatchRootSchema),
		defaultValues: {
			tahun,
			bulan,
			diProsesOleh: pegawai?.biodata.nama || "",
			jabatanPemroses: pegawai?.jabatan?.nama || "",
		},
	})

	const mutation = useGlobalMutation<GajiBatchRootSchema, FormData>({
		mutationFunction: saveGajiBatchRoot,
		queryKeys: [["gaji_batch_root", search.toString()]],
		actHandler: onClose,
	})

	const onSubmit = useCallback(
		(data: GajiBatchRootSchema) => {
			const formData = new FormData()

			// Handle file upload
			if (data.fileName?.[0]) {
				formData.set("fileName", data.fileName[0])
			}

			// Add other form data
			for (const [key, value] of Object.entries(data)) {
				if (key !== "fileName" && value != null) {
					formData.set(key, value.toString())
				}
			}

			mutation.mutate(formData)
		},
		[mutation]
	)

	return {
		form,
		mutation,
		onSubmit,
	}
}

// Komponen form yang terpisah untuk optimasi re-render
const GajiBatchForm = React.memo(
	({
		form,
		onSubmit,
		onClose,
		mutation,
	}: {
		form: ReturnType<typeof useForm<GajiBatchRootSchema>>
		onSubmit: (data: GajiBatchRootSchema) => void
		onClose: () => void
		mutation: ReturnType<
			typeof useGlobalMutation<GajiBatchRootSchema, FormData>
		>
	}) => (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid w-full gap-3" // Increased gap for better spacing
			>
				<div className="grid grid-cols-2 gap-3">
					<InputZod form={form} id="tahun" label="Tahun" />
					<InputZod form={form} id="bulan" label="Bulan" />
				</div>

				<InputZod
					form={form}
					id="diProsesOleh"
					label="Di Proses Oleh"
					readonly
				/>

				<InputZod
					form={form}
					id="jabatanPemroses"
					label="Jabatan Pemroses"
					readonly
				/>

				<InputFileZod
					id="fileName"
					label="Lampiran SK Terminasi"
					form={form}
				/>

				<div className="flex justify-end gap-2 pt-2">
					<LoadingButtonClient
						type="submit"
						title="Simpan"
						pending={mutation.isPending}
						icon={<SaveIcon className="size-4" />}
						disabled={mutation.isPending}
					/>
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						disabled={mutation.isPending}
					>
						Batal
					</Button>
				</div>
			</form>
		</Form>
	)
)

GajiBatchForm.displayName = "GajiBatchForm"

const AddProsesGajiButon = ({ pegawai }: AddProsesGajiButonProps) => {
	const { addOpen, setAddOpen } = useGajiBatchRootStore((state) => ({
		addOpen: state.addOpen,
		setAddOpen: state.setAddOpen,
	}))

	const handleClose = useCallback(() => {
		setAddOpen(false)
	}, [setAddOpen])

	const { form, mutation, onSubmit } = useGajiBatchForm(pegawai, handleClose)

	const handleOpenChange = useCallback(
		(open: boolean) => {
			setAddOpen(open)
			if (!open) {
				form.reset()
			}
		},
		[setAddOpen, form]
	)

	return (
		<Dialog open={addOpen} onOpenChange={handleOpenChange}>
			<TooltipBuilder
				text="Buat Proses Baru"
				delayDuration={300} // Reduced delay for better UX
			>
				<DialogTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="transition-colors hover:bg-primary/10"
						aria-label="Buat proses gaji baru"
					>
						<PlusCircleIcon className="size-5 text-primary" />
					</Button>
				</DialogTrigger>
			</TooltipBuilder>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">
						Buat Proses Gaji Baru
					</DialogTitle>
				</DialogHeader>

				<GajiBatchForm
					form={form}
					onSubmit={onSubmit}
					onClose={handleClose}
					mutation={mutation}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default React.memo(AddProsesGajiButon)
