"use client";
import type { PegawaiDetail } from "@_types/pegawai";
import { Accordion } from "@components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import KananDataKeluarga from "./kanan.keluarga";
import { HomeIcon } from "lucide-react";
import KananDataPendidikan from "./kanan.pendidikan";
import KananDataPengalamanKerja from "./kanan.pengalaman";
import KananDataKeahlian from "./kanan.keahlian";
import KananDataPelatihan from "./kanan.pelatihan";
import KananDataMutasi from "./kanan.mutasi";
import KananDataRiwayatSk from "./kanan.sk";
import KananDataGaji from "./kanan.gaji";

type DashboardPanelKananComponentProps = {
	pegawai: PegawaiDetail;
};
const DashboardPanelKananComponent = ({
	pegawai,
}: DashboardPanelKananComponentProps) => {
	return (
		<Card className="border-none rounded-none">
			<CardHeader className="p-2 border-b bg-warning text-warning-foreground">
				<CardTitle className="flex items-center gap-2 py-1">
					<div className="flex items-center gap-2">
						<HomeIcon className="size-4" />
						<span>Dashboard Pegawai</span>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 h-auto">
				<Accordion type="single" collapsible defaultValue="data-keluarga">
					<KananDataKeluarga
						nik={pegawai.biodata.nik}
						nama={pegawai.biodata.nama}
					/>
					<KananDataPendidikan
						nik={pegawai.biodata.nik}
						nama={pegawai.biodata.nama}
					/>
					<KananDataPengalamanKerja
						nik={pegawai.biodata.nik}
						nama={pegawai.biodata.nama}
					/>
					<KananDataKeahlian
						nik={pegawai.biodata.nik}
						nama={pegawai.biodata.nama}
					/>
					<KananDataPelatihan
						nik={pegawai.biodata.nik}
						nama={pegawai.biodata.nama}
					/>
					<KananDataMutasi pegawai={pegawai} />
					<KananDataRiwayatSk pegawai={pegawai} />
					<KananDataGaji pegawai={pegawai} />
				</Accordion>
			</CardContent>
		</Card>
	);
};

export default DashboardPanelKananComponent;
