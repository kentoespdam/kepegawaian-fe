import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";
import type { Biodata } from "@_types/profil/biodata";
import { useQuery } from "@tanstack/react-query";
import { getDataById, getListData, getPageData, globalGetData } from "@helpers/action";
import type { Pendidikan } from "@_types/profil/pendidikan";

interface InformasiAkademikProps {
	bio?: Biodata;
}
const InformasiAkademik = ({ bio }: InformasiAkademikProps) => {
	const {data} = useQuery({
		queryKey: ["informasi-akademik", bio?.nik],
		queryFn: async () => {
			const result = await getPageData<Pendidikan>({
				path: "profil/pendidikan",
				searchParams: `nik=${bio?.nik}&isLatest=true`,
				isRoot: true,
			});
			return result;
		},
		enabled: !!bio?.nik,
	});

	return (
		<Fieldset title="Informasi Akademik">
			<div className="w-full grid gap-1">
				<RingkasanContent
					field="Pendidikan Terakhir"
					value={data?.content[0].jenjangPendidikan.nama}
				/>
				<RingkasanContent field="Lembaga Pendidikan" value={data?.content[0].institusi} />
				<RingkasanContent field="Tahun Kelulusan" value={data?.content[0].tahunLulus?.toString()} />
			</div>
		</Fieldset>
	);
};

export default InformasiAkademik;
