"use client"

import { CutiApprovalSchema } from "@_types/cuti/cuti.approval"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import SelectCutiApprovalZod from "@components/form/zod/cuti.approval"
import InputZod from "@components/form/zod/input"
import TextAreaZod from "@components/form/zod/textarea"
import { Button } from "@components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog"
import Fieldset from "@components/ui/fieldset"
import { Form } from "@components/ui/form"
import { Separator } from "@components/ui/separator"
import { globalGetDataEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@lib/utils"
import { usePersetujuanCutiStore } from "@store/cuti/persetujuan"
import { useGlobalMutation } from "@store/query-store"
import { type QueryKey, useQuery } from "@tanstack/react-query"
import { SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { saveApproval } from "./action"
import { useCallback, useEffect } from "react"

type PersetujuanCutiComponentProps = {
	qKey: QueryKey
}
const PersetujuanCutiFormDialog = ({ qKey }: PersetujuanCutiComponentProps) => {
	const { defaultValue, open, setOpen } = usePersetujuanCutiStore(
		(state) => ({
			defaultValue: state.defaultValue,
			open: state.open,
			setOpen: state.setOpen,
		})
	)

	const qKeyCsrf = ["csrf-token"]
	const csrfQuery = useQuery({
		queryKey: qKeyCsrf,
		queryFn: async () =>
			await globalGetDataEnc({
				path: encodeString("auth/csrf-token"),
			}),
		enabled: open,
	})

	const form = useForm<CutiApprovalSchema>({
		resolver: zodResolver(CutiApprovalSchema),
		defaultValues: defaultValue,
		values: defaultValue,
	})

	const { setValue, reset } = form

	const mutation = useGlobalMutation({
		mutationFunction: saveApproval,
		queryKeys: [qKey, qKeyCsrf],
		actHandler: () => cancelHandler(),
		refreshCsrf: async () => {
			await csrfQuery.refetch()
			// form.setValue("csrfToken", String(csrfQuery.data));
		},
	})

	const cancelHandler = useCallback(() => {
		reset()
		setOpen(false)
	}, [reset, setOpen])

	const submitHandler = useCallback(
		(values: CutiApprovalSchema) => {
			mutation.mutate(values)
		},
		[mutation]
	)

	useEffect(() => {
		setValue("csrfToken", String(csrfQuery.data))
	}, [csrfQuery.data, setValue])

	return (
		<Dialog open={open} onOpenChange={cancelHandler}>
			<DialogContent className="sm:max-w-screen max-h-screen max-w-full p-2 md:w-[650px] lg:w-[650px]">
				<DialogHeader>
					<DialogTitle>Pengajuan Cuti</DialogTitle>
					<DialogDescription className="sr-only" />
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="grid gap-2"
					>
						<div className="grid max-h-[80vh] gap-2 overflow-auto p-1">
							<InputZod
								type="hidden"
								id="id"
								label="ID"
								form={form}
							/>
							<InputZod
								type="hidden"
								id="cutiId"
								label="Cuti ID"
								form={form}
							/>
							<InputZod
								type="hidden"
								id="csrfToken"
								label="CSRF Token"
								form={form}
							/>
							<Fieldset title="Data Karyawan" clasName="p-1">
								<div className="grid grid-cols-2 gap-2">
									<InputZod
										id="nipam"
										label="Nipam"
										form={form}
										readonly
									/>
									<InputZod
										id="nama"
										label="Nama"
										form={form}
										readonly
									/>
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
									<InputZod
										id="jabatan"
										label="Jabatan"
										form={form}
										readonly
									/>
								</div>
							</Fieldset>
							<Fieldset
								title="Data Pengajuan Cuti"
								clasName="p-1"
							>
								<div className="grid grid-cols-2 gap-2">
									<InputZod
										id="jenisCutiNama"
										label="Jenis Cuti"
										form={form}
										readonly
									/>
									<InputZod
										id="subJenisCutiNama"
										label="Sub Jenis Cuti"
										form={form}
										readonly
										className={cn(
											"grid gap-2",
											!form.getValues(
												"subJenisCutiNama"
											) && "opacity-50"
										)}
									/>
									<InputZod
										id="tanggalMulai"
										label="Tanggal Mulai"
										form={form}
										readonly
									/>
									<InputZod
										id="tanggalSelesai"
										label="Tanggal Selesai"
										form={form}
										readonly
									/>
									<InputZod
										id="jumlahHariKerja"
										label="Jumlah Hari Kerja"
										form={form}
										readonly
									/>
									<div />
									<div className="col-span-2">
										<InputZod
											id="alasan"
											label="Alasan"
											form={form}
											readonly
										/>
									</div>
								</div>
							</Fieldset>
							<Fieldset title="Persetujuan" clasName="p-1">
								<div className="grid gap-2">
									<InputZod
										type="hidden"
										id="approverId"
										label="Approver"
										form={form}
									/>
									<InputZod
										type="hidden"
										id="approvalLevel"
										label="Approver"
										form={form}
									/>
									<SelectCutiApprovalZod
										id="approvalStatus"
										form={form}
									/>
									<TextAreaZod
										id="notes"
										label="Keterangan"
										form={form}
									/>
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
	)
}

export default PersetujuanCutiFormDialog
