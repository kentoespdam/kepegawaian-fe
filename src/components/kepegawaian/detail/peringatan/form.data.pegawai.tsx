import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import type { SpFormProps } from "./form.index";

const DetailSpPegawaiForm = ({ form }: SpFormProps) => {
	return (
		<Fieldset title="Data Pegawai">
			<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
				<InputZod id="pegawaiId" label="Pegawai ID" form={form} className="hidden" />
				<InputZod id="nipam" label="NIPAM" form={form} disabled />
				<InputZod id="nama" label="Nama Pegawai" form={form} disabled />
				<InputZod id="organisasiId" label="Organisasi" form={form} disabled className="hidden" />
				<InputZod id="namaOrganisasi" label="Organisasi" form={form} disabled />
				<InputZod id="jabatanId" label="Jabatan" form={form} disabled className="hidden" />
				<InputZod id="namaJabatan" label="Jabatan" form={form} disabled />
			</div>
		</Fieldset>
	);
};

export default DetailSpPegawaiForm;
