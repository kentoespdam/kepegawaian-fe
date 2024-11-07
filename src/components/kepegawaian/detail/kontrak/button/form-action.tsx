import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface RiwayatKontrakActionProps<TData extends FieldValues> {
	form: UseFormReturn<TData>;
	isPending: boolean;
}
const RiwayatKontrakAction = <TData extends FieldValues>({
	form,
	isPending,
}: RiwayatKontrakActionProps<TData>) => {
	const router = useRouter();
	const { setJenisKontrak } = useRiwayatKontrakStore((state) => ({
		setJenisKontrak: state.setJenisKontrak,
	}));
	const cancelHandler = () => {
		setJenisKontrak();
		form.reset();
		router.back();
	};

	return (
		<Fieldset title="Action" clasName="p-0">
			<div className="flex justify-end gap-2 p-0">
				<LoadingButtonClient
					type="submit"
					title="Save"
					pending={isPending}
					icon={<SaveIcon />}
				/>
				<Button type="reset" variant="destructive" onClick={cancelHandler}>
					Cancel
				</Button>
			</div>
		</Fieldset>
	);
};

export default RiwayatKontrakAction;
