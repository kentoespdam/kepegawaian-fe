import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";

type PengajuanCutiInfoButtonProps = {
	pegawai: PegawaiDetail;
	cutiPegawai: CutiPegawai;
};
const PengajuanCutiInfoButton = ({
	pegawai,
	cutiPegawai,
}: PengajuanCutiInfoButtonProps) => {
	const { setPegawai, setCutiPegawai, setOpenInfo } = usePengajuanCutiStore(
		(state) => ({
			setPegawai: state.setPegawai,
			setCutiPegawai: state.setCutiPegawai,
			setOpenInfo: state.setOpenInfo,
		}),
	);

	const handleClick = () => {
		setPegawai(pegawai);
		setCutiPegawai(cutiPegawai);
		setOpenInfo(true);
	};

	return (
		<TooltipBuilder
			text="Detail Cuti"
			delayDuration={100}
			className="bg-warning text-warning-foreground"
		>
			<Button
				size={"icon"}
				className="size-6 bg-warning text-warning-foreground hover:bg-warning/75"
				onClick={handleClick}
			>
				<InfoCircledIcon className="size-4" />
			</Button>
		</TooltipBuilder>
	);
};

export default PengajuanCutiInfoButton;
