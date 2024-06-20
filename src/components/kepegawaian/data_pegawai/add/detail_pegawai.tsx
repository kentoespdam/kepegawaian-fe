import type { ReferensiPegawai } from "@_types/pegawai";
import SelectGolonganComponent from "@components/form/golongan";
import InputTextComponent from "@components/form/input";
import DatePickerZod from "@components/form/zod/date-picker";
import SelectGolonganZod from "@components/form/zod/golongan";
import InputZod from "@components/form/zod/input";
import SelectStatusPegawaiZod from "@components/form/zod/status-pegawai";
import DatePickerComponent from "@components/ui/date-picker";
import Fieldset from "@components/ui/fieldset";
import { Label } from "@components/ui/label";
import type { UseFormReturn } from "react-hook-form";

interface PegawaiDetailComponentProps {
    form: UseFormReturn<ReferensiPegawai>
}
const PegawaiDetailComponent = ({ form }: PegawaiDetailComponentProps) => {
    return (
        <Fieldset title="Data Pengangkatan Karyawan">
            <input type="text" id="id" name="id" placeholder="id pegawai" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <InputZod
                    id="nipam"
                    label="NIPAM"
                    form={form} />

                <SelectStatusPegawaiZod
                    id="statusPegawaiId"
                    label="Status Pegawai"
                    form={form} />

                <SelectGolonganZod
                    id="golonganId"
                    label="Golongan / Jabatan"
                    form={form} />

                <InputZod
                    id="noSk"
                    label="Nomor SK"
                    form={form} />

                <DatePickerZod
                    id="tanggalTmtSk"
                    label="Tanggal TMT SK"
                    form={form} />

            </div>
        </Fieldset >
    );
}

export default PegawaiDetailComponent;