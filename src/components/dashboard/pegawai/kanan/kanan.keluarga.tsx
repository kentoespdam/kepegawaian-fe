import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import ProfilKeluargaContentComponent from "@components/kepegawaian/profil/keluarga";
import AddProfilKeluargaButton from "@components/kepegawaian/profil/keluarga/button.add";
import LampiranKeluargaContent from "@components/kepegawaian/profil/keluarga/lampiran.index";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";

const KananDataKeluarga = ({ biodata }: { biodata: Biodata }) => {
	return (
		<AccordionItem value="data-keluarga">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Keluarga
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid min-h-screen w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="w-full flex justify-between items-center border-b bg-muted/40 px-4 lg:h-[60px]">
								<span className="text-md font-semibold">
									Data Keluarga ({biodata.nama})
								</span>
								<AddProfilKeluargaButton nik={biodata.nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<ProfilKeluargaContentComponent biodata={biodata} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">Lampiran</span>
								<AddLampiranProfilButton
									jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<LampiranKeluargaContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KananDataKeluarga;
