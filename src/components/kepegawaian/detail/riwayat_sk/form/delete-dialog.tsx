"use client";
import { BaseDelete } from "@_types/index";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { globalDeleteData } from "@helpers/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type DeleteRiwayatSkDialogProps = {
	pegawaiId: number;
};
const DeleteRiwayatSkDialog = ({ pegawaiId }: DeleteRiwayatSkDialogProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const { riwayatSkId, openDelete, setDeleteOpen } = useRiwayatSkStore(
		(state) => ({
			riwayatSkId: state.riwayatSkId,
			openDelete: state.openDelete,
			setDeleteOpen: state.setOpenDelete,
		}),
	);
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			curId: riwayatSkId,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: async () =>
			await globalDeleteData({
				path: "kepegawaian/riwayat/sk",
				id: riwayatSkId,
				formData: form.getValues(),
			}),
		queryKeys: [["riwayat-sk", pegawaiId, search.toString()]],
	});

	const onSubmit = (values: BaseDelete) => {
		form.setValue("id", `DELETE-${riwayatSkId}`);
		mutation.mutate(values);
		setDeleteOpen(false);
	};

	return (
		<Dialog open={openDelete} onOpenChange={setDeleteOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin akan menghapus data?</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormDescription>
										proses ini tidak bisa dibatalkan dan data yang terhapus
										tidak dapat dikembalikan.
										<br />
										Ketik {""}
										<code className="font-normal bg-orange-300 text-gray-700 dark:text-gray-900 border px-1">
											DELETE-{riwayatSkId}
										</code>
									</FormDescription>
									<FormControl>
										<Input placeholder="ketik disini..." {...field} />
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
	);
};

export default DeleteRiwayatSkDialog;
