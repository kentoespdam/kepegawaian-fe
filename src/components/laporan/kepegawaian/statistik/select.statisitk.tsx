import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { useRouter } from "next/navigation";

const SelectStatistikComponent = ({ slug }: { slug: string }) => {
	const { push } = useRouter();
	const handleOnChange = (value: string) => {
		push(`/laporan/kepegawaian/statistik/${value}`);
	};
	return (
		<Select defaultValue={slug} onValueChange={handleOnChange}>
			<SelectTrigger className="w-auto">
				<SelectValue placeholder="Pilih Jenis Statistik" className="w-auto" />
			</SelectTrigger>
			<SelectContent className="w-auto">
				<SelectItem value="golongan">
					Statistik Berdasarkan Pangkat / Golongan
				</SelectItem>
				<SelectItem value="pendidikan1">
					Statistik Berdasarkan Tingkat Pendidikan #1
				</SelectItem>
				<SelectItem value="pendidikan2">
					Statistik Berdasarkan Tingkat Pendidikan #2
				</SelectItem>
				<SelectItem value="umur">Statistik Berdasarkan Umur</SelectItem>
				<SelectItem value="jenis_kelamin">
					Statistik Berdasarkan Jenis Kelamin
				</SelectItem>
				<SelectItem value="gelar_akademik">
					Statistik Berdasarkan Gelar Pendidikan
				</SelectItem>
				<SelectItem value="agama">Statistik Berdasarkan Agama</SelectItem>
				<SelectItem value="status_pegawai">
					Statistik Berdasarkan Status Kepegawaian
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SelectStatistikComponent;
