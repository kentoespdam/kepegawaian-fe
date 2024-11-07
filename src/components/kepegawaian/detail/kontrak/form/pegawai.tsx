import Fieldset from "@components/ui/fieldset";
import type { KontrakFormProps } from ".";
import InputZod from "@components/form/zod/input";

const KontrakPegawaiForm = ({ form }: KontrakFormProps) => {
	return (
		<Fieldset title="Data Pegawai">
			<div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
				<InputZod type="number" id="pegawaiId" label="Pegawai ID" form={form} className="hidden" />
				<InputZod id="nipam" label="NIPAM" form={form} disabled />
				<InputZod id="nama" label="Nama Pegawai" form={form} disabled />
                <InputZod id="unitKerja" label="Unit Kerja" form={form} disabled/>
                <InputZod id="jabatan" label="Jabatan" form={form} disabled/>
			</div>
		</Fieldset>
	);
};

export default KontrakPegawaiForm;
