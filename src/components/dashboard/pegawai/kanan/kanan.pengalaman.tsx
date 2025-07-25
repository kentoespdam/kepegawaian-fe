import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import ProfilPengalamanKerjaContentComponent from "@components/kepegawaian/profil/pengalaman";
import AddProfilPengalamanKerjaButton from "@components/kepegawaian/profil/pengalaman/button.add";
import LampiranPengalamanKerjaContent from "@components/kepegawaian/profil/pengalaman/lampiran.index";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";

const KananDataPengalamanKerja = ({ biodata }: { biodata: Biodata }) => {
	return (
		<AccordionItem value="data-pengalaman-kerja">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Pengalaman Kerja
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Pengalaman Kerja ({biodata.nama})
								</span>
								<AddProfilPengalamanKerjaButton nik={biodata.nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<ProfilPengalamanKerjaContentComponent biodata={biodata} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">Lampiran</span>
								<AddLampiranProfilButton
									jenis={JenisLampiranProfil.Values.PROFIL_PENGALAMAN_KERJA}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<LampiranPengalamanKerjaContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KananDataPengalamanKerja;
