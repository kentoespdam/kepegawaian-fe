import DatePickerZod from "@components/form/zod/date-picker";
import InputFileZod from "@components/form/zod/file";
import InputZod from "@components/form/zod/input";
import SelectJenisSpZod from "@components/form/zod/jenis-sp";
import TextAreaZod from "@components/form/zod/textarea";
import Fieldset from "@components/ui/fieldset";
import type { SpFormProps } from ".";
import PenandaTanganSpForm from "./penandatangan";

const DetailSpFormComponent = ({ form }: SpFormProps) => {
	return (
		<Fieldset title="Detail SP">
			<div className="grid gap-2">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
					<InputZod id="nomorSp" label="No. Surat Peringatan" form={form} />
					<DatePickerZod
						id="tanggalSp"
						label="Tgl. Surat Peringatan"
						form={form}
					/>
					<SelectJenisSpZod id="jenisSp" label="Jenis SP" form={form} />
					<div className="grid grid-cols-2 gap-2">
						<DatePickerZod id="tanggalMulai" label="Tgl. Mulai" form={form} />
						<DatePickerZod
							id="tanggalSelesai"
							label="Tgl. Selesai"
							form={form}
						/>
					</div>
				</div>

				<TextAreaZod
					id="notes"
					label="Alasan Pemberian Peringatan"
					form={form}
				/>

				<PenandaTanganSpForm form={form} />

				<InputFileZod id="fileName" label="Scan Surat peringatan" form={form} />
			</div>
		</Fieldset>
	);
};

export default DetailSpFormComponent;