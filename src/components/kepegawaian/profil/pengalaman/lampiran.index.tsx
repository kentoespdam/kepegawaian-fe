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
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store";
import { useQuery } from "@tanstack/react-query";
import LampiranFormDialog from "../lampiran/dialog/add-lampiran-profil";
import DeleteLampiranProfilDialog from "../lampiran/dialog/delete-lampiran-profil";
import LampiranProfilTableBody from "../lampiran/table/body";

const LampiranPengalamanKerjaContent = () => {
	const rootKey = "lampiran-pengalaman";
	const { selectedPengalamanId } = usePengalamanKerjaStore();
	const query = useQuery({
		queryKey: ["lampiran-pengalaman", selectedPengalamanId],
		queryFn: async () =>
			await getListDataEnc<LampiranProfil>({
				path: encodeString(
					`profil/pengalaman/lampiran/${selectedPengalamanId}`,
				),
				isRoot: true,
				searchParams: "",
			}),
		enabled: !!selectedPengalamanId && selectedPengalamanId > 0,
	});

	return (
		<div className="grid overflow-auto p-2 min-h-64 gap-0">
			<div className="min-h-64">
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
							jenis={JenisLampiranProfil.Values.PROFIL_PENGALAMAN_KERJA}
							rootKey="lampiran-pengalaman"
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
				savePath="profil/pengalaman"
				jenis={JenisLampiranProfil.Values.PROFIL_PENGALAMAN_KERJA}
			/>
			<DeleteLampiranProfilDialog rootKey={rootKey} />
		</div>
	);
};

export default LampiranPengalamanKerjaContent;
