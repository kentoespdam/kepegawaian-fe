"use client";
import type { PegawaiDetail } from "@_types/pegawai";
import { Accordion } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { encodeId } from "@helpers/number";
import { HomeIcon, PrinterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import KananDataGaji from "./kanan.gaji";
import KananDataKeahlian from "./kanan.keahlian";
import KananDataKeluarga from "./kanan.keluarga";
import KananDataMutasi from "./kanan.mutasi";
import KananDataPelatihan from "./kanan.pelatihan";
import KananDataPendidikan from "./kanan.pendidikan";
import KananDataPengalamanKerja from "./kanan.pengalaman";
import KananDataRiwayatSk from "./kanan.sk";

type DashboardPanelKananComponentProps = {
	pegawai: PegawaiDetail;
};
const DashboardPanelKananComponent = ({
	pegawai,
}: DashboardPanelKananComponentProps) => {
	const router = useRouter();
	const pegawaiId = encodeId(pegawai.id as number);
	const handleClick = () => router.push(`/laporan/kepegawaian/cv/${pegawaiId}`);
	return (
		<Card className="border-none rounded-none">
			<CardHeader className="p-2 border-b bg-warning text-warning-foreground">
				<CardTitle className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<HomeIcon className="size-4" />
						<span>Dashboard Pegawai</span>
					</div>
					<Button size={"sm"} onClick={handleClick}>
						<PrinterIcon className="size-4" />
						Cetak CV
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 h-auto">
				<Accordion type="single" collapsible defaultValue="data-keluarga">
					<KananDataKeluarga biodata={pegawai.biodata} />
					<KananDataPendidikan biodata={pegawai.biodata} />
					<KananDataPengalamanKerja biodata={pegawai.biodata} />
					<KananDataKeahlian pegawai={pegawai} />
					<KananDataPelatihan biodata={pegawai.biodata} />
					<KananDataMutasi pegawai={pegawai} />
					<KananDataRiwayatSk pegawai={pegawai} />
					<KananDataGaji pegawai={pegawai} />
				</Accordion>
			</CardContent>
		</Card>
	);
};

export default DashboardPanelKananComponent;
