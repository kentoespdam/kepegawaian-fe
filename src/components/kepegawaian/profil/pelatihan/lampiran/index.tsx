"use client";

import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import {
	type LampiranProfil,
	lampiranProfilTableColumns,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getListData } from "@helpers/action";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";
import LampiranFormDialog from "../../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../../lampiran/table/body";

const LampiranPelatihanContent = () => {
	const rootKey = "lampiran-pelatihan";
	const { selectedPelatihanId } = usePelatihanStore(
		useShallow((state) => ({
			selectedPelatihanId: state.selectedPelatihanId,
		})),
	);

	const query = useQuery({
		queryKey: [rootKey, selectedPelatihanId],
		queryFn: async () =>
			await getListData<LampiranProfil>({
				path: `profil/pelatihan/lampiran/${selectedPelatihanId}`,
				isRoot: true,
			}),
		enabled: !!selectedPelatihanId && selectedPelatihanId > 0,
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
							jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
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
				savePath="profil/pelatihan"
				jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
};

export default LampiranPelatihanContent;
