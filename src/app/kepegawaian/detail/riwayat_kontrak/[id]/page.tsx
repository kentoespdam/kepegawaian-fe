import type { Pegawai } from "@_types/pegawai";
import AddKontrakButton from "@components/kepegawaian/detail/kontrak/button/add-kontrak-button";
import RiwayatKontrakComponent from "@components/kepegawaian/detail/kontrak/content";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Riwayat Kontrak",
};

const RiwayatKontrakPage = async ({ params }: { params: { id: number } }) => {
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: params.id,
		isRoot: true,
	});

	return (
		<div className="grid min-h-full w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} [{pegawai?.nipam}] ({pegawai?.biodata.nama})
						</span>
						<AddKontrakButton pegawai={pegawai} />
					</header>
					<main className="flex flex-1 flex-col">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<RiwayatKontrakComponent pegawaiId={params.id} />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default RiwayatKontrakPage;
