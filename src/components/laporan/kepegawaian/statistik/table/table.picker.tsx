import type {
	StatistikAgama,
	StatistikGelarAkademik,
	StatistikGolongan,
	StatistikJenisKelamin,
	StatistikPendidikan1,
	StatistikStatusPegawai,
	StatistikUmurRoot,
} from "@_types/laporan/kepegawaian/LapStatistik";
import type { StatistikComponentProps } from "..";
import StatistikAgamaTable from "./agama";
import StatistikGelarAkademikTable from "./gelar_akademik";
import StatistikGolonganTable from "./golongan";
import StatistikJenisKelaminTable from "./jenis_kelamin";
import TableStatistikPendidikan1Component from "./pendidikan1";
import StatistikStatusPegawaiTable from "./status_pegawai";
import StatistikUmurTable from "./umur";

const StatistikTablePicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	switch (slug) {
		case "golongan":
			return (
				<StatistikGolonganTable data={statistikData as StatistikGolongan[]} />
			);
		case "pendidikan1":
			return (
				<TableStatistikPendidikan1Component
					data={statistikData as StatistikPendidikan1[]}
				/>
			);
		case "umur":
			return <StatistikUmurTable data={statistikData as StatistikUmurRoot} />;
		case "jenis_kelamin":
			return (
				<StatistikJenisKelaminTable
					data={statistikData as StatistikJenisKelamin[]}
				/>
			);
		case "gelar_akademik":
			return (
				<StatistikGelarAkademikTable
					data={statistikData as StatistikGelarAkademik[]}
				/>
			);
		case "agama":
			return <StatistikAgamaTable data={statistikData as StatistikAgama[]} />;
		case "status_pegawai":
			return (
				<StatistikStatusPegawaiTable
					data={statistikData as StatistikStatusPegawai[]}
				/>
			);
		default:
			return null;
	}
};

export default StatistikTablePicker;
