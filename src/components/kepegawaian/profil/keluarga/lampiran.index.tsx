"use client";

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import {
	type LampiranProfil,
	lampiranProfilTableColumns,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../lampiran/table/body";

const LampiranKeluargaContent = () => {
	const rootKey = "lampiran-keluarga";
	const { selectedKeluargaId } = useKeluargaStore((state) => ({
		selectedKeluargaId: state.selectedKeluargaId,
	}));

	const query = useQuery({
		queryKey: [rootKey, selectedKeluargaId],
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(`profil/keluarga/lampiran/${selectedKeluargaId}`),
				isRoot: true,
			}),
		enabled: !!selectedKeluargaId && selectedKeluargaId > 0,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<div className="min-h-80">
				<Table>
					<TableHeadBuilder columns={lampiranProfilTableColumns} />
					{query.isLoading ||
					query.isFetching ||
					query.isError ||
					!query.data ||
					query.data.length === 0 ? (
						<LoadingTable
							columns={lampiranProfilTableColumns}
							isLoading={query.isLoading || query.isFetching}
						/>
					) : (
						<LampiranProfilTableBody
							data={query.data}
							jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
							rootKey={rootKey}
						/>
					)}
				</Table>
			</div>

			<LampiranFormDialog
				rootKey={rootKey}
				savePath="profil/keluarga"
				jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
};

export default LampiranKeluargaContent;
