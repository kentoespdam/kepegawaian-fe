import type { PegawaiDetail } from "@_types/pegawai";
import {
	type GajiBatchMaster,
	gajiBatchMasterColumnsDashboard,
} from "@_types/penggajian/gaji_batch_master";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KananDataGajiTableBody from "./kanan.gaji.table.body";
import { useSlipGajiStore } from "@store/penggajian/slip";
import SlipGajiComponent from "@components/penggajian/slip";

type KananDataGajiTableProps = {
	pegawai: PegawaiDetail;
};
const KananDataGajiTable = ({ pegawai }: KananDataGajiTableProps) => {
	const { gajiId, open, setOpen } = useSlipGajiStore((state) => ({
		gajiId: state.gajiId,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const params = useSearchParams();
	const search = new URLSearchParams(params);

	const qKey = ["riwayat-gaji", pegawai.id, search.toString()];

	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: qKey,
		queryFn: () =>
			getPageDataEnc<GajiBatchMaster>({
				path: encodeString(`penggajian/batch/master/pegawai/${pegawai.id}`),
				isRoot: true,
				searchParams: search.toString(),
			}),
		enabled: !!pegawai.id,
	});
	return (
		<div className="grid overflow-auto p-2 gap-0">
			<Table>
				<TableHeadBuilder columns={gajiBatchMasterColumnsDashboard} />
				{isLoading || isFetching || isError || !data || data.empty ? (
					<LoadingTable
						columns={gajiBatchMasterColumnsDashboard}
						isLoading={isLoading || isFetching}
					/>
				) : (
					<KananDataGajiTableBody data={data} />
				)}
			</Table>
			<PaginationBuilder data={data} />
			<SlipGajiComponent gajiId={gajiId} open={open} setOpen={setOpen} />
		</div>
	);
};

export default KananDataGajiTable;
