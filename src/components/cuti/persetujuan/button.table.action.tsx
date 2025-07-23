import type { CutiApprovalChain } from "@_types/cuti/cuti.approval.chain";
import { READ_WRITE_STATUS, ReadWriteStatus } from "@_types/enums/read.write.status";
import type { PegawaiDetail } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { usePersetujuanCutiStore } from "@store/cuti/persetujuan";
import { ForwardIcon } from "lucide-react";

type CutiPersetujuanTableActionButtonProps = {
	pegawai: PegawaiDetail;
	cutiApprovalChain: CutiApprovalChain;
};
const CutiPersetujuanTableActionButton = ({
	pegawai,
	cutiApprovalChain,
}: CutiPersetujuanTableActionButtonProps) => {
	const {
		setOpen,
		setDefaultValue,
		setCutiPegawai,
		setOpenInfo,
	} = usePersetujuanCutiStore((state) => ({
		setOpen: state.setOpen,
		setDefaultValue: state.setDefaultValue,
		setCutiPegawai: state.setCutiPegawai,
		setOpenInfo: state.setOpenInfo,
	}));

	const handleTindakLanjutClick = () => {
		setDefaultValue(pegawai, cutiApprovalChain.refCuti);
		setOpen(true);
	};

	const handleInfoClick = () => {
		setCutiPegawai(cutiApprovalChain.refCuti);
		setOpenInfo(true);
	};
	
	return (
		<div className="flex gap-2 justify-center">
			{cutiApprovalChain.readWriteStatus === ReadWriteStatus.Values.WRITE ? (
				<TooltipBuilder text="Tindak Lanjut">
					<Button
						size={"icon"}
						className="size-6"
						onClick={handleTindakLanjutClick}
					>
						<ForwardIcon className="size-4" />
					</Button>
				</TooltipBuilder>
			) : null}
			<TooltipBuilder
				text="Detail Cuti"
				delayDuration={100}
				className="bg-warning text-warning-foreground"
			>
				<Button
					size={"icon"}
					className="size-6 bg-warning text-warning-foreground hover:bg-warning/75"
					onClick={handleInfoClick}
				>
					<InfoCircledIcon className="size-4" />
				</Button>
			</TooltipBuilder>
		</div>
	);
};

export default CutiPersetujuanTableActionButton;
