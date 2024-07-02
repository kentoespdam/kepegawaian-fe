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
        <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-8/12 gap-4">
                <Tabs defaultValue={store.tab} onValueChange={(value) => store.setTab(value)}>
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="pegawai">Pegawai</TabsTrigger>
                            <TabsTrigger value="non-pegawai">Non Pegawai</TabsTrigger>
                        </TabsList>

                        <TooltipBuilder text="Tambah Biodata">
                            <ButtonLink href="/kepegawaian/data_pegawai/add"
                                title="Tambah Biodata"
                                icon={<UserPlusIcon className="h-4 w-4" />}
                                className="ml-auto"
                            />
                        </TooltipBuilder>
                    </div>
                    <TabBiodataPegawai />
                    <TabBiodataNonPegawai />
                </Tabs>
            </div>
            <div className="md:w-4/12 pt-[42px] sm:mt-0">
                <RingkasanBiodata />
            </div>
        </div>
    );

}

export default DataPegawaiPage;