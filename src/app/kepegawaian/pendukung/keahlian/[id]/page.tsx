import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import ProfilKeahlianContentComponent from "@components/kepegawaian/profil/keahlian"
import AddProfilKeahlianButton from "@components/kepegawaian/profil/keahlian/button.add"
import LampiranKeahlianContent from "@components/kepegawaian/profil/keahlian/lampiran.index"
import AddLampiranProfilButton from "@components/kepegawaian/profil/lampiran/button/add-lampiran"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import type { PegawaiDetail } from "@_types/pegawai"

export const metadata = {
	title: "Data Keahlian",
}
const KeahlianPage = async ({ params }: { params: { id: string } }) => {
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
							<AddProfilKeahlianButton nik={nik} />
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<ProfilKeahlianContentComponent
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
									JenisLampiranProfil.Values.PROFIL_KEAHLIAN
								}
							/>
						)}
					</header>
					<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<LampiranKeahlianContent
								isKaryawanAktif={isKaryawanAktif}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default KeahlianPage
