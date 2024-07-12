"use client";
import {
	lampiranProfilTableColumns,
	type LampiranProfil,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getListData } from "@helpers/action";
import { usePendidikanStore } from "@store/kepegawaian/biodata/pendidikan-store";
import { useQuery } from "@tanstack/react-query";
import DeleteLampiranProfilDialog from "../../dialog/delete-lampiran-profil";
import LampiranFormDialog from "../../dialog/add-lampiran-profil";
import LampiranPendidikanTableBody from "./table/body";

const LampiranPendidikanContent = () => {
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
						<LampiranPendidikanTableBody data={query.data} />
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
				rootKey="lampiranPendidikan"
				savePath="profil/pendidikan"
			/>
			<DeleteLampiranProfilDialog />
		</div>
	);
};

export default LampiranPendidikanContent;
