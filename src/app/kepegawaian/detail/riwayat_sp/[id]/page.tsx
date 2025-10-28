import type { PegawaiDetail } from "@_types/pegawai"
import RiwayatSpComponent from "@components/kepegawaian/detail/peringatan"
import AddRiwayatSpButton from "@components/kepegawaian/detail/peringatan/button.add.sp"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"

export const metadata = {
	title: "Riwayat Surat Peringatan",
}

const RiwayatSp = async ({ params }: { params: { id: string } }) => {
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: params.id,
		isRoot: true,
	})

	const isKaryawanAktif = ["KARYAWAN_AKTIF", "DIRUMAHKAN"].includes(
		pegawai?.statusKerja
	)

	return !pegawai ? null : (
		<div className="grid min-h-full w-full">
			<div className="gap-0 border-b border-r border-t">
				<div className="grid">
					<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} [{pegawai.nipam}] (
							{pegawai.biodata.nama})
						</span>
						{isKaryawanAktif && (
							<AddRiwayatSpButton pegawaiId={params.id} />
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<RiwayatSpComponent pegawaiId={pegawai.id} />
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default RiwayatSp
