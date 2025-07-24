import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import JenisKontrakZod from "@components/form/zod/jenis-kontrak";
import TextAreaZod from "@components/form/zod/textarea";
import Fieldset from "@components/ui/fieldset";
import type { KontrakFormProps } from "./form.kontrak";

const DataKontrakForm = ({ form }: KontrakFormProps) => {
	const jenisKontrakWatch = form.watch("jenisKontrak");

	return (
		<Fieldset title="Data Kontrak Baru">
			<div className="grid gap-2">
				<JenisKontrakZod id="jenisKontrak" label="Jenis Kontrak" form={form} />
				<div className="grid gap-2 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 mt-2">
					<InputZod
						id="nomorKontrak"
						label={
							jenisKontrakWatch === "PENGANGKATAN"
								? "Nomor Sk"
								: "Nomor Kontrak"
						}
						form={form}
					/>
					<InputZod id="nipam" label="Nipam" form={form} />
					<DatePickerZod id="tanggalSk" label="Tanggal SK" form={form} />
					<DatePickerZod
						id="tanggalMulai"
						label={
							jenisKontrakWatch === "PENGANGKATAN"
								? "Tgl. TMT SK"
								: "Periode Kontrak"
						}
						form={form}
					/>
					{jenisKontrakWatch === "PENGANGKATAN" ? (
						<SelectGolonganZod id="golonganId" label="Golongan" form={form} />
					) : (
						<DatePickerZod
							id="tanggalSelesai"
							label="Sampai dengan"
							form={form}
						/>
					)}
					<InputZod type="number" id="gajiPokok" label="Nominal" form={form} />
				</div>
				<TextAreaZod id="notes" label="Notes" form={form} />
			</div>
		</Fieldset>
	);
};

export default DataKontrakForm;
