"use client";

import {
	lampiranProfilTableColumns,
	type LampiranProfil,
} from "@_types/profil/lampiran";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getListData } from "@helpers/action";
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../../lampiran/dialog/add-lampiran-profil";
import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import DeleteLampiranProfilDialog from "../../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../../lampiran/table/body";

const LampiranKeahlianContent = () => {
	const rootKey = "lampiran-keahlian";
	const { selectedKeahlianId } = useKeahlianStore((state) => ({
		selectedKeahlianId: state.selectedKeahlianId,
	}));

	const query = useQuery({
		queryKey: [rootKey, selectedKeahlianId],
		queryFn: async () =>
			await getListData<LampiranProfil>({
				path: `profil/keahlian/lampiran/${selectedKeahlianId}`,
				isRoot: true,
			}),
		enabled: !!selectedKeahlianId && selectedKeahlianId > 0,
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
							jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
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
				savePath="profil/keahlian"
				jenis={JenisLampiranProfil.Values.PROFIL_KEAHLIAN}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
};

export default LampiranKeahlianContent;
