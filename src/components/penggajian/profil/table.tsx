"use client";
import { type ProfilGaji, profilGajiColumns } from "@_types/penggajian/profil";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useProfilGajiStore } from "@store/penggajian/profil";
import { useQuery } from "@tanstack/react-query";
import ProfilGajiFormComponent from "./form.index";
import ProfilGajiTableBody from "./table.body";

const ProfilGajiTable = () => {
	const { profilGajiId, openDelete, setOpenDelete } = useProfilGajiStore(
		(state) => ({
			profilGajiId: state.profilGajiId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const { data, isFetching, isLoading, isError, error } = useQuery({
		queryKey: ["profil_gaji"],
		queryFn: async () =>
			getPageDataEnc<ProfilGaji>({
				path: encodeString("penggajian/profil"),
				isRoot: true,
			}),
	});
	return (
		<div className="w-full min-h-4 scroll-auto">
			<Table>
				<TableHeadBuilder columns={profilGajiColumns} />
				{isFetching || isLoading || isError || !data ? (
					<LoadingTable
						columns={profilGajiColumns}
						isFetching={isFetching}
						isLoading={isLoading}
						error={error?.message}
					/>
				) : (
					<ProfilGajiTableBody data={data} />
				)}
			</Table>
			<DeleteZodDialogBuilder
				id={profilGajiId}
				deletePath="penggajian/profil"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={[["profil_gaji"]]}
			/>
			<ProfilGajiFormComponent />
		</div>
	);
};

export default ProfilGajiTable;
