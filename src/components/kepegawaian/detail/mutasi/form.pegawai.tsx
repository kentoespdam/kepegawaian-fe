import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import type { MutasiFormProps } from "./form.index";

const MutasiPegawaiForm = ({ form }: MutasiFormProps) => {
	return (
		<Fieldset title="Data Pegawai">
			<div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
				<InputZod
					type="number"
					id="pegawaiId"
					label="Pegawai ID"
					form={form}
					className="hidden"
				/>
				<InputZod id="nipam" label="NIPAM" form={form} readonly />
				<InputZod id="nama" label="Nama Pegawai" form={form} readonly />
				{form.getValues("nipam").startsWith("KO-") ? null : (
					<>
						<InputZod
							type="number"
							id="golonganLamaId"
							label="Golongan"
							form={form}
							className="hidden"
						/>
						<InputZod
							id="namaGolonganLama"
							label="Golongan"
							form={form}
							readonly
						/>
					</>
				)}
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
					readonly
				/>
				<InputZod
					type="hidden"
					id="jabatanLamaId"
					label="Jabatan"
					form={form}
				/>
				<InputZod id="namaJabatanLama" label="Jabatan" form={form} readonly />
				<InputZod
					type="hidden"
					id="profesiLamaId"
					label="Profesi"
					form={form}
					readonly
				/>
				<InputZod id="namaProfesiLama" label="Profesi" form={form} readonly />
				<InputZod
					id="jenisSk"
					label="Jenis SK"
					form={form}
					className="hidden"
				/>
			</div>
		</Fieldset>
	);
};

export default MutasiPegawaiForm;
