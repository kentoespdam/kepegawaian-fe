import type { CutiApprovalChain } from "@_types/cuti/cuti.approval.chain";
import type { PegawaiDetail } from "@_types/pegawai";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import Link from "next/link";

const DashboardCutiCard = async ({ pegawai }: { pegawai: PegawaiDetail }) => {
	const tahun = new Date().getFullYear();
	const dataPersetujuan = await getPageDataEnc<CutiApprovalChain>({
		path: encodeString("cuti/pengajuan/approval"),
		isRoot: true,
		searchParams: `picSaatIniId=${pegawai.jabatan.id}&tahun=${tahun}&approvalCutiStatus=PENDING`,
	});
	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>Data Persetujuan Cuti</CardDescription>
				<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<Link
						href={`/cuti/persetujuan?tahun=${tahun}&approvalCutiStatus=PENDING`}
                        className="text-info"
					>
						{dataPersetujuan.totalElements} Pengajuan Pending
					</Link>
				</CardTitle>
			</CardHeader>
		</Card>
	);
};

export default DashboardCutiCard;
