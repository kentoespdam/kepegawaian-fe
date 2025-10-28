import type { Pegawai } from "@_types/pegawai"
import LampiranSkContent from "@components/kepegawaian/detail/lampiran"
import AddLampiranSkButton from "@components/kepegawaian/detail/lampiran/button.add.lampiran"
import RiwayatSkContentComponent from "@components/kepegawaian/detail/riwayat_sk"
import AddSkButton from "@components/kepegawaian/detail/riwayat_sk/button.add.sk"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"

export const metadata = {
	title: "Riwayat Surat Keputusan",
}

const RiwayatSk = async ({ params }: { params: { id: string } }) => {
	const pegawai = await getDataByIdEnc<Pegawai>({
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
							{metadata.title} [{pegawai?.nipam}] (
							{pegawai?.biodata.nama})
						</span>
						<AddSkButton pegawaiId={pegawai.id} />
					</header>
					<main className="flex flex-1 flex-col">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<RiwayatSkContentComponent
								pegawaiId={pegawai.id}
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
			<div className="gap-0 border-b border-r border-t">
				<div className="grid">
					<header className="flex min-h-5 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						<AddLampiranSkButton />
					</header>
					<main className="flex flex-1 flex-col">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<LampiranSkContent
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default RiwayatSk
