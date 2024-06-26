import type { ConditionalSchema } from "@_types/pegawai";
import SelectAgamaZod from "@components/form/zod/agama";
import DatePickerZod from "@components/form/zod/date-picker";
import RadioGolonganDarah from "@components/form/zod/gologan-darah";
import InputZod from "@components/form/zod/input";
import RadioJenisKelaminZod from "@components/form/zod/jenis-kelamin";
import JenjangPendidikanZod from "@components/form/zod/jenjang-pendidikan";
import SelectStatusKawinZod from "@components/form/zod/status-kawin";
import TextAreaZod from "@components/form/zod/textarea";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

interface PegawaiBiodataComponentProps {
    form: UseFormReturn<z.infer<typeof ConditionalSchema>>
}
const PegawaiBiodataComponent = ({ form }: PegawaiBiodataComponentProps) => {
    return (
        <Fieldset title="Biodata">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <InputZod
                    id="nik"
                    label="Nomor Induk Kependudukan"
                    form={form} />

                <InputZod
                    id="nama"
                    label="Nama Lengkap"
                    form={form} />

                <RadioJenisKelaminZod
                    id="jenisKelamin"
                    label="Jenis Kelamin"
                    form={form} />

                <RadioGolonganDarah
                    id="golonganDarah"
                    label="Golongan Darah"
                    form={form} />

                <SelectStatusKawinZod
                    id="statusKawin"
                    label="Status Kawin"
                    form={form} />

                <SelectAgamaZod
                    id="agama"
                    label="Agama"
                    form={form} />

                <InputZod
                    id="tempatLahir"
                    label="Tempat Lahir"
                    form={form} />

                <DatePickerZod
                    id="tanggalLahir"
                    label="Tanggal Lahir"
                    form={form} />

                <InputZod
                    id="ibuKandung"
                    label="Ibu Kandung"
                    form={form} />

                <InputZod
                    id="telp"
                    label="No. Telp"
                    form={form} />

                <JenjangPendidikanZod
                    id="pendidikanTerakhirId"
                    label="Pendidikan Terakhir"
                    form={form} />

                <TextAreaZod
                    id="alamat"
                    label="Alamat"
                    form={form} />

                <TextAreaZod
                    id="notes"
                    label="Notes"
                    form={form} />

            </div>
        </Fieldset>
    );
}

export default PegawaiBiodataComponent;