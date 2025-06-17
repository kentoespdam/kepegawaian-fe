import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import AddProfilPengalamanKerjaButton from "@components/kepegawaian/profil/pengalaman/button/add-button";
import ProfilPengalamanKerjaContentComponent from "@components/kepegawaian/profil/pengalaman/content";
import LampiranPengalamanKerjaContent from "@components/kepegawaian/profil/pengalaman/lampiran";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

export const metadata = {
	title: "Data Pengalaman Kerja",
};

const PengalamanKerjaPage = async ({ params }: { params: { nik: string } }) => {
	const bio = await getDataByIdEnc<Biodata>({
		path: encodeString("profil/biodata"),
		id: encodeString(params.nik),
		isRoot: true,
		isString: true,
	});

	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} ({bio?.nama})
						</span>
						<AddProfilPengalamanKerjaButton nik={params.nik} />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<ProfilPengalamanKerjaContentComponent nik={params.nik} />
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
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<LampiranPengalamanKerjaContent />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default PengalamanKerjaPage;
