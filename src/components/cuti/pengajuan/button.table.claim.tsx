import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { FileLock2Icon } from "lucide-react";

type PengajuanCutiClaimTableActionButtonProps = {
	pegawai: PegawaiDetail;
	data: CutiPegawai;
};
const PengajuanCutiClaimTableActionButton = ({
	pegawai,
	data,
}: PengajuanCutiClaimTableActionButtonProps) => {
	const { setDefaultKlaimCutiPegawai, setOpenKlaim, setKlaimCsrfToken } =
		usePengajuanCutiStore((state) => ({
			setDefaultKlaimCutiPegawai: state.setDefaultKlaimCutiPegawai,
			setOpenKlaim: state.setOpenKlaim,
			setKlaimCsrfToken: state.setKlaimCsrfToken,
		}));

	const handleClick = () => {
		setKlaimCsrfToken();
		setDefaultKlaimCutiPegawai(pegawai, data);
		setOpenKlaim(true);
	};

	return (
		<TooltipBuilder text="Kalim Cuti" delayDuration={100}>
			<Button size={"icon"} className="size-6" onClick={handleClick}>
				<FileLock2Icon className="size-4" />
			</Button>
		</TooltipBuilder>
	);
};

export default PengajuanCutiClaimTableActionButton;
