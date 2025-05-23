import type { Organisasi } from "@_types/master/organisasi";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { TableBody } from "@components/ui/table";
import { getUrutStatusPegawai } from "@helpers/status_pegawai";
import VerifPhase1CellGrouped from "../gaji_batch_master/verif_phase_1/table.cell.grouped";

interface VerifPhase1TableBodyProps {
	pegawai: Pegawai;
	organisasiList: Organisasi[];
	gajiBatchMasters?: GajiBatchMaster[];
}
const VerifPhase1TableBody = ({
	pegawai,
	organisasiList,
	gajiBatchMasters,
}: VerifPhase1TableBodyProps) => {
	let urut = 0;
	return (
		<TableBody className="h-96 overflow-y-auto">
			{organisasiList.map((organisasi, index) => {
				const urutOrg = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
				const filteredGaji = gajiBatchMasters
					?.filter((gbm) =>
						organisasi.id !== 1
							? gbm.organisasiKode.startsWith(organisasi.kode)
							: [2, 3, 4].includes(gbm.levelId),
					)
					.map((gbm) => ({
						...gbm,
						golongan: gbm.golongan ?? "",
					}))
					?.sort((a, b) => {
						const urutA = getUrutStatusPegawai(a.statusPegawai);
						const urutB = getUrutStatusPegawai(b.statusPegawai);
						if (urutA !== urutB) return urutA - urutB;
						if (a.levelId !== b.levelId) return a.levelId - b.levelId;
						return b.golongan.localeCompare(a.golongan);
					});

				urut += filteredGaji?.length ?? 0;

				return (
					<VerifPhase1CellGrouped
						key={`org-${organisasi.id}`}
						urut={urut}
						urutOrg={urutOrg}
						organisasi={organisasi}
						gajiBatchMasters={filteredGaji}
					/>
				);
			})}
		</TableBody>
	);
};

export default VerifPhase1TableBody;
