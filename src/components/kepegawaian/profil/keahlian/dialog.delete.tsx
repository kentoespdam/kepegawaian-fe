import { BaseDelete } from "@_types/index";
import { deleteProfilKeahlian } from "@app/kepegawaian/pendukung/keahlian/action";
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
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useGlobalMutation } from "@store/query-store";
import { useForm } from "react-hook-form";

const DeleteKeahlianDialog = () => {
	const { defaultValues, deleteOpen, setDeleteOpen, keahlianId } =
		useKeahlianStore((state) => ({
			defaultValues: state.defaultValues,
			deleteOpen: state.openDelete,
			setDeleteOpen: state.setOpenDelete,
			keahlianId: state.keahlianId,
		}));

	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			curId: keahlianId,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: deleteProfilKeahlian,
		queryKeys: [
			["profil-keahlian", defaultValues.biodataId],
			["lampiran-keahlian", keahlianId],
		],
	});

	const onSubmit = (values: BaseDelete) => {
		values.curId = keahlianId;
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
											DELETE-{keahlianId}
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

export default DeleteKeahlianDialog;
