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
import StatistikAgamaPie from "./agama"
import StatistikGelarAkademikPie from "./gelar_akademik"
import StatistikGolonganPie from "./golongan"
import StatistikJenisKelaminPie from "./jenis_kelamin"
import StatistikPendidikan1Pie from "./pendidikan1"
import StatistikStatusPegawaiPie from "./status_pegawai"
import StatistikUmurPie from "./umur"
import React from "react"

const componentMap: Record<
	string,
	(data: unknown) => React.JSX.Element | null
> = {
	agama: (data) => <StatistikAgamaPie data={data as StatistikAgama[]} />,
	gelar_akademik: (data) => (
		<StatistikGelarAkademikPie data={data as StatistikGelarAkademik[]} />
	),
	golongan: (data) => (
		<StatistikGolonganPie data={data as StatistikGolongan[]} />
	),
	jenis_kelamin: (data) => (
		<StatistikJenisKelaminPie data={data as StatistikJenisKelamin[]} />
	),
	pendidikan1: (data) => (
		<StatistikPendidikan1Pie data={data as StatistikPendidikan1[]} />
	),
	status_pegawai: (data) => (
		<StatistikStatusPegawaiPie data={data as StatistikStatusPegawai[]} />
	),
	umur: (data) => <StatistikUmurPie data={data as StatistikUmurRoot} />,
}

const StatistikPiePicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	const render = componentMap[slug]
	return render ? render(statistikData) : null
}

export default StatistikPiePicker
