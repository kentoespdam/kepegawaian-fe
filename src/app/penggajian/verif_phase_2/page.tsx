import { STATUS_PROSES_GAJI, getKeyStatusProsesGaji } from "@_types/enums/status_proses_gaji";
import type { Organisasi } from "@_types/master/organisasi";
import type { Pegawai } from "@_types/pegawai";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import type { GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import GajiBatchMasterProcessKomponenTable from "@components/penggajian/batch_master_process/table.komponen";
import VerifPhase2Component from "@components/penggajian/verif_phase_2";
import VerifPhase2MainFilter from "@components/penggajian/verif_phase_2/filter.main";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { getListData, getPageData, globalGetData } from "@helpers/action";
import { getNipamFromCookie } from "@helpers/index";
import { cn } from "@lib/utils";
import { Suspense } from "react";

export const metadata = {
    title: "Tambah Komponen Gaji"
}
const VerifPhase2Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
    const queryParams = new URLSearchParams();
    const { periode = "" } = await searchParams;
    if (periode) queryParams.set("periode", periode);

    const nipam = getNipamFromCookie();
    const employeeData = await globalGetData<Pegawai>({ path: `pegawai/${nipam}/nipam` });

    const organizationData = await getListData<Organisasi>({ path: "organisasi", searchParams: "levelOrg=4" });

    const executive: Organisasi = {
        id: 1,
        nama: "DIREKSI",
        kode: "1",
        levelOrganisasi: 2,
        parent: null,
    };
    organizationData.push(executive);
    organizationData.sort((a, b) => a.id - b.id);

    const salaryBatchRoot = await getPageData<GajiBatchRoot>({
        path: "penggajian/batch",
        searchParams: queryParams.toString(),
        isRoot: true,
    });

    queryParams.set("status", getKeyStatusProsesGaji(STATUS_PROSES_GAJI.WAIT_VERIFICATION_PHASE_2));
    const salaryBatchMasters = await globalGetData<GajiBatchMaster[]>({
        path: "penggajian/batch/master",
        searchParams: queryParams.toString(),
        isRoot: true,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span className="text-md font-semibold">{metadata.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="h-fit grid col-span-2 gap-2">
                <Suspense>
                    <VerifPhase2MainFilter pegawai={employeeData} gajiBatchRoot={salaryBatchRoot} />
                </Suspense>
                <Separator />
                <div className={cn("grid gap-4", "sm:grid-cols-1", "lg:grid-cols-12", "md:grid-cols-12")}>
                    <div className="col-span-8 sm:col-lg-12 border-r">
                        <Suspense fallback={<>Loading....</>}>
                            <VerifPhase2Component pegawai={employeeData} organisasiList={organizationData} gajiBatchMasters={salaryBatchMasters} />
                        </Suspense>
                    </div>
                    <div className="col-span-4 sm:col-lg-12">
                        <GajiBatchMasterProcessKomponenTable />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VerifPhase2Page;