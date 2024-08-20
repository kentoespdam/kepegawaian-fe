import { RiwayatSk } from "@_types/kepegawaian/riwayat_sk";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { Button } from "@components/ui/button";
import { DialogClose, DialogFooter } from "@components/ui/dialog";
import type { UseMutationResult } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface RiwayatSkFormActionProps<TData extends FieldValues> {
	form: UseFormReturn<TData>;
	isPending: boolean;
}
const RiwayatSkFormAction = <TData extends FieldValues>({
	form,
	isPending,
}: RiwayatSkFormActionProps<TData>) => {
	return (
		<DialogFooter className="px-4 py-2">
			<DialogClose asChild>
				<Button type="reset" variant="destructive" onClick={() => form.reset()}>
					Cancel
				</Button>
			</DialogClose>
			<LoadingButtonClient
				type="submit"
				title="Save"
				pending={isPending}
				icon={<SaveIcon />}
			/>
		</DialogFooter>
	);
};

export default RiwayatSkFormAction;
