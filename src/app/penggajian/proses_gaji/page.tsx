import ProsesGajiComponent from "@components/penggajian/proses_gaji"
import AddProsesGajiButon from "@components/penggajian/proses_gaji/button.add"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Suspense } from "react"
import getAppData from "@lib/app-data"

export const metadata = {
	title: "Proses Gaji",
}
const ProsesGajiPage = async () => {
	const { pegawai } = await getAppData()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row items-center justify-between">
					<span className="text-md font-semibold">
						{metadata.title}
					</span>
					<Suspense fallback={<div>Loading...</div>}>
						<AddProsesGajiButon pegawai={pegawai} />
					</Suspense>
				</CardTitle>
			</CardHeader>
			<CardContent className="col-span-2 grid">
				<Suspense>
					<ProsesGajiComponent pegawai={pegawai} />
				</Suspense>
			</CardContent>
		</Card>
	)
}

export default ProsesGajiPage
