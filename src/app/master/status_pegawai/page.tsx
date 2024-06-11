import { statusPegawaiTableColumns } from "@_types/master/status_pegawai";
import SearchBuilder from "@components/builder/search";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import StatusPegawaiTable from "./table";
import ButtonAddBuilder from "@components/builder/button/add";

export const metadata = {
    title: "Master Status Pegawai",
}
const StatusPegawaiPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-bold text-md flex flex-row justify-between items-center">
                    <span>{metadata.title}</span>
                    <ButtonAddBuilder
                        href="/master/status_pegawai/add"
                        msg="Tambah Status Pegawai" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SearchBuilder columns={statusPegawaiTableColumns} />
                <StatusPegawaiTable />
            </CardContent>
        </Card>
    );
}

export default StatusPegawaiPage;