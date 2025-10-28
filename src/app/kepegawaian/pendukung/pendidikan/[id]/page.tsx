import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import ProfilPendidikanContentComponent from "@components/kepegawaian/profil/pendidikan"
import AddProfilPendidikanButton from "@components/kepegawaian/profil/pendidikan/button.add"
import LampiranPendidikanContent from "@components/kepegawaian/profil/pendidikan/lampiran.index"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import type { PegawaiDetail } from "@_types/pegawai"

export const metadata = {
	title: "Data Pendidikan",
}
const PendukungPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: id,
		isRoot: true,
	})

	const { statusKerja, biodata } = pegawai
	const { nik, nama } = biodata

	const isKaryawanAktif = ["KARYAWAN_AKTIF", "DIRUMAHKAN"].includes(
		statusKerja
	)

	return !biodata ? null : (
		<div className="grid min-h-screen w-full">
			<div className="gap-0 border-b border-r border-t">
				<div className="grid">
					<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							{metadata.title} ({nama})
						</span>
						{isKaryawanAktif && (
							<AddProfilPendidikanButton nik={nik} />
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<ProfilPendidikanContentComponent
								biodata={biodata}
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
			<div className="gap-0 border-b border-r border-t">
				<div className="grid">
					<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">Lampiran</span>
						{isKaryawanAktif && (
							<AddLampiranProfilButton
								jenis={
									JenisLampiranProfil.Values.PROFIL_PENDIDIKAN
								}
							/>
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<LampiranPendidikanContent
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default PendukungPage
