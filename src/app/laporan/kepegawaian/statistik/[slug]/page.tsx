import StatistikComponent from "@components/laporan/kepegawaian/statistik"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { globalGetData } from "@helpers/action"
import { BaseLaporanStatistik } from "@_types/laporan/kepegawaian/lap_statistik"

const urlMapping = (slug: string, params: { [key: string]: string }) => {
	const basePath = `laporan/kepegawaian/statistik/${slug}`
	if (slug === "pendidikan2") {
		const now = new Date()
		const tahun = params.tahun ?? now.getFullYear()
		const bulan = params.bulan ?? now.getMonth() + 1
		return `${basePath}/${tahun}/${bulan}`
	}
	return basePath
}

export const metadata = {
	title: "Laporan Statistik Pegawai",
}
const StatistikPage = async ({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string }
}) => {
	const { slug } = params
	const path = urlMapping(slug, searchParams)
	const statistikData = await globalGetData<BaseLaporanStatistik[]>({
		path: path,
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>{metadata.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<StatistikComponent slug={slug} statistikData={statistikData} />
			</CardContent>
		</Card>
	)
}

export default StatistikPage
