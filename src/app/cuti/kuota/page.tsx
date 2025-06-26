import CutiKuotaComponent from "@components/cuti/kuota";
import AddKuotaCutiButton from "@components/cuti/kuota/add.button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = { title: "Kuota Cuti Pegawai" };
const KuotaCutiPage = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					<span className="text-md font-semibold">{metadata.title}</span>
					<Suspense>
						<AddKuotaCutiButton />
					</Suspense>
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
