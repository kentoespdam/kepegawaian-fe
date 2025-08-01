import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { Biodata } from "@_types/profil/biodata";
import ProfilKeahlianContentComponent from "@components/kepegawaian/profil/keahlian";
import AddProfilKeahlianButton from "@components/kepegawaian/profil/keahlian/button.add";
import LampiranKeahlianContent from "@components/kepegawaian/profil/keahlian/lampiran.index";
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";

export const metadata = {
	title: "Data Keahlian",
};
const KeahlianPage = async ({ params }: { params: { nik: string } }) => {
	const bio = await getDataByIdEnc<Biodata>({
		path: encodeString("profil/biodata"),
		id: params.nik,
		isRoot: true,
		isString: true,
	});

	return !bio ? (
		<div>Loading...</div>
	) : (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} ({bio.nama})
						</span>
						<AddProfilKeahlianButton nik={bio.nik} />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<ProfilKeahlianContentComponent biodata={bio} />
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
