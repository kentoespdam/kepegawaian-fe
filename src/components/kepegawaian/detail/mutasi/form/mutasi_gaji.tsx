import type { DetailDasarGaji } from "@_types/penggajian/detail_dasar_gaji";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { globalGetData } from "@helpers/action";
import type { MutasiFormProps } from ".";
import { Label } from "@components/ui/label";
import { FormLabel } from "@components/ui/form";

const MutasiGajiForm = ({ form }: MutasiFormProps) => {
	const cariGaji = async () => {
		const data = await globalGetData<DetailDasarGaji>({
			path: `penggajian/detail-dasar-gaji/${form.getValues().golonganId}/${form.getValues().mkgTahun}`,
		});
		form.setValue("gajiPokok", data.nominal);
	};

	return (
		<div className="grid grid-cols-4 gap-2 items-top align-top">
			<div className="col-span-3">
				<InputZod type="number" id="gajiPokok" label="Gaji Pokok" form={form} />
			</div>
			<div className="pt-8">
				<Button type="button" variant={"outline"} onClick={cariGaji}>
					CARI
				</Button>
			</div>
		</div>
	);
};

export default MutasiGajiForm;
