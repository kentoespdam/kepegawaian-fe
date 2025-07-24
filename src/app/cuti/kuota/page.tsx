import CutiKuotaComponent from "@components/cuti/kuota";
import AddKuotaCutiBatchButton from "@components/cuti/kuota/button.add.batch";
import AddKuotaCutiButton from "@components/cuti/kuota/button.add";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";
import DownloadTemplateKuotaCutiButton from "@components/cuti/kuota/button.download.template";

export const metadata = { title: "Kuota Cuti Pegawai" };
const KuotaCutiPage = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					<span className="text-md font-semibold">{metadata.title}</span>
					<div className="flex gap-2">
						<DownloadTemplateKuotaCutiButton />
						<AddKuotaCutiBatchButton />
						<AddKuotaCutiButton />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				<Suspense fallback={<div>Loading</div>}>
					<CutiKuotaComponent />
				</Suspense>
			</CardContent>
		</Card>
	);
};

export default KuotaCutiPage;
