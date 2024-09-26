import AddKontrakButton from "@components/kepegawaian/detail/kontrak/button/add-kontrak-button";
import RiwayatKontrakComponent from "@components/kepegawaian/detail/kontrak/content";

export const metadata = {
	title: "Riwayat Kontrak",
};

const RiwayatKontrakPage = ({ params }: { params: { id: number } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						<AddKontrakButton pegawaiId={params.id} />
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
