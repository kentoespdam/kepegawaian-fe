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
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../lampiran/table/body";

const LampiranPelatihanContent = () => {
	const rootKey = "lampiran-pelatihan";
	const { selectedPelatihanId } = usePelatihanStore((state) => ({
		selectedPelatihanId: state.selectedPelatihanId,
	}));

	const query = useQuery({
		queryKey: [rootKey, selectedPelatihanId],
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(`profil/pelatihan/lampiran/${selectedPelatihanId}`),
				isRoot: true,
			}),
		enabled: !!selectedPelatihanId && selectedPelatihanId > 0,
	});

	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={lampiranProfilTableColumns} />
				{query.isLoading ||
				query.isFetching ||
				!query.data ||
				query.isError ||
				query.data.length === 0 ? (
					<LoadingTable
						columns={lampiranProfilTableColumns}
						isLoading={query.isLoading || query.isFetching}
					/>
				) : (
					<LampiranProfilTableBody
						data={query.data}
						jenis={JenisLampiranProfil.Values.PROFIL_PELATIHAN}
						rootKey={rootKey}
					/>
				)}
			</Table>

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
