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
import StatistikAgamaPie from "./agama";
import StatistikGelarAkademikPie from "./gelar_akademik";
import StatistikGolonganPie from "./golongan";
import StatistikJenisKelaminPie from "./jenis_kelamin";
import StatistikPendidikan1Pie from "./pendidikan1";
import StatistikStatusPegawaiPie from "./status_pegawai";
import StatistikUmurPie from "./umur";

const StatistikPiePicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	switch (slug) {
		case "golongan":
			return (
				<StatistikGolonganPie data={statistikData as StatistikGolongan[]} />
			);
		case "pendidikan1":
			return (
				<StatistikPendidikan1Pie
					data={statistikData as StatistikPendidikan1[]}
				/>
			);
		case "umur":
			return <StatistikUmurPie data={statistikData as StatistikUmurRoot} />;
		case "jenis_kelamin":
			return (
				<StatistikJenisKelaminPie
					data={statistikData as StatistikJenisKelamin[]}
				/>
			);
		case "gelar_akademik":
			return (
				<StatistikGelarAkademikPie
					data={statistikData as StatistikGelarAkademik[]}
				/>
			);
		case "agama":
			return <StatistikAgamaPie data={statistikData as StatistikAgama[]} />;
		case "status_pegawai":
			return (
				<StatistikStatusPegawaiPie
					data={statistikData as StatistikStatusPegawai[]}
				/>
			);
		default:
			return null;
	}
};

export default StatistikPiePicker;
