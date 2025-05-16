import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import LampiranSpDetailComponent from "@components/kepegawaian/detail/peringatan/file.index";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";
import { getDataById } from "@helpers/action";
import { ArrowLeftIcon } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Lampiran Surat Peringatan",
};

const LampiranSpPage = async ({
	params,
}: { params: Promise<{ pegawaiId: number; id: number }> }) => {
	const riwayatSp = await getDataById<RiwayatSp>({
		path: "kepegawaian/riwayat/sp",
		id: (await params).id,
		isRoot: true,
	});
	if (riwayatSp.pegawaiId !== +(await params).pegawaiId)
		return redirect(`/kepegawaian/detail/riwayat_sp/${(await params).id}`);

	return (
		<Card>
			<CardHeader className="flex flex-row gap-2 items-center">
				<ButtonLink
					title="Kembali"
					icon={<ArrowLeftIcon className="h-4 w-4" />}
					href={`/kepegawaian/detail/riwayat_sp/${(await params).pegawaiId}`}
					variant="destructive"
				/>
				<span className="text-2xl">{metadata.title}</span>
			</CardHeader>
			<Separator className="mb-4" />
			<CardContent>
				<LampiranSpDetailComponent id={(await params).id} />
			</CardContent>
		</Card>
	);
};

export default LampiranSpPage;
