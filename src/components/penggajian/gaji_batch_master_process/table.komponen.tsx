"use client";
import { JENIS_GAJI } from "@_types/enums/jenis_gaji";
import {
	STATUS_PROSES_GAJI,
	getKeyStatusProsesGaji,
} from "@_types/enums/status_proses_gaji";
import {
	type GajiBatchMasterProses,
	gajiBatchMasterProsesKomponenColumns,
} from "@_types/gaji_batch_master_process";
import type { Pageable } from "@_types/index";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import { Button } from "@components/ui/button";
import { Table } from "@components/ui/table";
import { globalGetData } from "@helpers/action";
import { useGajiBatchMasterProsesStore } from "@store/penggajian/gaji_batch_master_proses";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, ReceiptTextIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import GajiBatchMasterProsesForm from "./form.index";
import GajiBatchMasterProsesKomponenTableBody from "./table.komponen.body";

interface GajiBatchMasterProcessKomponenTableProps {
	gajiBatchMasters: GajiBatchMaster[];
	gajiBatchRoot: Pageable<GajiBatchRoot>;
}
const GajiBatchMasterProcessKomponenTable = ({
	gajiBatchMasters,
	gajiBatchRoot,
}: GajiBatchMasterProcessKomponenTableProps) => {
	const isVerified =
		gajiBatchRoot?.content[0].status !==
		getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_2);

	const {
		batchMasterId,
		setOpenForm,
		batchMasterProsesId,
		openDelete,
		setOpenDelete,
	} = useGajiBatchMasterProsesStore(
		useShallow((state) => ({
			batchMasterId: state.batchMasterId,
			setOpenForm: state.setOpenForm,
			batchMasterProsesId: state.batchMasterProsesId,
			openDelete: state.openDelete,
			setOpenDelete: state.setOpenDelete,
		})),
	);

	const qkey = ["gaji_batch_master_proses", batchMasterId];

	const { isLoading, isFetching, isError, data, error } = useQuery({
		queryKey: qkey,
		queryFn: async () =>
			await globalGetData<GajiBatchMasterProses[]>({
				path: `penggajian/batch/master/proses/${batchMasterId}/master`,
				isRoot: true,
			}),
		enabled: !!batchMasterId,
	});

	const gajiBatchMaster = gajiBatchMasters?.find(
		(item) => item.id === batchMasterId,
	);

	return (
		<div className="grid gap-2">
			<div>
				<h2 className="flex">
					<ReceiptTextIcon className="w-5 h-5 mr-1" />
					Rincian Gaji
				</h2>
			</div>
			<h3>Jenis: Penghasilan</h3>
			<div className="w-full">
				<Button
					className="w-full"
					disabled={!batchMasterId || isVerified}
					onClick={() => setOpenForm(true)}
				>
					<PlusIcon className="w-4 h-4 mr-2" />
					<span>Tambah Komponen</span>
				</Button>
			</div>
			<div className="w-full min-h-[350px] overflow-auto">
				<Table>
					<TableHeadBuilder columns={gajiBatchMasterProsesKomponenColumns} />
					{isLoading || isFetching || isError || !data ? (
						<LoadingTable
							columns={gajiBatchMasterProsesKomponenColumns}
							error={error?.message}
						/>
					) : (
						<GajiBatchMasterProsesKomponenTableBody
							data={data}
							jenisGaji={JENIS_GAJI.PEMASUKAN}
							gajiBatchMaster={gajiBatchMaster}
							isVerified={isVerified}
						/>
					)}
				</Table>
			</div>
			<h3>Jenis: Potongan</h3>
			<div className="w-full min-h-[350px] overflow-auto">
				<Table>
					<TableHeadBuilder columns={gajiBatchMasterProsesKomponenColumns} />
					{isLoading || isFetching || isError || !data ? (
						<LoadingTable
							columns={gajiBatchMasterProsesKomponenColumns}
							error={error?.message}
						/>
					) : (
						<GajiBatchMasterProsesKomponenTableBody
							data={data}
							jenisGaji={JENIS_GAJI.POTONGAN}
							gajiBatchMaster={gajiBatchMaster}
							isVerified={isVerified}
						/>
					)}
				</Table>
			</div>
			<GajiBatchMasterProsesForm qKey={qkey} />
			<DeleteZodDialogBuilder
				id={batchMasterProsesId}
				deletePath="penggajian/batch/master/proses"
				openDelete={openDelete}
				setOpenDelete={setOpenDelete}
				queryKeys={["gaji_batch_master_proses", batchMasterId]}
			/>
		</div>
	);
};

export default GajiBatchMasterProcessKomponenTable;
