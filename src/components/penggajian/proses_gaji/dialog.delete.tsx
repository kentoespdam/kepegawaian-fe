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
import { encodeString } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { useForm } from "react-hook-form";
import { deleteGajiBatchRoot } from "./action";

interface DeleteBatchRootDialogProps {
	id: string;
	openDelete: boolean;
	setOpenDelete: (value: boolean) => void;
	queryKeys: string[];
}
const DeleteBatchRootDialog = (props: DeleteBatchRootDialogProps) => {
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			unique: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: deleteGajiBatchRoot,
		queryKeys: [props.queryKeys],
		actHandler: () => {
			props.setOpenDelete(false);
		},
	});
	
	const onSubmit = (values: BaseDelete) => {
		values.unique = encodeString(props.id);
		mutation.mutate(values)
	}

	return (
		<Dialog open={props.openDelete} onOpenChange={props.setOpenDelete}>
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
											DELETE-{props.id}
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
	)
};

export default DeleteBatchRootDialog;
