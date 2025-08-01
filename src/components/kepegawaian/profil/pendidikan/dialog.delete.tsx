import { BaseDelete } from "@_types/index";
import { deleteProfilPendidikan } from "@app/kepegawaian/pendukung/pendidikan/action";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { useGlobalMutation } from "@store/query-store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DeletePendidikanDialog = () => {
	const { defaultValues, deleteOpen, setDeleteOpen, pendidikanId } =
		usePendidikanStore((state) => ({
			defaultValues: state.defaultValues,
			deleteOpen: state.openDelete,
			setDeleteOpen: state.setOpenDelete,
			pendidikanId: state.pendidikanId,
		}));

	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			curId: pendidikanId,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: deleteProfilPendidikan,
		queryKeys: [
			["profil-pendidikan", defaultValues.biodataId],
			["lampiranPendidikan", pendidikanId],
		],
	});

	const onSubmit = (values: BaseDelete) => {
		values.curId = pendidikanId;
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			const reset = () => {
				mutation.reset();
				form.reset();
				setDeleteOpen(false);
			};
			reset();
		}
	}, [mutation, form, setDeleteOpen]);

	return (
		<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin akan menghapus data?</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
											DELETE-{pendidikanId}
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

export default DeletePendidikanDialog;
