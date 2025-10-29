import type { KenaikanBerkala } from "@_types/laporan/kepegawaian/dkb"
import LapKenaikanBerkalaComponent from "@components/laporan/kepegawaian/dkb"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { globalGetData } from "@helpers/action"

export const metadata = {
	title: "Daftar Kenaikan Gaji/Pangkat Berkala",
}

const FILTER_TYPES = {
	BULAN_INI: "BULAN_INI",
} as const

const JENIS_SK = {
	GOLONGAN: "SK_KENAIKAN_PANGKAT_GOLONGAN",
	GAJI: "SK_KENAIKAN_GAJI_BERKALA",
} as const

const URL_ENDPOINT = "laporan/kepegawaian/kenaikan_berkala"

const getPageTitle = (slug: string) =>
	`Daftar Kenaikan ${slug === "golongan" ? "Pangkat/Golongan" : "Gaji Berkala"}`

const buildSearchParams = (slug: string, filter: string) => {
	const params = new URLSearchParams()
	params.set("filter", filter)
	params.set(
		"jenisSk",
		slug === "golongan" ? JENIS_SK.GOLONGAN : JENIS_SK.GAJI
	)
	return params
}

const DaftarKenaikanBerkalaPage = async ({
	params,
	searchParams,
}: {
	params: {
		slug: string
	}
	searchParams: { [key: string]: string | undefined }
}) => {
	const { slug } = params

	const filter = searchParams?.filter || FILTER_TYPES.BULAN_INI

	const urlParams = buildSearchParams(slug, filter)
	const data = await globalGetData<KenaikanBerkala[]>({
		path: URL_ENDPOINT,
		isRoot: true,
		searchParams: urlParams.toString(),
	})

	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row items-center justify-between">
						Daftar Kenaikan {getPageTitle(slug)}
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<LapKenaikanBerkalaComponent data={data} filter={filter} />
				</CardContent>
			</Card>
		</div>
	)
}

export default DaftarKenaikanBerkalaPage
