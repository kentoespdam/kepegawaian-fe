import { BaseDelete } from "@_types/index";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { globalDeleteData } from "@helpers/action";
import { encodeId } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import type { QueryKey } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface DeleteZodDialogBuilderProps {
	id: number;
	deletePath: string;
	openDelete: boolean;
	setOpenDelete: (value: boolean) => void;
	queryKeys: QueryKey[];
}
const DeleteZodDialogBuilder = (props: DeleteZodDialogBuilderProps) => {
	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			unique: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: async (values: BaseDelete) =>
			await globalDeleteData({
				path: props.deletePath,
				formData: values,
			}),
		queryKeys: props.queryKeys,
		actHandler: () => {
			props.setOpenDelete(false);
		},
	});

	const onSubmit = (values: BaseDelete) => {
		values.unique = encodeId(props.id);
		mutation.mutate(values);
	};

	return (
		<Dialog open={props.openDelete} onOpenChange={props.setOpenDelete}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin akan menghapus data?</DialogTitle>
					<DialogDescription className="text-[.8rem]">
						proses ini tidak bisa dibatalkan dan data yang terhapus tidak dapat
						dikembalikan.
						<br />
						Ketik {""}
						<code className="font-normal bg-orange-300 text-gray-700 dark:text-gray-900 border px-1">
							DELETE-{props.id}
						</code>
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
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

export default DeleteZodDialogBuilder;
