import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import ProfilPengalamanKerjaContentComponent from "@components/kepegawaian/profil/pengalaman"
import AddProfilPengalamanKerjaButton from "@components/kepegawaian/profil/pengalaman/button.add"
import LampiranPengalamanKerjaContent from "@components/kepegawaian/profil/pengalaman/lampiran.index"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import { DashboardPanelKananBiodataProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataPengalamanKerja = ({
	biodata,
	isKaryawanAktif,
}: DashboardPanelKananBiodataProps) => {
	return (
		<AccordionItem value="data-pengalaman-kerja">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Pengalaman Kerja
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Pengalaman Kerja ({biodata.nama})
								</span>
								<AddProfilPengalamanKerjaButton
									nik={biodata.nik}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<ProfilPengalamanKerjaContentComponent
										biodata={biodata}
										isKaryawanAktif={isKaryawanAktif}
									/>
								</div>
							</main>
						</div>
					</div>
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Lampiran
								</span>
								<AddLampiranProfilButton
									jenis={
										JenisLampiranProfil.Values
											.PROFIL_PENGALAMAN_KERJA
									}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranPengalamanKerjaContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataPengalamanKerja
