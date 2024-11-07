import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import type { MutasiFormProps } from ".";
import MutasiGajiForm from "./mutasi_gaji";

const MutasiGolonganForm = ({ form }: MutasiFormProps) => {
	const { jenisMutasi } = useRiwayatMutasiStore((state) => ({
		jenisMutasi: state.jenisMutasi,
	}));

	return (
		<Fieldset title="Mutasi Golongan / Gaji">
			<div className="grid gap-2">
				<SelectGolonganZod id="golonganId" label="Golongan" form={form} />
				<Fieldset title="Masa Kerja Golongan">
					<div className="grid grid-cols-2 gap-2">
						<InputZod type="number" id="mkgTahun" label="Tahun" form={form} />
						<InputZod type="number" id="mkgBulan" label="Bulan" form={form} />
					</div>
				</Fieldset>
				<DatePickerZod
					id="kenaikanBerikutnya"
					label="Kenaikan Berikutnya"
					form={form}
				/>
				<div className="grid grid-cols-2 gap-2">
					<InputZod type="number" id="mkgbTahun" label="Tahun" form={form} />
					<InputZod type="number" id="mkgbBulan" label="Bulan" form={form} />
				</div>
				{jenisMutasi &&
				["MUTASI_GAJI", "MUTASI_GAJI_BERKALA"].includes(jenisMutasi.id) ? (
					<Fieldset title="Masa Kerja Kenaikan Berikutnya">
						<MutasiGajiForm form={form} />
					</Fieldset>
				) : null}
			</div>
		</Fieldset>
	);
};

export default MutasiGolonganForm;
