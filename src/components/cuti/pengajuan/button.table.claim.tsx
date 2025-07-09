import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { FileLock2Icon } from "lucide-react";

type PengajuanCutiClaimTableActionButtonProps = {
	data: CutiPegawai;
};
const PengajuanCutiClaimTableActionButton = ({
	data,
}: PengajuanCutiClaimTableActionButtonProps) => {
	return (
		<TooltipBuilder text="Kalim Cuti" delayDuration={100}>
			<Button size={"icon"} className="size-6">
				<FileLock2Icon className="size-4" />
			</Button>
		</TooltipBuilder>
	);
};

export default PengajuanCutiClaimTableActionButton;
