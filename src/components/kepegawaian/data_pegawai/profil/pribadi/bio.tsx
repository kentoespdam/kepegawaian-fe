import type { ProfilPribadiSchema } from "@_types/pegawai";
import SelectAgamaZod from "@components/form/zod/agama";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import RadioJenisKelaminZod from "@components/form/zod/jenis-kelamin";
import SelectStatusKawinZod from "@components/form/zod/status-kawin";
import TextAreaZod from "@components/form/zod/textarea";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";

interface BiodataComponentProps {
    form: UseFormReturn<ProfilPribadiSchema>
}
const BiodataComponent = ({ form }: BiodataComponentProps) => {
    return (
        <Fieldset title="Data Pribadi Pegawai">
            <div className="grid grid-cols-2 gap-2">
                <InputZod id="nipam" label="NIPAM" form={form} />
                <InputZod id="nama" label="Nama Pegawai" form={form} />
                <RadioJenisKelaminZod id="jenisKelamin" label="Jenis Kelamin" form={form} />
                <SelectStatusKawinZod id="statusKawin" label="Status Kawin" form={form} />
                <SelectAgamaZod id="agama" label="Agama" form={form} />
                <TextAreaZod id="alamat" label="Alamat" form={form} />
                <InputZod id="tempatLahir" label="Tempat Lahir" form={form} />
                <DatePickerZod id="tanggalLahir" label="Tanggal Lahir" form={form} />
                <InputZod id="ibuKandung" label="Ibu Kandung" form={form} />
                <InputZod id="telp" label="Nomor Telepon" form={form} />
            </div>
        </Fieldset>
    );
}

export default BiodataComponent;