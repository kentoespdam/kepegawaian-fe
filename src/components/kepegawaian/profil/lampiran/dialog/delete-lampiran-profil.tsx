import { BaseDelete } from "@_types/index";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { useGlobalMutation } from "@store/query-store";
import { TrashIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteLampiranProfil } from "../action";

interface DeleteLampiranProfilDialogProps {
	rootKey: string;
}
const DeleteLampiranProfilDialog = (props: DeleteLampiranProfilDialogProps) => {
	const {
		lampiranId,
		setLampiranId,
		refId,
		openDeleteDialog,
		setOpenDeleteDialog,
	} = useLampiranProfilStore((state) => ({
		lampiranId: state.lampiranId,
		setLampiranId: state.setLampiranId,
		refId: state.refId,
		openDeleteDialog: state.openDeleteDialog,
		setOpenDeleteDialog: state.setOpenDeleteDialog,
	}));
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		values: {
			id: "",
			curId: lampiranId,
		},
	});

	const deleteMutation = useGlobalMutation({
		mutationFunction: deleteLampiranProfil,
		queryKeys: [[props.rootKey, refId]],
	});

	useEffect(() => {
		if (deleteMutation.isSuccess) {
			setLampiranId(0);
			setOpenDeleteDialog(false);
		}
	}, [deleteMutation.isSuccess, setLampiranId, setOpenDeleteDialog]);

	const onSubmit = (values: BaseDelete) => deleteMutation.mutate(values);

	return (
		<Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
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
											DELETE-{lampiranId}
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
							<LoadingButtonClient
								pending={deleteMutation.isPending}
								type="submit"
								variant="destructive"
								title="Hapus"
								icon={<TrashIcon className="w-4 h-4" />}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteLampiranProfilDialog;
