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
import StatistikAgamaBar from "./agama"
import StatistikGelarAkademikBar from "./gelar_akademik"
import StatistikGolonganBar from "./golongan"
import StatistikJenisKelaminBar from "./jenis_kelamin"
import StatistikPendidikan1Bar from "./pendidikan1"
import StatistikStatusPegawaiBar from "./status_pegawai"
import StatistikUmurBar from "./umur"
import React from "react"

const componentMap: Record<
	string,
	(data: unknown) => React.JSX.Element | null
> = {
	golongan: (d) => <StatistikGolonganBar data={d as StatistikGolongan[]} />,
	pendidikan1: (d) => (
		<StatistikPendidikan1Bar data={d as StatistikPendidikan1[]} />
	),
	umur: (d) => <StatistikUmurBar data={d as StatistikUmurRoot} />,
	jenis_kelamin: (d) => (
		<StatistikJenisKelaminBar data={d as StatistikJenisKelamin[]} />
	),
	gelar_akademik: (d) => (
		<StatistikGelarAkademikBar data={d as StatistikGelarAkademik[]} />
	),
	agama: (d) => <StatistikAgamaBar data={d as StatistikAgama[]} />,
	status_pegawai: (d) => (
		<StatistikStatusPegawaiBar data={d as StatistikStatusPegawai[]} />
	),
}

const StatistikBarPicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	const render = componentMap[slug]
	return render ? render(statistikData) : null
}

export default StatistikBarPicker
