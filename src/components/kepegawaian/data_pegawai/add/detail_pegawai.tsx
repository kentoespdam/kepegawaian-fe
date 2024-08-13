"use client";

import type { PegawaiSchema } from "@_types/pegawai";
import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import SelectGradeZod from "@components/form/zod/grade";
import InputZod from "@components/form/zod/input";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import SelectProfesiZod from "@components/form/zod/profesi";
import Fieldset from "@components/ui/fieldset";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import type { UseFormReturn } from "react-hook-form";

interface PegawaiDetailComponentProps {
	form: UseFormReturn<PegawaiSchema>;
}
const PegawaiDetailComponent = ({ form }: PegawaiDetailComponentProps) => {
	const biodataStore = useAddBiodataStore();

	return (
		<Fieldset title="Data Pengangkatan Karyawan">
			<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
				<InputZod id="nipam" label="NIPAM" form={form} />

				<SelectOrganisasiZod id="organisasiId" label="Organisasi" form={form} />

				<SelectJabatanZod id="jabatanId" label="Jabatan" form={form} />

				<SelectProfesiZod id="profesiId" label="Profesi" form={form} />

				<SelectGradeZod id="gradeId" label="Grade" form={form} />

				{biodataStore.statusPegawai !== "KONTRAK" ? (
					<SelectGolonganZod id="golonganId" label="Golongan" form={form} />
				) : null}

				<InputZod id="nomorSk" label="Nomor SK" form={form} />

				<DatePickerZod id="tanggalSk" label="TMT SK" form={form} />

				{biodataStore.statusPegawai === "KONTRAK" ? (
					<DatePickerZod
						id="tmtKontrakSelesai"
						label="TMT Kontrak Selesai"
						form={form}
					/>
				) : null}

				<InputZod id="gajiPokok" type="number" label="Gaji Pokok" form={form} />
			</div>
		</Fieldset>
	);
};

export default PegawaiDetailComponent;
