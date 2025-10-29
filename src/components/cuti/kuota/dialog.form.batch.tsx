import { CutiKuotaImportSchema } from "@_types/cuti/kuota"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import InputZod from "@components/form/zod/input"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useCutiKuotaStore } from "@store/cuti/kuota"
import { useGlobalMutation } from "@store/query-store"
import { SaveIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { saveKuotaCutiBatch } from "./action"
import InputFileZod from "@components/form/zod/file"
import { useCallback, useMemo } from "react"

const useCutiFormBatchDialog = (tahun: number) => {
	const params = useSearchParams()

	const qKey = useMemo(() => ["cuti-kuota", params.toString()], [params])

	const { openBatch, setOpenBatch } = useCutiKuotaStore((state) => ({
		openBatch: state.openBatch,
		setOpenBatch: state.setOpenBatch,
	}))

	const formDefaultValues = useMemo(
		() => ({
			tahun: tahun,
		}),
		[tahun]
	)

	const form = useForm<CutiKuotaImportSchema>({
		resolver: zodResolver(CutiKuotaImportSchema),
		defaultValues: formDefaultValues,
	})

	const cancelHandler = useCallback(() => {
		form.reset()
		setOpenBatch(false)
	}, [form, setOpenBatch])

	const mutation = useGlobalMutation({
		mutationFunction: saveKuotaCutiBatch,
		queryKeys: [qKey],
		actHandler: cancelHandler,
	})

	const submitHandler = useCallback(
		(values: CutiKuotaImportSchema) => {
			const formData = new FormData()
			formData.set("file", values.file[0], values.file[0].name)

			for (const key in values) {
				if (key === "file") continue
				formData.set(key, values[key as keyof CutiKuotaImportSchema])
			}
			mutation.mutate(formData)
		},
		[mutation]
	)

	return {
		openBatch: openBatch,
		form: form,
		mutation: mutation,
		cancelHandler: cancelHandler,
		submitHandler: submitHandler,
	}
}

const CutiKuotaFormBatchDialog = ({ tahun }: { tahun: number }) => {
	const { openBatch, form, mutation, cancelHandler, submitHandler } =
		useCutiFormBatchDialog(tahun)
	return (
		<Dialog open={openBatch} onOpenChange={cancelHandler}>
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
								id="tahun"
								label="Tahun"
								form={form}
								type="number"
							/>
							<InputFileZod id="file" label="File" form={form} />
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

export default CutiKuotaFormBatchDialog
