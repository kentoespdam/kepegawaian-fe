import type { PegawaiDetail } from "@_types/pegawai";
import PengajuanCutiComponent from "@components/cuti/pengajuan";
import AddPengajuanCutiButton from "@components/cuti/pengajuan/button.add";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { getDataById } from "@helpers/action";
import { getCurrentUser } from "@lib/appwrite/user";
import { Suspense } from "react";

export const metadata = {
	title: "Pengajuan Cuti",
};
const PengajuanCutiPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataById<PegawaiDetail>({
		path: "pegawai",
		id: user.$id,
		isRoot: true,
	});

	return pegawai === null ? null : (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					<span className="text-md font-semibold">{metadata.title}</span>
					<Suspense>
						<AddPengajuanCutiButton pegawai={pegawai} />
					</Suspense>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				<Suspense fallback={<div>Loading</div>}>
					<PengajuanCutiComponent pegawai={pegawai} />
				</Suspense>
			</CardContent>
		</Card>
	);
};

export default PengajuanCutiPage;
