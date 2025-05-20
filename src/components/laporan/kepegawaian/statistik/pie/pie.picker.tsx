import type {
	StatistikGelarAkademik,
	StatistikGolongan,
	StatistikJenisKelamin,
	StatistikPendidikan1,
	StatistikUmurRoot,
} from "@_types/laporan/kepegawaian/LapStatistik";
import type { StatistikComponentProps } from "..";
import StatistikGolonganPie from "./golongan";
import StatistikJenisKelaminPie from "./jenis_kelamin";
import StatistikPendidikan1Pie from "./pendidikan1";
import StatistikUmurPie from "./umur";
import StatistikGelarAkademikPie from "./gelar_akademik";

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
		default:
			return null;
	}
};

export default StatistikPiePicker;
