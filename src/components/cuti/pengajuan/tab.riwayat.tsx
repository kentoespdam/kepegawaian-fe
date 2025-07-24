import {
	type CutiApprovalMini,
	cutiApprovalColumns,
} from "@_types/cuti/cuti.approval";
import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import { getApprovalCutiStatusLabel } from "@_types/enums/approval_cuti_status";
import type { Pageable } from "@_types/index";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { TabsContent } from "@components/ui/tabs";
import { getPageDataEnc } from "@helpers/action";
import { encodeString, getUrut } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";

const CutiRiwayatPersetujuanTableBody = ({
	data,
}: { data: Pageable<CutiApprovalMini> }) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border">
						{urut++}
					</TableCell>
					<TableCell align="center" width={60} className="border text-nowrap">
						{row.createdAt}
					</TableCell>
					<TableCell align="center" width={60} className="border text-nowrap">
						{row.approver.nipam}
					</TableCell>
					<TableCell align="center" width={60} className="border text-nowrap">
						{row.approver.nama}
					</TableCell>
					<TableCell align="center" width={60} className="border text-nowrap">
						{row.jabatan.nama}
					</TableCell>
					<TableCell align="center" width={60} className="border text-nowrap">
						{getApprovalCutiStatusLabel(row.approvalStatus)}
					</TableCell>
					<TableCell className="border whitespace-nowrap text-nowrap">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

const CutiRiwayatPersetujuanTab = ({
	cutiPegawai,
}: { cutiPegawai?: CutiPegawai }) => {
	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ["riwayat-persetujuan", cutiPegawai?.id],
		queryFn: async () =>
			await getPageDataEnc<CutiApprovalMini>({
				path: encodeString(`cuti/approval/${cutiPegawai?.id}`),
				isRoot: true,
			}),
		enabled: !!cutiPegawai?.id,
	});
	return (
		<TabsContent
			value="riwayatPersetujuan"
			className="p-2 border rounded min-h-[70vh] max-h-[75vh] max-w-full overflow-auto"
		>
			<Table className="mb-2">
				<TableHeadBuilder columns={cutiApprovalColumns} />
				{data && !data.empty ? (
					<CutiRiwayatPersetujuanTableBody data={data} />
				) : (
					<LoadingTable
						isLoading={isLoading || isFetching || isError || !data}
						columns={cutiApprovalColumns.length}
					/>
				)}
			</Table>
			<PaginationBuilder data={data} />
		</TabsContent>
	);
};

export default CutiRiwayatPersetujuanTab;
