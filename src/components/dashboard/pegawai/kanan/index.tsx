"use client"
import type { PegawaiDetail } from "@_types/pegawai"
import { Accordion } from "@components/ui/accordion"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { encodeId } from "@helpers/number"
import { HomeIcon, PrinterIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import KananDataGaji from "./kanan.gaji"
import KananDataKeahlian from "./kanan.keahlian"
import KananDataKeluarga from "./kanan.keluarga"
import KananDataMutasi from "./kanan.mutasi"
import KananDataPelatihan from "./kanan.pelatihan"
import KananDataPendidikan from "./kanan.pendidikan"
import KananDataPengalamanKerja from "./kanan.pengalaman"
import KananDataRiwayatSk from "./kanan.sk"
import { useCallback } from "react"
import { Biodata } from "@_types/profil/biodata"

export type DashboardPanelKananBiodataProps = {
	biodata: Biodata
	isKaryawanAktif: boolean
}

export type DashboardPanelKananComponentProps = {
	pegawai: PegawaiDetail
	isKaryawanAktif: boolean
}
const DashboardPanelKananComponent = ({
	pegawai,
	isKaryawanAktif,
}: DashboardPanelKananComponentProps) => {
	const { biodata } = pegawai
	const pegawaiId = encodeId(pegawai.id)
	const { push } = useRouter()

	const handleClick = useCallback(
		() => push(`/laporan/kepegawaian/cv/${pegawaiId}`),
		[push, pegawaiId]
	)
	return (
		<Card className="rounded-none border-none">
			<CardHeader className="border-b bg-warning p-2 text-warning-foreground">
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
			<CardContent className="h-auto px-0">
				<Accordion
					type="single"
					collapsible
					defaultValue="data-keluarga"
				>
					<KananDataKeluarga
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<KananDataPendidikan
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<KananDataPengalamanKerja
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<KananDataKeahlian
						pegawai={pegawai}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<KananDataPelatihan
						biodata={biodata}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<KananDataMutasi pegawai={pegawai} />
					<KananDataRiwayatSk pegawai={pegawai} />
					<KananDataGaji pegawai={pegawai} />
				</Accordion>
			</CardContent>
		</Card>
	)
}

export default DashboardPanelKananComponent
