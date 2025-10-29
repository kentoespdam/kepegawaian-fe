import {
	getKeyStatusProsesGaji,
	STATUS_PROSES_GAJI,
} from "@_types/enums/status_proses_gaji"
import type { Pageable } from "@_types/index"
import type { Organisasi } from "@_types/master/organisasi"
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master"
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root"
import GajiBatchMasterProcessTable from "@components/penggajian/gaji_batch_master_process/table"
import VerifPhase1Component from "@components/penggajian/verif_phase_1"
import VerifPhase1MainFilter from "@components/penggajian/verif_phase_1/filter.main"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"
import { getListData, globalGetData } from "@helpers/action"
import getAppData from "@lib/app-data"
import { cn } from "@lib/utils"
import { Suspense } from "react"

export const metadata = {
	title: "Verifikasi Gapok, Tunjangan & Potongan",
}

const VerifikasiPhase1Page = async ({
	searchParams,
}: {
	searchParams: Promise<{
		[key: string]: string | undefined
	}>
}) => {
	const search = new URLSearchParams()
	const { periode = "", nama } = await searchParams
	if (periode !== "") search.set("periode", periode)
	search.set(
		"status",
		getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_1)
	)
	if (nama) search.set("nama", nama)

	const { pegawai } = await getAppData()

	const organisasiList = await getListData<Organisasi>({
		path: "organisasi",
		searchParams: "levelOrg=4",
	})

	const direksi: Organisasi = {
		id: 1,
		nama: "DIREKSI",
		kode: "1",
		levelOrganisasi: 2,
		parent: null,
	}
	// append direksi to organisasiList
	organisasiList.push(direksi)
	organisasiList.sort((a, b) => a.id - b.id)

	const gajiBatchRoot = await globalGetData<Pageable<GajiBatchRoot>>({
		path: `penggajian/batch/${periode}/periode/${getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_1)}/status`,
		isRoot: true,
	})

	const gajiBatchMasters = await globalGetData<GajiBatchMaster[]>({
		path: "penggajian/batch/master",
		searchParams: search.toString(),
		isRoot: true,
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row items-center justify-between">
					<span className="text-md font-semibold">
						{metadata.title}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="col-span-2 grid h-fit gap-2">
				<Suspense>
					<VerifPhase1MainFilter
						pegawai={pegawai}
						gajiBatchRoot={gajiBatchRoot}
					/>
				</Suspense>
				<Separator />
				<div
					className={cn(
						"grid gap-4",
						"sm:grid-cols-1",
						"lg:grid-cols-12",
						"md:grid-cols-12"
					)}
				>
					<div className="sm:col-lg-12 col-span-8 border-r">
						<Suspense>
							<VerifPhase1Component
								organisasiList={organisasiList}
								gajiBatchMasters={gajiBatchMasters}
							/>
						</Suspense>
					</div>
					<div className="sm:col-lg-12 col-span-4">
						<GajiBatchMasterProcessTable />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default VerifikasiPhase1Page
