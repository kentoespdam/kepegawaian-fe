import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import JenisMutasiZod from "@components/form/zod/jenis-mutasi";
import Fieldset from "@components/ui/fieldset";
import type { MutasiFormProps } from "./form.index";
import FormRiwayatMutasiWarnigSp from "./form.warning.sp";
import type { Pageable } from "@_types/index";
import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";

interface MutasiSkFormProps extends MutasiFormProps {
	riwayatSp?: Pageable<RiwayatSp>;
}
const MutasiSkForm = ({ form, riwayatSp }: MutasiSkFormProps) => {
	return (
		<Fieldset title="Data Mutasi">
			<FormRiwayatMutasiWarnigSp riwayatSp={riwayatSp} />
			<div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
				<JenisMutasiZod id="jenisMutasi" label="Jenis Mutasi" form={form} />
				<InputZod type="text" id="nomorSk" label="Nomor SK" form={form} />
				<DatePickerZod id="tanggalSk" label="Tanggal SK" form={form} />
				<DatePickerZod id="tmtBerlaku" label="Tanggal Berlaku" form={form} />
			</div>
		</Fieldset>
	);
};

export default MutasiSkForm;
