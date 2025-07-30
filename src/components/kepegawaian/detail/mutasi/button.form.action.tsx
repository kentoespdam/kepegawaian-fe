import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface RiwayatMutasiFormActionProps<TData extends FieldValues> {
	form: UseFormReturn<TData>;
	isPending: boolean;
}
const RiwayatMutasiFormAction = <TData extends FieldValues>({
	form,
	isPending,
}: RiwayatMutasiFormActionProps<TData>) => {
	const router = useRouter();
	const { setJenisMutasi } = useRiwayatMutasiStore((state) => ({
		setJenisMutasi: state.setJenisMutasi,
	}));
	const cancelHandler = () => {
		setJenisMutasi();
		form.reset();
		router.back();
	};

	return (
		<Fieldset title="Action" clasName="">
			<div className="flex justify-end gap-2">
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

export default RiwayatMutasiFormAction;
