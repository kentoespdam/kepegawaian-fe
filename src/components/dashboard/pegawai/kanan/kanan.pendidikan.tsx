import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import ProfilPendidikanContentComponent from "@components/kepegawaian/profil/pendidikan";
import AddProfilPendidikanButton from "@components/kepegawaian/profil/pendidikan/button.add";
import LampiranPendidikanContent from "@components/kepegawaian/profil/pendidikan/lampiran.index";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";

type KananDataPendidikanProps = {
	biodata: Biodata;
};
const KananDataPendidikan = ({ biodata }: KananDataPendidikanProps) => {
	return (
		<AccordionItem value="data-pendidikan">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Pendidikan
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px]">
								<span className="text-md font-semibold">
									Data Pendidikan ({biodata.nama})
								</span>
								<AddProfilPendidikanButton nik={biodata.nik} />
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<ProfilPendidikanContentComponent biodata={biodata} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px]">
								<span className="text-md font-semibold">Lampiran</span>
								<AddLampiranProfilButton
									jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
								/>
							</header>
							<main className="flex flex-1 flex-col lg:gap-6">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<LampiranPendidikanContent />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KananDataPendidikan;
