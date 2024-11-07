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
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useGlobalMutation } from "@store/query-store";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { deleteLampiranSk } from "../action";
import { z } from "zod";

export const DeleteLampiranSkProps = BaseDelete.extend({
	ref: z.string(),
	refId: z.number(),
});

export type DeleteLampiranSkProps = z.infer<typeof DeleteLampiranSkProps>;

type DeleteLampiranSkDialogProps = {
	pegawaiId: number;
	rootKey: string;
};
const DeleteLampiranSkDialog = (props: DeleteLampiranSkDialogProps) => {
	const {
		lampiranId,
		setLampiranId,
		ref,
		refId,
		openDeleteLampiranForm,
		setOpenDeleteLampiranForm,
	} = useLampiranSkStore((state) => ({
		lampiranId: state.lampiranId,
		setLampiranId: state.setLampiranId,
		ref: state.ref,
		refId: state.refId,
		openDeleteLampiranForm: state.openDeleteLampiranForm,
		setOpenDeleteLampiranForm: state.setOpenDeleteLampiranForm,
	}));

	const form = useForm<DeleteLampiranSkProps>({
		resolver: zodResolver(DeleteLampiranSkProps),
		values: {
			id: "",
			curId: lampiranId,
			ref: ref,
			refId: refId,
		},
	});

	const deleteMutation = useGlobalMutation({
		mutationFunction: deleteLampiranSk,
		queryKeys: [[props.rootKey, ref, refId]],
		actHandler: () => {
			setLampiranId(0);
			setOpenDeleteLampiranForm(false);
		},
	});

	const onSubmit = (values: DeleteLampiranSkProps) => {
		deleteMutation.mutate(values);
	};

	return (
		<Dialog
			open={openDeleteLampiranForm}
			onOpenChange={setOpenDeleteLampiranForm}
		>
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

export default DeleteLampiranSkDialog;
