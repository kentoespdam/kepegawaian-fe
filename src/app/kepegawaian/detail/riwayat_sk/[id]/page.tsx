import AddLampiranSkButton from "@components/kepegawaian/detail/lampiran/button/add-lampiran";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran/content";
import AddSkButton from "@components/kepegawaian/detail/riwayat_sk/button/add-sk-button";
import RiwayatSkContentComponent from "@components/kepegawaian/detail/riwayat_sk/content";

export const metadata = {
	title: "Riwayat Surat Keputusan",
};

const RiwayatSk = ({ params }: { params: { id: number } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
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
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranSkButton />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
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
