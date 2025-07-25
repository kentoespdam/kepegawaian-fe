import type { Pegawai } from "@_types/pegawai";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Data Penggunaan Hak Cuti",
};

const DetailCuti = async ({ params }: { params: { id: number } }) => {
	const pegawai = await getDataByIdEnc<Pegawai>({
		path: encodeString("pegawai"),
		id: encodeId(params.id),
		isRoot: true,
	});
	return (
		<div className="grid min-h-screen w-full">
			<div className="border-t border-r border-b gap-0">
				<div className="grid">
					<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} [{pegawai?.nipam}] ({pegawai?.biodata.nama})
						</span>
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

export default DetailCuti;
