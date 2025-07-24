import { BatalCutiPegawaiSchema } from "@_types/cuti/cuti_pegawai";
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
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { encodeId } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { useGlobalMutation } from "@store/query-store";
import type { QueryKey } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { batalPengajuanCuti } from "./action";

type BatalPengajuanCutiDialogProps = {
	queryKeys: QueryKey[];
};
const BatalPengajuanCutiDialog = (props: BatalPengajuanCutiDialogProps) => {
	const { selectedDataId, openDelete, setOpenDelete } = usePengajuanCutiStore(
		(state) => ({
			selectedDataId: state.selectedDataId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const form = useForm<BatalCutiPegawaiSchema>({
		resolver: zodResolver(BatalCutiPegawaiSchema),
		defaultValues: {
			id: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: batalPengajuanCuti,
		queryKeys: props.queryKeys,
		actHandler: () => {
			setOpenDelete(false);
		},
	});

	const onSubmit = (values: BatalCutiPegawaiSchema) => {
		values.unique = encodeId(selectedDataId);
		mutation.mutate(values);
	};

	const handleOpenChange = () => {
		form.reset();
		setOpenDelete(false);
	};

	return (
		<Dialog open={openDelete} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Yakin akan membatalkan pengajuan cuti ini?</DialogTitle>
					<DialogDescription className="text-[.8rem]">
						proses ini tidak bisa dibatalkan dan data yang terhapus tidak dapat
						dikembalikan.
						<br />
						Ketik {""}
						<code className="font-normal bg-orange-300 text-gray-700 dark:text-gray-900 border px-1">
							BATAL-{selectedDataId}
						</code>
					</DialogDescription>
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
									<FormControl>
										<Input placeholder="ketik disini..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" variant="destructive">
								BATALKAN PENGAJUAN
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default BatalPengajuanCutiDialog;
