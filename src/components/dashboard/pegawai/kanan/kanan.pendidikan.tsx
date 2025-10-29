import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import ProfilPendidikanContentComponent from "@components/kepegawaian/profil/pendidikan"
import AddProfilPendidikanButton from "@components/kepegawaian/profil/pendidikan/button.add"
import LampiranPendidikanContent from "@components/kepegawaian/profil/pendidikan/lampiran.index"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import { DashboardPanelKananBiodataProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataPendidikan = ({
	biodata,
	isKaryawanAktif,
}: DashboardPanelKananBiodataProps) => {
	return (
		<AccordionItem value="data-pendidikan">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Pendidikan
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px]">
								<span className="text-md font-semibold">
									Data Pendidikan ({biodata.nama})
								</span>
								<AddProfilPendidikanButton nik={biodata.nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<ProfilPendidikanContentComponent
										biodata={biodata}
										isKaryawanAktif={isKaryawanAktif}
									/>
								</div>
							</main>
						</div>
					</div>
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px]">
								<span className="text-md font-semibold">
									Lampiran
								</span>
								<AddLampiranProfilButton
									jenis={
										JenisLampiranProfil.Values
											.PROFIL_PENDIDIKAN
									}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranPendidikanContent
										isKaryawanAktif={isKaryawanAktif}
									/>
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataPendidikan
