import type { ProfilGajiPegawaiSchema } from "@_types/pegawai";
import InputZod from "@components/form/zod/input";
import SelectPendapatanNonPajakZod from "@components/form/zod/pendapatan_non_pajak";
import SelectProfilGajiZod from "@components/form/zod/profil_gaji";
import SelectRumahDinasZod from "@components/form/zod/rumah_dinas";
import YesNoZod from "@components/form/zod/yes-no";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";

interface ProfilGajiVariableGajiProps {
    form: UseFormReturn<ProfilGajiPegawaiSchema>
}
const ProfilGajiVariableGaji = ({ form }: ProfilGajiVariableGajiProps) => {
    return (
        <Fieldset title="Data Variable Gaji">
            <div className="grid grid-cols-2 gap-2">
                <InputZod id="statusPegawai" label="Status Pegawai" form={form} readonly />
                <InputZod id="gajiPokok" label="GajiPokok" form={form} type="number" />
                <SelectPendapatanNonPajakZod id="kodePajakId" label="Kode Pajak" form={form} />
                <InputZod id="phdp" label="PHDP" form={form} type="number" />
                <SelectProfilGajiZod id="gajiProfilId" label="Profil Gaji" form={form} />
                <SelectRumahDinasZod id="rumahDinasId" label="Rumah Dinas" form={form} />
                <YesNoZod id="isAskes" label="BPJS" form={form} />
            </div>
        </Fieldset>
    );
}

export default ProfilGajiVariableGaji;