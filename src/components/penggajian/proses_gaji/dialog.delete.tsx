import { BaseDelete } from "@_types/index"
import { Button } from "@components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { encodeString } from "@helpers/number"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGlobalMutation } from "@store/query-store"
import type { QueryKey } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { deleteGajiBatchRoot } from "./action"
import { useCallback, useMemo } from "react"

interface DeleteBatchRootDialogProps {
	id: string
	openDelete: boolean
	setOpenDelete: (value: boolean) => void
	queryKeys: QueryKey[]
}
const DeleteBatchRootDialog = ({
	id,
	openDelete,
	setOpenDelete,
	queryKeys,
}: DeleteBatchRootDialogProps) => {
	const defaultValues = useMemo(
		() => ({
			id: "",
			unique: "",
		}),
		[]
	)
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: defaultValues,
	})

	const mutation = useGlobalMutation({
		mutationFunction: deleteGajiBatchRoot,
		queryKeys: queryKeys,
		actHandler: () => {
			setOpenDelete(false)
		},
	})

	const onSubmit = useCallback(
		(values: BaseDelete) => {
			values.unique = encodeString(id)
			mutation.mutate(values)
		},
		[id, mutation]
	)

	return (
		<Dialog open={openDelete} onOpenChange={setOpenDelete}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin akan menghapus data?</DialogTitle>
					<DialogDescription className="sr-only" />
				</DialogHeader>
				<Form {...form}>
					<form
						name="form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4"
					>
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormDescription>
										proses ini tidak bisa dibatalkan dan
										data yang terhapus tidak dapat
										dikembalikan.
										<br />
										Ketik {""}
										<code className="border bg-orange-300 px-1 font-normal text-gray-700 dark:text-gray-900">
											DELETE-{id}
										</code>
									</FormDescription>
									<FormControl>
										<Input
											placeholder="ketik disini..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" variant="destructive">
								DELETE
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteBatchRootDialog
