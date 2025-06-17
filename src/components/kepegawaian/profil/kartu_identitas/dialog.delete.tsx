import { BaseDelete } from "@_types/index";
import { deleteProfilKartuIdentitas } from "@app/kepegawaian/pendukung/kartu_identitas/action";
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
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { useGlobalMutation } from "@store/query-store";
import { useForm } from "react-hook-form";

const DeleteKartuIdentitasDialog = () => {
	const { defaultValues, deleteOpen, setDeleteOpen, kartuIdentitasId } =
		useKartuIdentitasStore((state) => ({
			defaultValues: state.defaultValues,
			deleteOpen: state.openDelete,
			setDeleteOpen: state.setOpenDelete,
			kartuIdentitasId: state.kartuIdentitasId,
		}));

	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			curId: kartuIdentitasId,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: deleteProfilKartuIdentitas,
		queryKeys: [
			["profil-kartu-identitas", defaultValues.nik],
			["lampiran-kartu-identitas", kartuIdentitasId],
		],
	});

	const onSubmit = (values: BaseDelete) => {
		values.curId = kartuIdentitasId;
		mutation.mutate(values);
		setDeleteOpen(false);
	};

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
											DELETE-{kartuIdentitasId}
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

export default DeleteKartuIdentitasDialog;
