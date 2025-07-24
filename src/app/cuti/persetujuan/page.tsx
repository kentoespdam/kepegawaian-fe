import type { PegawaiDetail } from "@_types/pegawai";
import PersetujuanCutiComponent from "@components/cuti/persetujuan";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getDataById } from "@helpers/action";
import { getCurrentUser } from "@lib/appwrite/user";
import { Suspense } from "react";

export const metadata = {
	title: "Persetujuan Cuti",
};
const PersetujuanCutiPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataById<PegawaiDetail>({
		path: "pegawai",
		id: user.$id,
		isRoot: true,
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
