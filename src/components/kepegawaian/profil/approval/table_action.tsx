import type { ProfilUpdate } from "@_types/profil/profil-update";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useProfilUpdateStore } from "@store/kepegawaian/profil/profil-update-store";
import { EyeIcon } from "lucide-react";
import { useCallback } from "react";

const ProfilUpdateTableAction = ({
	data,
	pegawaiId,
}: {
	data: ProfilUpdate;
	pegawaiId: number;
}) => {
	const { setProfilUpdate, setOpen, setDefaultValues } = useProfilUpdateStore(
		(state) => ({
			setProfilUpdate: state.setProfilUpdate,
			setOpen: state.setOpen,
			setDefaultValues: state.setDefaultValues,
		}),
	);

	const editHandler = useCallback(() => {
		setProfilUpdate(data);
		setDefaultValues(data.id, pegawaiId);
		setOpen(true);
	}, [data, pegawaiId, setProfilUpdate, setDefaultValues, setOpen]);

	return (
		<div className={"flex gap-2"}>
			<TooltipBuilder text={"Lihat Detail"} delayDuration={0}>
				<Button
					variant={"ghost"}
					size={"icon"}
					className={"size-6 text-primary hover:text-primary/40"}
					onClick={editHandler}
				>
					<EyeIcon />
				</Button>
			</TooltipBuilder>
		</div>
	);
};
export default ProfilUpdateTableAction;
