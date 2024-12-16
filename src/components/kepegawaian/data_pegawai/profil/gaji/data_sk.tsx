import type { ProfilGajiPegawaiSchema } from "@_types/pegawai";
import DatePickerZod from "@components/form/zod/date-picker";
import InputZod from "@components/form/zod/input";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";
interface ProfilGajiDataSkProps {
    form: UseFormReturn<ProfilGajiPegawaiSchema>
}
const ProfilGajiDataSk = ({ form }: ProfilGajiDataSkProps) => {

    return (
        <Fieldset title="Data SK">
            <div className="grid grid-cols-2 gap-2">
                <InputZod id="nipam" label="Nipam" form={form} readonly />
                <InputZod id="nama" label="Nama Pegawai" form={form} readonly />
                <DatePickerZod id="tmtKerja" label="TMT Kerja" form={form} />
                <InputZod id="tmtPegawai" label="TMT Pegawai" form={form} readonly />
                <InputZod id="golonganName" label="Golongan" form={form} readonly />
                <InputZod id="tmtGolongan" label="TMT Golongan" form={form} readonly />
                <div className="grid grid-cols-2 gap-2">
                    <InputZod id="mkgTahun" label="MKG Gol. Tahun" form={form} readonly />
                    <InputZod id="mkgBulan" label="MKG Gol. Bulan" form={form} readonly />
                </div>
                <InputZod id="jabatanName" label="Jabatan" form={form} readonly />
                <InputZod id="tmtJabatan" label="TMT Jabatan" form={form} readonly />
                <DatePickerZod id="tmtPensiun" label="TMT Pensiun" form={form} />
            </div>
        </Fieldset>
    );
}

export default ProfilGajiDataSk;