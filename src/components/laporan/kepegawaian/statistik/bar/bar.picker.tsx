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
import StatistikAgamaBar from "./agama";
import StatistikGelarAkademikBar from "./gelar_akademik";
import StatistikGolonganBar from "./golongan";
import StatistikJenisKelaminBar from "./jenis_kelamin";
import StatistikPendidikan1Bar from "./pendidikan1";
import StatistikStatusPegawaiBar from "./status_pegawai";
import StatistikUmurBar from "./umur";

const StatistikBarPicker = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	switch (slug) {
		case "golongan":
			return (
				<StatistikGolonganBar data={statistikData as StatistikGolongan[]} />
			);
		case "pendidikan1":
			return (
				<StatistikPendidikan1Bar
					data={statistikData as StatistikPendidikan1[]}
				/>
			);
		case "umur":
			return <StatistikUmurBar data={statistikData as StatistikUmurRoot} />;
		case "jenis_kelamin":
			return (
				<StatistikJenisKelaminBar
					data={statistikData as StatistikJenisKelamin[]}
				/>
			);
		case "gelar_akademik":
			return (
				<StatistikGelarAkademikBar
					data={statistikData as StatistikGelarAkademik[]}
				/>
			);
		case "agama":
			return <StatistikAgamaBar data={statistikData as StatistikAgama[]} />;
		case "status_pegawai":
			return (
				<StatistikStatusPegawaiBar
					data={statistikData as StatistikStatusPegawai[]}
				/>
			);
		default:
			return null;
	}
};

export default StatistikBarPicker;
