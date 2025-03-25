import type { Pegawai } from "@_types/pegawai";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran";
import AddLampiranSkButton from "@components/kepegawaian/detail/lampiran/button.add.lampiran";
import RiwayatSkContentComponent from "@components/kepegawaian/detail/riwayat_sk";
import AddSkButton from "@components/kepegawaian/detail/riwayat_sk/button.add.sk";
import { getDataById } from "@helpers/action";

export const metadata = {
	title: "Riwayat Surat Keputusan",
};

const RiwayatSk = async ({ params }: { params: { id: number } }) => {
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
						<AddSkButton pegawaiId={params.id} />
					</header>
					<main className="flex flex-1 flex-col">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<RiwayatSkContentComponent pegawaiId={params.id} />
						</div>
					</main>
				</div>
			</div>
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between min-h-5 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranSkButton />
					</header>
					<main className="flex flex-1 flex-col">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<LampiranSkContent pegawaiId={params.id} />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default RiwayatSk;
