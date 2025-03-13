import type { Organisasi } from "@_types/master/organisasi";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { TableBody } from "@components/ui/table";
import { getUrutStatusPegawai } from "@helpers/status_pegawai";
import ApprovalCellGrouped from "./table.cell.grouped";

interface ApprovalTableBodyProps {
	organisasiList: Organisasi[];
	gajiBatchMasters?: GajiBatchMaster[];
}
const ApprovalTableBody = ({
	organisasiList,
	gajiBatchMasters,
}: ApprovalTableBodyProps) => {
	let urut = 0;
	return (
		<TableBody>
			{organisasiList.map((organisasi, index) => {
				const urutOrg = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
				const filterdGaji = gajiBatchMasters
					?.filter((gbm) =>
						organisasi.id !== 1
							? gbm.organisasiKode.startsWith(organisasi.kode)
							: [2, 3, 4].includes(gbm.levelId),
					)
					.map((gbm) => ({
						...gbm,
						golongan: gbm.golongan ?? "",
					}))
					.sort((a, b) => {
						const urutA = getUrutStatusPegawai(a.statusPegawai);
						const urutB = getUrutStatusPegawai(b.statusPegawai);
						if (urutA !== urutB) return urutA - urutB;
						if (a.levelId !== b.levelId) return a.levelId - b.levelId;
						return b.golongan.localeCompare(a.golongan);
					});

				urut += filterdGaji?.length ?? 0;
				return filterdGaji?.length ? (
					<ApprovalCellGrouped
						key={`org-${organisasi.id}`}
						urut={urut}
						urutOrg={urutOrg}
						organisasi={organisasi}
						gajiBatchMasters={filterdGaji}
					/>
				) : null;
			})}
		</TableBody>
	);
};

export default ApprovalTableBody;
