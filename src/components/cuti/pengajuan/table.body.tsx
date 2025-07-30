import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import {
	ApprovalCutiStatus,
	getApprovalCutiStatusLabel,
} from "@_types/enums/approval_cuti_status";
import {
	getJenisPengajuanCutiLabel,
	JenisPengajuanCuti,
} from "@_types/enums/jenis_pengajuan_cuti";
import type { Pageable } from "@_types/index";
import type { PegawaiDetail } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { dateToIndonesian } from "@helpers/string";
import { BanIcon } from "lucide-react";
import PengajuanCutiInfoButton from "./button.info";
import PengajuanCutiTableActionButton from "./button.table.action";
import PengajuanCutiClaimTableActionButton from "./button.table.claim";

type PengajuanCutiTableBodyProps = {
	pegawai: PegawaiDetail;
	data: Pageable<CutiPegawai>;
};
const PengajuanCutiTableBody = ({
	pegawai,
	data,
}: PengajuanCutiTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border" align="right" width={60}>
						{urut++}
					</TableCell>
					<TableCell className="border" align="center" width={60}>
						<div className="flex gap-2 justify-center">
							{row.approvalCutiStatus === ApprovalCutiStatus.Enum.APPROVED &&
							row.jenisPengajuanCuti ===
								JenisPengajuanCuti.Enum.PENGAJUAN_CUTI ? (
								<PengajuanCutiClaimTableActionButton data={row} />
							) : row.approvalLevel === 1 &&
								row.approvalCutiStatus === ApprovalCutiStatus.Enum.PENDING ? (
								<PengajuanCutiTableActionButton pegawai={pegawai} data={row} />
							) : null}
							<PengajuanCutiInfoButton pegawai={pegawai} cutiPegawai={row} />
						</div>
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.tanggalPengajuan)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{getJenisPengajuanCutiLabel(row.jenisPengajuanCuti)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{getApprovalCutiStatusLabel(row.approvalCutiStatus)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.jenisCuti.nama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.subJenisCuti?.nama ?? "-"}
					</TableCell>
					<TableCell className="border text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border text-nowrap">{row.nama}</TableCell>
					<TableCell className="border text-nowrap">
						{row.organisasi?.nama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.jabatan?.nama}
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.tanggalMulai)}
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.tanggalSelesai)}
					</TableCell>
					<TableCell className="border text-nowrap" align="right">
						{row.jumlahHariKerja} Hari
					</TableCell>
					<TableCell className="border text-nowrap">{row.alasan}</TableCell>
					<TableCell className="border text-nowrap">
						{row.picSaatIni?.nama ?? "-"}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default PengajuanCutiTableBody;
