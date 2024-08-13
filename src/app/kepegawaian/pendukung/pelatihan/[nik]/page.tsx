import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import AddProfilPelatihanButton from "@components/kepegawaian/profil/pelatihan/button/add-button";
import ProfilPelatihanContentComponent from "@components/kepegawaian/profil/pelatihan/content";
import LampiranPelatihanContent from "@components/kepegawaian/profil/pelatihan/lampiran";

export const metadata = {
	title: "Data Pelatihan",
};

const PelatihanPage = ({ params }: { params: { nik: string } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						<AddProfilPelatihanButton nik={params.nik} />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<ProfilPelatihanContentComponent nik={params.nik} />
						</div>
					</main>
				</div>
			</div>
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranProfilButton
							jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
						/>
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<LampiranPelatihanContent />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default PelatihanPage;
