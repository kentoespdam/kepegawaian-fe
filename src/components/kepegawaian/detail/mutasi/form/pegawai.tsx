import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import type { MutasiFormProps } from ".";

const MutasiPegawaiForm = ({ form }: MutasiFormProps) => {
	return (
		<Fieldset title="Data Pegawai">
			<div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
				<InputZod type="hidden" id="pegawaiId" label="Pegawai ID" form={form} />
				<InputZod id="nipam" label="NIPAM" form={form} disabled />
				<InputZod id="nama" label="Nama Pegawai" form={form} disabled />
				<InputZod
					type="hidden"
					id="golonganLamaId"
					label="Golongan"
					form={form}
				/>
				<InputZod id="namaGolonganLama" label="Golongan" form={form} disabled />

				<InputZod
					type="hidden"
					id="organisasiLamaId"
					label="Unit Kerja"
					form={form}
				/>
				<InputZod
					id="namaOrganisasiLama"
					label="Unit Kerja"
					form={form}
					disabled
				/>
				<InputZod
					type="hidden"
					id="jabatanLamaId"
					label="Jabatan"
					form={form}
				/>
				<InputZod id="namaJabatanLama" label="Jabatan" form={form} disabled />
				<InputZod
					type="hidden"
					id="profesiLamaId"
					label="Profesi"
					form={form}
					disabled
				/>
				<InputZod id="namaProfesiLama" label="Profesi" form={form} disabled />
				<InputZod type="hidden" id="jenisSk" label="Jenis SK" form={form} />
			</div>
		</Fieldset>
	);
};

export default MutasiPegawaiForm;
