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
import { encodeId } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useGlobalMutation } from "@store/query-store";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface DeleteRiwayatMutasiDialogProps {
	pegawaiId: number;
}
const DeleteRiwayatMutasiDialog = ({
	pegawaiId,
}: DeleteRiwayatMutasiDialogProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const { riwayatMutasiId, openDelete, setDeleteOpen } = useRiwayatMutasiStore(
		(state) => ({
			riwayatMutasiId: state.riwayatMutasiId,
			openDelete: state.openDelete,
			setDeleteOpen: state.setOpenDelete,
		}),
	);
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			unique: encodeId(riwayatMutasiId),
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: async (values: BaseDelete) =>
			await globalDeleteData({
				path: "kepegawaian/riwayat/mutasi",
				formData: values,
			}),
		queryKeys: [["riwayat-mutasi", pegawaiId, search.toString()]],
	});

	const onSubmit = (values: BaseDelete) => {
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
											DELETE-{riwayatMutasiId}
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

export default DeleteRiwayatMutasiDialog;