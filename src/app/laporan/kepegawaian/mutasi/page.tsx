import type { FilterMutasiSchema, Mutasi } from "@_types/kepegawaian/mutasi";
import LapMutasiComponent from "@components/laporan/kepegawaian/mutasi";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { globalGetData } from "@helpers/action";

export const metadata = {
	title: "Mutasi Karyawan",
};

const skrng = new Date();
const bulan =
	skrng.getMonth() + 1 < 10 ? `0${skrng.getMonth() + 1}` : skrng.getMonth() + 1;
const tanggal = skrng.getDate() < 10 ? `0${skrng.getDate()}` : skrng.getDate();
const tglSkrng = `${skrng.getFullYear()}-${bulan}-${tanggal}`;
const MutasiPage = async ({
	searchParams,
}: {
	searchParams: FilterMutasiSchema;
}) => {
	const {
		jenisMutasi = "MUTASI_LOKER",
		tglAwal = tglSkrng,
		tglAkhir = tglSkrng,
	} = searchParams;
	const url = `laporan/kepegawaian/mutasi/${tglAwal}/${tglAkhir}`;
	const data = await globalGetData<Mutasi[]>({
		path: url,
		isRoot: true,
		searchParams: `jenis_mutasi=${jenisMutasi}`,
	});
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						{metadata.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<LapMutasiComponent
						data={data}
						jenisMutasi={jenisMutasi}
						tglAwal={tglAwal}
						tglAkhir={tglAkhir}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default MutasiPage;
