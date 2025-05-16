import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";
import { Trash2Icon } from "lucide-react";
import { useShallow } from "zustand/shallow";

const GajiBatchMasterProsesKomponenTableAction = ({
	batchMasterProsesId,
	kode,
	isVerified,
}: { batchMasterProsesId: number; kode: string; isVerified: boolean }) => {
	const { setBatchMasterProsesId, setOpenDelete } =
		useGajiBatchMasterProsesStore(
			useShallow((state) => ({
				setBatchMasterProsesId: state.setBatchMasterProsesId,
				setOpenDelete: state.setOpenDelete,
			})),
		);
	const isAdd = kode.startsWith("ADD_");
	return (
		<TooltipBuilder
			text="Hapus Komponen"
			delayDuration={10}
			className="bg-destructive text-destructive-foreground"
		>
			<Button
				variant={"destructive"}
				size={"icon"}
				onClick={() => {
					if (!isAdd) return;
					setBatchMasterProsesId(batchMasterProsesId);
					setOpenDelete(true);
				}}
				className="h-6 w-6"
				disabled={!isAdd || isVerified}
			>
				<Trash2Icon className="h-4 w-4" />
			</Button>
		</TooltipBuilder>
	);
};

export default GajiBatchMasterProsesKomponenTableAction;
