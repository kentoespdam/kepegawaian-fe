import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import ProfilKeluargaContentComponent from "@components/kepegawaian/profil/keluarga"
import AddProfilKeluargaButton from "@components/kepegawaian/profil/keluarga/button.add"
import LampiranKeluargaContent from "@components/kepegawaian/profil/keluarga/lampiran.index"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import { DashboardPanelKananBiodataProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataKeluarga = ({
	biodata,
	isKaryawanAktif,
}: DashboardPanelKananBiodataProps) => (
	<AccordionItem value="data-keluarga">
		<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
			Data Keluarga
		</AccordionTrigger>
		<AccordionContent className="grid border-t p-0">
			<div className="grid min-h-screen w-full">
				<div className="gap-0 border-b border-r border-t">
					<div className="grid">
						<header className="flex w-full items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px]">
							<span className="text-md font-semibold">
								Data Keluarga ({biodata.nama})
							</span>
							<AddProfilKeluargaButton nik={biodata.nik} />
						</header>
						<main className="flex flex-1 flex-col lg:gap-6">
							<div
								className="grid flex-1"
								x-chunk="dashboard-02-chunk-1"
							>
								<ProfilKeluargaContentComponent
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
									JenisLampiranProfil.Values.PROFIL_KELUARGA
								}
							/>
						</header>
						<main className="flex flex-1 flex-col lg:gap-6">
							<div
								className="grid flex-1"
								x-chunk="dashboard-02-chunk-1"
							>
								<LampiranKeluargaContent
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

export default KananDataKeluarga
