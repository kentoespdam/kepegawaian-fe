import type { PegawaiDetail } from "@_types/pegawai";
import PengajuanCutiComponent from "@components/cuti/pengajuan";
import AddPengajuanCutiButton from "@components/cuti/pengajuan/button.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { getCurrentUser } from "@lib/appwrite/user";
import { Suspense } from "react";

export const metadata = {
	title: "Pengajuan Cuti",
};
const PengajuanCutiPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: encodeString(user.$id),
		isRoot: true,
		isString: true,
	});

	return pegawai === null ? null : (
		<Card className="max-w-full sm:max-w-[80vw] md:max-w-full">
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
