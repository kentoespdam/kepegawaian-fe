"use client"
import type { Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import TooltipBuilder from "@components/builder/tooltip";
import TabBiodataNonPegawai from "@components/kepegawaian/data_pegawai/non-pegawai";
import TabBiodataPegawai from "@components/kepegawaian/data_pegawai/pegawai";
import RingkasanBiodata from "@components/kepegawaian/data_pegawai/ringkasan";
import { ButtonLink } from "@components/ui/link";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { getPageData } from "@helpers/action";
import { cn } from "@lib/utils";
import { useDataPegawaiStore } from "@store/kepegawaian/data_pegawai/data_pegawai-store";
import { useQueries } from "@tanstack/react-query";
import { UserPlusIcon } from 'lucide-react';
import { useSearchParams } from "next/navigation";

const DataPegawaiPage = () => {
    const store = useDataPegawaiStore()
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)

    useQueries({
        queries: [{
            queryKey: ["data-pegawai", search.toString()],
            queryFn: () => getPageData<Pegawai>({
                path: "pegawai",
                searchParams: search.toString(),
                isRoot: true
            }),
            enabled: store.tab === "pegawai",
        },
        {
            queryKey: ["data-biodata", search.toString()],
            queryFn: () => getPageData<Biodata>({
                path: "profil/biodata",
                searchParams: search.toString(),
                isRoot: true
            }),
            enabled: store.tab === "non-pegawai",
        }]
    })

    return (
        <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start md:col-span-3 lg:col-span-2">
                <Tabs defaultValue={store.tab} onValueChange={(value) => store.setTab(value)}>
                    <div className={cn("grid grid-cols-1 gap-2", "md:flex md:items-center")}>
                        <div>
                            <TabsList>
                                <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
                                <TabsTrigger value="non-pegawai">Non Pegawai</TabsTrigger>
                            </TabsList>
                        </div>
                        <div>
                            <TooltipBuilder text="Tambah Biodata">
                                <ButtonLink href="/kepegawaian/data_pegawai/add"
                                    title="Tambah Biodata"
                                    icon={<UserPlusIcon className="h-4 w-4" />}
                                    className="ml-auto"
                                />
                            </TooltipBuilder>
                        </div>
                    </div>
                    <TabBiodataPegawai />
                    <TabBiodataNonPegawai />
                </Tabs>
            </div>
            <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
                <RingkasanBiodata />
            </div>
        </div>
    );

}

export default DataPegawaiPage;