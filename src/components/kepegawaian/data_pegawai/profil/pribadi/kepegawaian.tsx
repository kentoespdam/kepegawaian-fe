import type { ProfilPribadiSchema } from "@_types/pegawai";
import SelectGolonganZod from "@components/form/zod/golongan";
import SelectJabatanZod from "@components/form/zod/jabatan";
import SelectOrganisasiZod from "@components/form/zod/organisasi";
import SelectProfesiZod from "@components/form/zod/profesi";
import Fieldset from "@components/ui/fieldset";
import type { UseFormReturn } from "react-hook-form";

interface ProfilKepegawaianComponentProps {
    form: UseFormReturn<ProfilPribadiSchema>
}
const ProfilKepegawaianComponent = ({ form }: ProfilKepegawaianComponentProps) => {
    return (
        <Fieldset title="Data Kepegawaian">
            <div className="grid grid-cols-2 gap-2">
                <SelectGolonganZod id="golonganId" label="Golongan" form={form} />
                <SelectOrganisasiZod id="organisasiId" label="Unit Kerja" form={form} />
                <SelectJabatanZod
                    id="jabatanId"
                    label="Jabatan"
                    form={form}
                />
                <SelectProfesiZod
                    id="profesiId"
                    label="Profesi"
                    form={form}
                />
            </div>
        </Fieldset>
    );
}

export default ProfilKepegawaianComponent;