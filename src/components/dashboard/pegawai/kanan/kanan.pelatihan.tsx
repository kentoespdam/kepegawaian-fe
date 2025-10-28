import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import ProfilPelatihanContentComponent from "@components/kepegawaian/profil/pelatihan"
import AddProfilPelatihanButton from "@components/kepegawaian/profil/pelatihan/button.add"
import LampiranPelatihanContent from "@components/kepegawaian/profil/pelatihan/lampiran.index"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import { DashboardPanelKananBiodataProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataPelatihan = ({
	biodata,
	isKaryawanAktif,
}: DashboardPanelKananBiodataProps) => {
	return (
		<AccordionItem value="data-pelatihan">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Pelatihan
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Pelatihan ({biodata.nama})
								</span>
								<AddProfilPelatihanButton nik={biodata.nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<ProfilPelatihanContentComponent
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
											.PROFIL_PELATIHAN
									}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranPelatihanContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataPelatihan
