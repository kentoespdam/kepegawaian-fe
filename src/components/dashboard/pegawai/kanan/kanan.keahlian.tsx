import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import ProfilKeahlianContentComponent from "@components/kepegawaian/profil/keahlian"
import AddProfilKeahlianButton from "@components/kepegawaian/profil/keahlian/button.add"
import LampiranKeahlianContent from "@components/kepegawaian/profil/keahlian/lampiran.index"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import { DashboardPanelKananComponentProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataKeahlian = ({
	pegawai,
	isKaryawanAktif,
}: DashboardPanelKananComponentProps) => {
	return (
		<AccordionItem value="data-keahlian">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Keahlian
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Keahlian ({pegawai.biodata.nama})
								</span>
								<AddProfilKeahlianButton
									nik={pegawai.biodata.nik}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<ProfilKeahlianContentComponent
										biodata={pegawai.biodata}
										isKaryawanAktif={isKaryawanAktif}
									/>
								</div>
							</main>
						</div>
					</div>
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Lampiran
								</span>
								<AddLampiranProfilButton
									jenis={
										JenisLampiranProfil.Values
											.PROFIL_KEAHLIAN
									}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranKeahlianContent
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

export default KananDataKeahlian
