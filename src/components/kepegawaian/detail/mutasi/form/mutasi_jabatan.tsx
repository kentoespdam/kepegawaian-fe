import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import SelectProfesiZod from "@components/form/zod/profesi";
import Fieldset from "@components/ui/fieldset";
import type { MutasiFormProps } from ".";

const MutasiJabatanForm = ({ form, defaultValues }: MutasiFormProps) => {
	return (
		<Fieldset title="Mutasi Lokasi Kerja / Jabatan">
			<div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
				<SelectOrganisasiZod id="organisasiId" label="Unit Kerja" form={form} />
				<SelectJabatanZod
					id="jabatanId"
					label="Jabatan"
					form={form}
					// defaultValues={defaultValues}
				/>
				<SelectProfesiZod
					id="profesiId"
					label="Profesi"
					form={form}
				/>
			</div>
		</Fieldset>
	);
};

export default MutasiJabatanForm;
