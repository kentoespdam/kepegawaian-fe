import AddLampiranSkButton from "@components/kepegawaian/detail/lampiran/button/add-lampiran";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran/content";
import AddMutasiButton from "@components/kepegawaian/detail/mutasi/button/add-mutasi-button";
import MutasiContentComponent from "@components/kepegawaian/detail/mutasi/content";

export const metadata = {
	title: "Data Mutasi Pegawai",
};

const DetailMutasi = ({ params }: { params: { id: number } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						{<AddMutasiButton pegawaiId={params.id} />}
					</header>
					<main className="flex flex-1 flex-col">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<MutasiContentComponent pegawaiId={params.id} />
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

export default DetailMutasi;
