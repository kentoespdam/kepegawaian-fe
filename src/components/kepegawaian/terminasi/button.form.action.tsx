import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { useRiwayatTerminasiStore } from "@store/kepegawaian/detail/riwayat_terminasi";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface TerminasiActionProps<TData extends FieldValues> {
	form: UseFormReturn<TData>;
	isPending: boolean;
}
const TerminasiAction = <TData extends FieldValues>({
	form,
	isPending,
}: TerminasiActionProps<TData>) => {
	const { setDefaultValues } = useRiwayatTerminasiStore((state) => ({
		setDefaultValues: state.setDefaultValues,
	}));
	const router = useRouter();
	const cancelHandler = () => {
		form.reset();
		setDefaultValues();
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

export default TerminasiAction;
