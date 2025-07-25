import type { PegawaiRingkas } from "@_types/pegawai";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store";
import { useQuery } from "@tanstack/react-query";
import InformasiAkademik from "./informasi-akademik";
import InformasiKepegawaian from "./informasi-kepegawaian";
import InformasiUmum from "./informasi-umum";

const RingkasanBiodata = () => {
	const { pegawaiId } = useRingkasanPegawaiStore();

	const { data } = useQuery({
		queryKey: ["pegawai-ringkasan", pegawaiId],
		queryFn: async () =>
			await getDataByIdEnc<PegawaiRingkas>({
				path: encodeString("pegawai"),
				id: encodeString(`${pegawaiId}/ringkasan`),
				isRoot: true,
				isString: true,
			}),
		enabled: !!pegawaiId,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Ringkasan Data Karyawan</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-2">
				<InformasiUmum pegawai={data} />
				<InformasiAkademik pegawai={data} />
				<InformasiKepegawaian pegawai={data} />
			</CardContent>
		</Card>
	);
};

export default RingkasanBiodata;
