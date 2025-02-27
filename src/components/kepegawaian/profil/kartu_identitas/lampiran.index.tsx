"use client";

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import {
	lampiranProfilTableColumns,
	type LampiranProfil,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import LampiranFormDialog from "@components/kepegawaian/profil/lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "@components/kepegawaian/profil/lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "@components/kepegawaian/profil/lampiran/table/body";
import { Table } from "@components/ui/table";
import { getListData } from "@helpers/action";
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { useQuery } from "@tanstack/react-query";

const LampiranKartuIdentitasContent = () => {
	const rootKey = "lampiran-kartu-identitas";
	const { selectedKartuIdentitasId } = useKartuIdentitasStore((state) => ({
		selectedKartuIdentitasId: state.selectedKartuIdentitasId,
	}));

	const query = useQuery({
		queryKey: [rootKey, selectedKartuIdentitasId],
		queryFn: async () =>
			await getListData<LampiranProfil>({
				path: `profil/kartu-identitas/lampiran/${selectedKartuIdentitasId}`,
				isRoot: true,
			}),
		enabled: !!selectedKartuIdentitasId && selectedKartuIdentitasId > 0,
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
							jenis={JenisLampiranProfil.Values.KARTU_IDENTITAS}
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
				savePath="profil/kartu-identitas"
				jenis={JenisLampiranProfil.Values.KARTU_IDENTITAS}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
}

export default LampiranKartuIdentitasContent;