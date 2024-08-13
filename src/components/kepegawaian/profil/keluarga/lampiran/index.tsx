"use client";

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import {
	lampiranProfilTableColumns,
	type LampiranProfil,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getListData } from "@helpers/action";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../../lampiran/table/body";

const LampiranKeluargaContent = () => {
	const rootKey = "lampiran-keluarga";
	const { selectedKeluargaId } = useKeluargaStore((state) => ({
		selectedKeluargaId: state.selectedKeluargaId,
	}));

	const query = useQuery({
		queryKey: [rootKey, selectedKeluargaId],
		queryFn: async () =>
			await getListData<LampiranProfil>({
				path: `profil/keluarga/lampiran/${selectedKeluargaId}`,
				isRoot: true,
			}),
		enabled: !!selectedKeluargaId && selectedKeluargaId > 0,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={lampiranProfilTableColumns} />
					{query.isLoading || query.isFetching ? (
						<LoadingTable
							columns={lampiranProfilTableColumns}
							isLoading={true}
						/>
					) : query.data && query.data.length > 0 ? (
						<LampiranProfilTableBody
							data={query.data}
							jenis={JenisLampiranProfil.Values.PROFIL_KELUARGA}
							rootKey={rootKey}
						/>
					) : (
						<LoadingTable
							columns={lampiranProfilTableColumns}
							isSuccess={false}
							error={query.error?.message}
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
