import DashboardPanelKananComponent from "@components/dashboard/pegawai/kanan"
import DashboardPanelKiriComponent from "@components/dashboard/pegawai/kiri"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@components/ui/resizable"
import getAppData from "@lib/app-data"

export const metadata = { title: "Dashboard Pegawai" }
const DashboardPage = async () => {
	const appData = await getAppData()
	const { pegawai } = appData
	const isKaryawanAktif = ["KARYAWAN_AKTIF", "DIRUMAHKAN"].includes(
		pegawai?.statusKerja
	)
	return (
		<>
			<div className="grid gap-2">
				<ResizablePanelGroup
					direction="horizontal"
					className="w-full rounded-lg border"
				>
					<ResizablePanel defaultSize={30}>
						<DashboardPanelKiriComponent pegawai={pegawai} />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel>
						<DashboardPanelKananComponent
							pegawai={pegawai}
							isKaryawanAktif={isKaryawanAktif}
						/>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
			<div id="clone-gaji-content" className="p-4" />
		</>
	)
}

export default DashboardPage
