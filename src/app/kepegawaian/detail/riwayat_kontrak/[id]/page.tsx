import type { Pegawai } from "@_types/pegawai";
import RiwayatKontrakComponent from "@components/kepegawaian/detail/kontrak";
import AddKontrakButton from "@components/kepegawaian/detail/kontrak/button.kontrak.add";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Riwayat Kontrak",
};

const RiwayatKontrakPage = async ({ params }: { params: { id: number } }) => {
	const pegawai = await getDataByIdEnc<Pegawai>({
		path: encodeString("pegawai"),
		id: encodeId(params.id),
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
