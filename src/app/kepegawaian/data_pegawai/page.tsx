"use client"
import TooltipBuilder from "@components/builder/tooltip";
import TabBiodataNonPegawai from "@components/kepegawaian/data_pegawai/non-pegawai";
import TabBiodataPegawai from "@components/kepegawaian/data_pegawai/pegawai";
import RingkasanBiodata from "@components/kepegawaian/data_pegawai/ringkasan";
import { ButtonLink } from "@components/ui/link";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { UserPlusIcon } from 'lucide-react';

const DataPegawaiPage = () => {
    return (
        <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-8/12 gap-4">
                <Tabs defaultValue="non-pegawai">
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
            <div className="w-full md:w-4/12">
                <RingkasanBiodata />
            </div>
        </div>
    );

}

export default DataPegawaiPage;