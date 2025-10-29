import type {
	StatistikAgama,
	StatistikGelarAkademik,
	StatistikGolongan,
	StatistikJenisKelamin,
	StatistikPendidikan1,
	StatistikStatusPegawai,
	StatistikUmurRoot,
} from "@_types/laporan/kepegawaian/lap_statistik"
import type { StatistikComponentProps } from ".."
import StatistikAgamaTable from "./agama"
import StatistikGelarAkademikTable from "./gelar_akademik"
import StatistikGolonganTable from "./golongan"
import StatistikJenisKelaminTable from "./jenis_kelamin"
import TableStatistikPendidikan1Component from "./pendidikan1"
import StatistikStatusPegawaiTable from "./status_pegawai"
import StatistikUmurTable from "./umur"

const componentMap: Record<string, (data: unknown) => JSX.Element | null> = {
	golongan: (data) => (
		<StatistikGolonganTable data={data as StatistikGolongan[]} />
	),
	pendidikan1: (data) => (
		<TableStatistikPendidikan1Component
			data={data as StatistikPendidikan1[]}
		/>
	),
	umur: (data) => <StatistikUmurTable data={data as StatistikUmurRoot} />,
	jenis_kelamin: (data) => (
		<StatistikJenisKelaminTable data={data as StatistikJenisKelamin[]} />
	),
	gelar_akademik: (data) => (
		<StatistikGelarAkademikTable data={data as StatistikGelarAkademik[]} />
	),
	agama: (data) => <StatistikAgamaTable data={data as StatistikAgama[]} />,
	status_pegawai: (data) => (
		<StatistikStatusPegawaiTable data={data as StatistikStatusPegawai[]} />
	),
}

const StatistikTablePicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	const render = componentMap[slug]
	return render ? render(statistikData) : null
}

export default StatistikTablePicker
