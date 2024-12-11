"use client"
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useProfilGajiStore } from "@store/penggajian/profil";
import { PlusCircleIcon } from "lucide-react";
import ProfilGajiTable from "./table";

const ProfilGajiComponent = () => {
    const { setProfilGajiId, showForm, setShowForm } = useProfilGajiStore((state) => ({
        setProfilGajiId: state.setProfilGajiId,
        showForm: state.showForm,
        setShowForm: state.setShowForm
    }))

    return (
        <Card>
            <CardHeader className="p-2">
                <CardTitle className="flex items-center justify-between">
                    <span>Profil Gaji Pegawai</span>
                    <TooltipBuilder text="Tambah Profil Komponen Gaji Pegawai">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            disabled={showForm}
                            onClick={() => {
                                setProfilGajiId(0)
                                setShowForm(true)
                            }}>
                            <PlusCircleIcon className="h-5 w-5 text-primary" />
                        </Button>
                    </TooltipBuilder>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <ProfilGajiTable />
            </CardContent>
        </Card>
    );
}

export default ProfilGajiComponent;