import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import ProfilPendidikanContentComponent from "@components/kepegawaian/profil/pendidikan";
import AddProfilPendidikanButton from "@components/kepegawaian/profil/pendidikan/button.add";
import LampiranPendidikanContent from "@components/kepegawaian/profil/pendidikan/lampiran.index";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Data Pendidikan",
};
const PendukungPage = async ({ params }: { params: { nik: string } }) => {
	const bio = await getDataById<Biodata>({
		path: "profil/biodata",
		id: params.nik,
		isRoot: true,
	});
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} ({bio?.nama})
						</span>
						<AddProfilPendidikanButton nik={params.nik} />
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
