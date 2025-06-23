import type { GajiBatchMasterProses } from "@_types/gaji_batch_master_process";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import SlipGajiDetailPenPot from "./detail.penpot";
import { Separator } from "@components/ui/separator";
import SlipGajiDetailPenPotTotal from "./detail.penpot.total";
import SlipGajiDetailPenPotSubTotal from "./detail.penpot.sub.total";
import SlipGajiTambahan from "./detail.tambahan";
import SlipGajiDetailTambhanTotal from "./detail.tambahan.total";
import SlipGajiDetailTambahanSubTotal from "./detail.tambahan.sub.total";

const SlipGajiDetail = ({ gaji }: { gaji: GajiBatchMaster }) => {
	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ["detail-gaji", gaji.id],
		queryFn: async () =>
			await globalGetDataEnc<GajiBatchMasterProses[]>({
				path: encodeString(`penggajian/batch/master/proses/${gaji.id}/master`),
				isRoot: true,
			}),
		enabled: !!gaji.id && gaji.id > 0,
	});

	return isLoading || isFetching || isError || !data ? (
		<div>Loading</div>
	) : (
		<div className="p-1 grid gap-4 border border-black">
			<div className="grid gap-1 grid-cols-2">
				<SlipGajiDetailPenPot detail={data} jenis="PEMASUKAN" />
				<SlipGajiDetailPenPot detail={data} jenis="POTONGAN" />
				<Separator className="mt-2 border-t border-b h-1 flex-grow bg-border-none border-black col-span-2" />
				<SlipGajiDetailPenPotTotal detail={data} jenis="PEMASUKAN" />
				<SlipGajiDetailPenPotTotal detail={data} jenis="POTONGAN" />
				<div />
				<SlipGajiDetailPenPotSubTotal detail={gaji} />
				<Separator className="col-span-2 my-1 bg-black" />
				<Separator className="col-span-2 my-1 bg-black" />
				<SlipGajiTambahan detail={data} jenis="PEMASUKAN" />
				<SlipGajiTambahan detail={data} jenis="POTONGAN" />
				<Separator className="mt-2 border-t border-b h-1 flex-grow bg-border-none border-black col-span-2" />
				<SlipGajiDetailTambhanTotal detail={data} jenis="PEMASUKAN" />
				<SlipGajiDetailTambhanTotal detail={data} jenis="POTONGAN" />
				<div />
				<SlipGajiDetailTambahanSubTotal detail={gaji} />
			</div>
		</div>
	);
};

export default SlipGajiDetail;
