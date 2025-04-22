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
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../lampiran/table/body";

const LampiranPendidikanContent = () => {
	const rootKey = "lampiranPendidikan";
	const { selectedPendidikanId } = usePendidikanStore((state) => ({
		selectedPendidikanId: state.selectedPendidikanId,
	}));

	const query = useQuery({
		queryKey: ["lampiranPendidikan", selectedPendidikanId],
		queryFn: async () => {
			const result = await getListData<LampiranProfil>({
				path: `profil/pendidikan/lampiran/${selectedPendidikanId}`,
				isRoot: true,
			});
			return result;
		},
		enabled: !!selectedPendidikanId && selectedPendidikanId > 0,
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
							jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
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
				savePath="profil/pendidikan"
				jenis={JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
};

export default LampiranPendidikanContent;
