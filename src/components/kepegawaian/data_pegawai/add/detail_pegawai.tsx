"use client";

import type { ConditionalSchema } from "@_types/pegawai";
import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import SelectGradeZod from "@components/form/zod/grade";
import InputZod from "@components/form/zod/input";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import SelectProfesiZod from "@components/form/zod/profesi";
import SelectStatusKerjaZod from "@components/form/zod/status-kerja";
import SelectStatusPegawaiZod from "@components/form/zod/status-pegawai";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

interface PegawaiDetailComponentProps {
    form: UseFormReturn<z.infer<typeof ConditionalSchema>>
}
const PegawaiDetailComponent = ({ form }: PegawaiDetailComponentProps) => {

    return (
        <Fieldset title="Data Pengangkatan Karyawan">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <InputZod
                    id="id"
                    label="ID"
                    form={form}
                    type="hidden" />

                <InputZod
                    id="nipam"
                    label="NIPAM"
                    form={form} />

                <SelectStatusPegawaiZod
                    id="statusPegawaiId"
                    label="Status Pegawai"
                    form={form} />


                <InputZod
                    id="noSk"
                    label="Nomor SK"
                    form={form} />

                <DatePickerZod
                    id="tanggalTmtSk"
                    label="Tanggal TMT SK"
                    form={form} />

                <SelectGolonganZod
                    id="golonganId"
                    label="Golongan"
                    form={form} />

                <SelectOrganisasiZod
                    id="organisasiId"
                    label="Organisasi"
                    form={form} />

                <SelectJabatanZod
                    id="jabatanId"
                    label="Jabatan"
                    form={form} />

                <SelectProfesiZod
                    id="profesiId"
                    label="Profesi"
                    form={form} />

                <SelectGradeZod
                    id="gradeId"
                    label="Grade"
                    form={form} />

                <SelectStatusKerjaZod
                    id="statusKerjaId"
                    label="Status Kerja"
                    form={form} />

            </div>
        </Fieldset >
    );
}

export default PegawaiDetailComponent;