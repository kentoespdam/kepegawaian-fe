export const metadata = {
	title: "Riwayat Kontrak",
};

const RiwayatKontrak = ({ params }: { params: { id: number } }) => {
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">{metadata.title}</span>
						{/* <AddMutasiButton pegawaiId={params.id} /> */}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							{/* <MutasiContentComponent pegawaiId={params.id} /> */}
						</div>
					</main>
				</div>
			</div>
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						{/* <AddLampiranProfilButton
							jenis={JenisLampiranProfil.Values.KARTU_IDENTITAS}
						/> */}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							{/* <LampiranKartuIdentitasContent /> */}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default RiwayatKontrak;
