import { Users } from "lucide-react";
import { Suspense } from "react";
import { getPegawaiSession } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
	const { pegawai, nik } = await getPegawaiSession();

	if (!pegawai) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
					<Users className="size-8 text-muted-foreground" />
				</div>
				<h2 className="text-lg font-semibold text-foreground mb-2">Akun ini tidak terhubung ke data pegawai</h2>
				<p className="text-sm text-muted-foreground">Hubungi administrator untuk menghubungkan akun Anda.</p>
			</div>
		);
	}

	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat dashboard...</div>}>
			<DashboardClient pegawai={pegawai} nik={nik} />
		</Suspense>
	);
}
