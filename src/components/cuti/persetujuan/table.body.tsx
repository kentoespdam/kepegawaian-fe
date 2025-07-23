import type { CutiApprovalChain } from "@_types/cuti/cuti.approval.chain";
import { getApprovalCutiStatusLabel } from "@_types/enums/approval_cuti_status";
import { getJenisPengajuanCutiLabel } from "@_types/enums/jenis_pengajuan_cuti";
import type { Pageable } from "@_types/index";
import type { PegawaiDetail } from "@_types/pegawai";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { dateToIndonesian } from "@helpers/string";
import CutiPersetujuanTableActionButton from "./button.table.action";

type CutiPersetujuanTableBodyProps = {
	pegawai: PegawaiDetail;
	data: Pageable<CutiApprovalChain>;
};
const CutiPersetujuanTableBody = ({
	pegawai,
	data,
}: CutiPersetujuanTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell className="border" align="right" width={60}>
						{urut++}
					</TableCell>
					<TableCell className="border" align="center" width={60}>
						<CutiPersetujuanTableActionButton
							pegawai={pegawai}
							cutiApprovalChain={row}
						/>
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.refCuti.tanggalPengajuan)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{getJenisPengajuanCutiLabel(row.refCuti.jenisPengajuanCuti)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{getApprovalCutiStatusLabel(row.refCuti.approvalCutiStatus)}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.jenisCuti.nama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.subJenisCuti?.nama ?? "-"}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.nipam}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.nama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.organisasi?.nama}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.jabatan?.nama}
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.refCuti.tanggalMulai)}
					</TableCell>
					<TableCell className="border text-nowrap" align="center">
						{dateToIndonesian(row.refCuti.tanggalSelesai)}
					</TableCell>
					<TableCell className="border text-nowrap" align="right">
						{row.refCuti.jumlahHariKerja} Hari
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.alasan}
					</TableCell>
					<TableCell className="border text-nowrap">
						{row.refCuti.picSaatIni?.nama ?? "-"}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default CutiPersetujuanTableBody;
