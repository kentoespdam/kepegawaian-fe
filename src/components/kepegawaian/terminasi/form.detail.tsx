import Fieldset from "@components/ui/fieldset";
import type { TerminasiFormProps } from "./form.index";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import TextAreaZod from "@components/form/zod/textarea";
import InputFileZod from "@components/form/zod/file";
import AlasanTerminasiZod from "@components/form/zod/alasan-terminasi";

const DetailTerminasiForm = ({ form }: TerminasiFormProps) => {
	return (
		<Fieldset title="Detail Terminasi">
			<div className="grid gap-2">
				<div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
					<AlasanTerminasiZod
						id="alasanTerminasiId"
						label="Alasan Terminasi"
						form={form}
					/>
					<InputZod id="nomorSk" label="Nomor SK" form={form} />
					<DatePickerZod id="tanggalSk" label="Tgl. SK" form={form} />
					<DatePickerZod id="tmtBerlaku" label="Tgl. Terminasi" form={form} />
				</div>
				<TextAreaZod id="notes" label="Notes" form={form} />
				<InputFileZod id="fileName" label="Lampiran Sk Terminasi" form={form} />
			</div>
		</Fieldset>
	);
};

export default DetailTerminasiForm;
