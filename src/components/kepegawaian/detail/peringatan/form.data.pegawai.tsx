import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import type { SpFormProps } from "./form.index";

const DetailSpPegawaiForm = ({ form }: SpFormProps) => {
	return (
		<Fieldset title="Data Pegawai">
			<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
				<InputZod id="pegawaiId" label="Pegawai ID" form={form} className="hidden" />
				<InputZod id="nipam" label="NIPAM" form={form} readonly />
				<InputZod id="nama" label="Nama Pegawai" form={form} readonly />
				<InputZod id="organisasiId" label="Organisasi" form={form} readonly className="hidden" />
				<InputZod id="namaOrganisasi" label="Organisasi" form={form} readonly />
				<InputZod id="jabatanId" label="Jabatan" form={form} readonly className="hidden" />
				<InputZod id="namaJabatan" label="Jabatan" form={form} readonly />
				<InputZod id="tmtJabatan" label="TMT Jabatan" form={form} readonly />
				<InputZod id="tmtGolongan" label="TMT Pangkat/Golongan" form={form} readonly />
				<InputZod id="tmtGajiBerkala" label="TMT Kenaikan Gaji Berkala" form={form} readonly />
			</div>
		</Fieldset>
	);
};

export default DetailSpPegawaiForm;
