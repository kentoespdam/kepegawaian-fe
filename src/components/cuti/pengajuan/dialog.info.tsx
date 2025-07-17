import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { XCircleIcon } from "lucide-react";
import InfoCutiTab from "./tab.info";
import CutiRiwayatPersetujuanTab from "./tab.riwayat";

const CutiPengajuanInfoDialog = () => {
	const { openInfo, setOpenInfo, cutiPegawai } = usePengajuanCutiStore(
		(state) => ({
			openInfo: state.openInfo,
			setOpenInfo: state.setOpenInfo,
			cutiPegawai: state.cutiPegawai,
		}),
	);

	return (
		<Dialog open={openInfo} onOpenChange={() => setOpenInfo(false)}>
			<DialogContent className="mx-h-screen p-2 max-w-full sm:max-w-screen md:w-[650px] lg:w-[650px]">
				<DialogHeader>
					<DialogTitle>Detail Pengajuan Cuti</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="informasiCuti">
					<TabsList>
						<TabsTrigger value="informasiCuti">Informasi Cuti</TabsTrigger>
						<TabsTrigger value="riwayatPersetujuan">
							Riwayat Pesertujuan
						</TabsTrigger>
					</TabsList>
					<div className="grid">
						<InfoCutiTab />
						<CutiRiwayatPersetujuanTab />
					</div>
				</Tabs>
				<DialogFooter>
					<Button variant={"destructive"} onClick={() => setOpenInfo(false)}>
						<div className="flex gap-2 items-center">
							<XCircleIcon className="size-4" />
							<span>close</span>
						</div>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CutiPengajuanInfoDialog;
