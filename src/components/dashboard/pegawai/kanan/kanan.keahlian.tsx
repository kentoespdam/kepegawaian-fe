import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import ProfilKeahlianContentComponent from "@components/kepegawaian/profil/keahlian";
import AddProfilKeahlianButton from "@components/kepegawaian/profil/keahlian/button.add";
import LampiranKeahlianContent from "@components/kepegawaian/profil/keahlian/lampiran.index";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";

const KananDataKeahlian = ({ nik, nama }: { nik: string; nama: string }) => {
	return (
		<AccordionItem value="data-keahlian">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Keahlian
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Keahlian ({nama})
								</span>
								<AddProfilKeahlianButton nik={nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<ProfilKeahlianContentComponent nik={nik} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">Lampiran</span>
								<AddLampiranProfilButton
									jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<LampiranKeahlianContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KananDataKeahlian;
