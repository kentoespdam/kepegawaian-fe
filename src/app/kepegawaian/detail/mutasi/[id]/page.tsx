import type { Pegawai } from "@_types/pegawai";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran";
import AddLampiranSkButton from "@components/kepegawaian/detail/lampiran/button.add.lampiran";
import MutasiContentComponent from "@components/kepegawaian/detail/mutasi";
import { getDataById } from "@helpers/action";
import ButtonAddBuilder from "@src/components/builder/button/add";

export const metadata = {
	title: "Data Mutasi Pegawai",
};

const DetailMutasi = async ({
	params,
}: { params: Promise<{ id: number }> }) => {
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: (await params).id,
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
						<ButtonAddBuilder
							href={`/kepegawaian/mutasi/${(await params).id}/add`}
							msg="Tambah Mutasi"
						/>
					</header>
					<main className="flex flex-1 flex-col">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<MutasiContentComponent pegawaiId={(await params).id} />
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
							<LampiranSkContent />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default DetailMutasi;
