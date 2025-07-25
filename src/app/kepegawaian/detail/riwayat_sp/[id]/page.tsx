import type { PegawaiDetail } from "@_types/pegawai";
import RiwayatSpComponent from "@components/kepegawaian/detail/peringatan";
import AddRiwayatSpButton from "@components/kepegawaian/detail/peringatan/button.add.sp";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";

export const metadata = {
	title: "Riwayat Surat Peringatan",
};

const RiwayatSp = async ({ params }: { params: { id: number } }) => {
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
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
						<AddRiwayatSpButton pegawaiId={params.id} />
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
							<RiwayatSpComponent pegawaiId={params.id} />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default RiwayatSp;
