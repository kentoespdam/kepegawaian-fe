import type { Organisasi } from "@_types/master/organisasi";
import type { Pegawai } from "@_types/pegawai";
import GajiBatchMasterProcessTable from "@components/penggajian/batch_master_process/table";
import VerifPhase1Component from "@components/penggajian/verif_phase_1";
import VerifPhase1MainFilter from "@components/penggajian/verif_phase_1/filter.main";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { getListData, globalGetData } from "@helpers/action";
import { getNipamFromCookie } from "@helpers/index";
import { cn } from "@lib/utils";
import { Suspense } from "react";

export const metadata = {
    title: "Verifikasi Gapok, Tunjangan & Potongan"
}

const VerifikasiPhase1Page = async () => {
    const nipam = getNipamFromCookie();
    const pegawai = await globalGetData<Pegawai>({
        path: `pegawai/${nipam}/nipam`,
    })
    const organisasiList = await getListData<Organisasi>({
        path: "organisasi",
        searchParams: "levelOrg=4"
    })

    const direksi: Organisasi = {
        id: 1,
        nama: "DIREKSI",
        kode: "1",
        levelOrganisasi: 2,
        parent: null
    }
    // append direksi to organisasiList    
    organisasiList.push(direksi)
    organisasiList.sort((a, b) => a.id - b.id)


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="h-fit grid col-span-2 gap-2">
                <Suspense>
                    <VerifPhase1MainFilter />
                </Suspense>
                <Separator />
                <div className={cn("grid gap-4", "sm:grid-cols-1", "lg:grid-cols-12", "md:grid-cols-12")}>
                    <div className="col-span-8 sm:col-lg-12 border-r">
                        <Suspense>
                            <VerifPhase1Component pegawai={pegawai} organisasiList={organisasiList} />
                        </Suspense>
                    </div>
                    <div className="col-span-4 sm:col-lg-12">
                        <GajiBatchMasterProcessTable />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default VerifikasiPhase1Page;