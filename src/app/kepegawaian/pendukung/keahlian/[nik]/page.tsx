import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import ProfilKeahlianContentComponent from "@components/kepegawaian/profil/keahlian/content";
import AddProfilKeahlianButton from "@components/kepegawaian/profil/keahlian/content/button/add-button";
import LampiranKeahlianContent from "@components/kepegawaian/profil/keahlian/lampiran";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";

export const metadata = {
	title: "Data Keahlian",
};
const KeahlianPage = ({ params }: { params: { nik: string } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						<AddProfilKeahlianButton nik={params.nik} />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<ProfilKeahlianContentComponent nik={params.nik} />
						</div>
					</main>
				</div>
			</div>
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranProfilButton
							jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
						/>
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<LampiranKeahlianContent />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default KeahlianPage;
