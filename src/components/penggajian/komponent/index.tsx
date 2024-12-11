"use client"
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import KomponenGajiTable from "./table";

const KomponenGajiComponent = () => {
    const router = useRouter()
    const params = useSearchParams()
    const profilId = +(params.get("profilId") ?? "0")

    const addClick = () => {
        if (profilId === 0) {
            alert("Pilih Profil Gaji Terlebih Dahulu")
            return
        }
        router.push(`/penggajian/komponen_gaji/${profilId}/add`)
    }

    return (
        <Card>
            <CardHeader className="p-2">
                <CardTitle className="flex items-center justify-between">
                    <span>Komponen Gaji Pegawai</span>
                    <TooltipBuilder text="Tambah Profil Komponen Gaji Pegawai">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={addClick}>
                            <PlusCircleIcon className="h-5 w-5 text-primary" />
                        </Button>
                    </TooltipBuilder>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <KomponenGajiTable profilId={profilId} />
            </CardContent>
        </Card>
    );
}

export default KomponenGajiComponent;