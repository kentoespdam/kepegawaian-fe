import type { Pegawai } from "@_types/pegawai";
import ProsesGajiComponent from "@components/penggajian/proses_gaji";
import AddProsesGajiButon from "@components/penggajian/proses_gaji/button.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getDataById } from "@helpers/action";
import { getCurrentUser } from "@lib/appwrite/user";
import { Suspense } from "react";

export const metadata = {
	title: "Proses Gaji",
};
const ProsesGajiPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataById<Pegawai>({
		path: "pegawai",
		id: user.$id,
		isRoot: true,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					<span className="text-md font-semibold">{metadata.title}</span>
					<Suspense fallback={<div>Loading...</div>}>
						<AddProsesGajiButon pegawai={pegawai} />
					</Suspense>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid col-span-2">
				<Suspense>
					<ProsesGajiComponent pegawai={pegawai} />
				</Suspense>
			</CardContent>
		</Card>
	);
};

export default ProsesGajiPage;
