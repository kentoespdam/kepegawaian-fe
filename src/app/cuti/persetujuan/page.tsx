import type { PegawaiDetail } from "@_types/pegawai";
import PersetujuanCutiComponent from "@components/cuti/persetujuan";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { getCurrentUser } from "@lib/appwrite/user";
import { Suspense } from "react";

export const metadata = {
	title: "Persetujuan Cuti",
};
const PersetujuanCutiPage = async () => {
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
				</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				<Suspense fallback={<div>Loading</div>}>
					<PersetujuanCutiComponent pegawai={pegawai} />
				</Suspense>
			</CardContent>
		</Card>
	);
};

export default PersetujuanCutiPage;
