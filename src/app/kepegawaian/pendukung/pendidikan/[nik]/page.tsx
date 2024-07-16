import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import ProfilPendidikanContentComponent from "@components/kepegawaian/profil/pendidikan/content";
import LampiranPendidikanContent from "@components/kepegawaian/profil/pendidikan/lampiran";

export const metadata = {
	title: "Data Pendidikan",
};
const PendukungPage = ({ params }: { params: { nik: string } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						<AddLampiranProfilButton
							jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
						/>
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<ProfilPendidikanContentComponent nik={params.nik} />
						</div>
					</main>
				</div>
			</div>
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranProfilButton
							jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
						/>
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<LampiranPendidikanContent />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default PendukungPage;
