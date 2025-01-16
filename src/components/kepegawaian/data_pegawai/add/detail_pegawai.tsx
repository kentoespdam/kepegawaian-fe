"use client";

import type { PegawaiSchema } from "@_types/pegawai";
import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import SelectPendapatanNonPajakZod from "@components/form/zod/pendapatan_non_pajak";
import SelectProfesiZod from "@components/form/zod/profesi";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";

interface PegawaiDetailComponentProps {
	form: UseFormReturn<PegawaiSchema>;
}
const PegawaiDetailComponent = ({ form }: PegawaiDetailComponentProps) => {
	const statusPegawai = form.watch("statusPegawai");

	return (
		<Fieldset title="Data Pengangkatan Karyawan">
			<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
				<InputZod id="nipam" label="NIPAM" form={form} />
				<SelectOrganisasiZod id="organisasiId" label="Organisasi" form={form} />
				<SelectJabatanZod id="jabatanId" label="Jabatan" form={form} />
				<SelectProfesiZod id="profesiId" label="Profesi" form={form} />
				{statusPegawai !== "KONTRAK" ? (
					<SelectGolonganZod id="golonganId" label="Golongan" form={form} />
				) : null}

				<InputZod id="gajiPokok" type="number" label="Gaji Pokok" form={form} />
				<InputZod id="nomorSk" label="Nomor SK" form={form} />
				<DatePickerZod id="tanggalSk" label="Tanggal SK" form={form} />
				<DatePickerZod id="tmtBerlakuSk" label="TMT SK" form={form} />
				{statusPegawai === "KONTRAK" ? (
					<DatePickerZod
						id="tmtKontrakSelesai"
						label="TMT Kontrak Selesai"
						form={form}
					/>
				) : null}
				<SelectPendapatanNonPajakZod id="kodePajakId" label="Kode Pajak" form={form} />

			</div>
		</Fieldset>
	);
};

export default PegawaiDetailComponent;
