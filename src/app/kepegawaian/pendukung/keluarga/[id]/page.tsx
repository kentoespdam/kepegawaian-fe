import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import ProfilKeluargaContentComponent from "@components/kepegawaian/profil/keluarga"
import AddProfilKeluargaButton from "@components/kepegawaian/profil/keluarga/button.add"
import LampiranKeluargaContent from "@components/kepegawaian/profil/keluarga/lampiran.index"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import type { PegawaiDetail } from "@_types/pegawai"

export const metadata = {
	title: "Data Keluarga",
}
const KeluargaPage = async ({ params }: { params: { id: string } }) => {
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
							<AddProfilKeluargaButton nik={nik} />
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<ProfilKeluargaContentComponent
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
									JenisLampiranProfil.Values.PROFIL_KELUARGA
								}
							/>
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<LampiranKeluargaContent
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default KeluargaPage
