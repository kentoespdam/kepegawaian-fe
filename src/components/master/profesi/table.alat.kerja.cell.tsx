import type { AlatKerja } from "@_types/master/alat_kerja";
import TooltipBuilder from "@components/builder/tooltip";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { useAlatKerjaStore } from "@store/master/alat_kerja";
import { CircleXIcon, SquarePlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const AlatKerjaBadge = ({ alatKerja }: { alatKerja: AlatKerja }) => {
    const { setAlatKerjaId, setOpenDelete } = useAlatKerjaStore((state) => state)

    const deleteHandler = () => {
        setAlatKerjaId(alatKerja.id)
        setOpenDelete(true)
    }

    return (
        <Badge key={alatKerja.id} className="w-full flex justify-between bg-transparent text-primary border border-primary hover:text-primary-foreground">
            <div>
                {alatKerja.nama}
            </div>
            <div>
                <TooltipBuilder
                    text="Delete APD"
                    className="bg-destructive text-destructive-foreground">
                    <Button
                        size={"icon"}
                        variant="ghost"
                        type="button"
                        onClick={deleteHandler}
                        className="h-5 w-5 text-destructive font-bold hover:bg-transparent">
                        <CircleXIcon className="h-4 w-4" />
                    </Button>
                </TooltipBuilder>
            </div>
        </Badge>
    )
}

interface AlatKerjaCellFormProps {
    profesiId: number
    rows: AlatKerja[] | null
}

const AlatKerjaCellForm = ({ profesiId, rows }: AlatKerjaCellFormProps) => {
    const param = useSearchParams()
    const search = new URLSearchParams(param)
    const callbackUrl = btoa(`/master/profesi?${search.toString()}`)

    return (
        <>
            <div className="grid gap-2">
                {rows?.map((row) => (
                    <AlatKerjaBadge key={row.id} alatKerja={row} />
                ))}
                <div className="w-full text-center">
                    <TooltipBuilder text="Add Alat Kerja" className="bg-primary text-primary-foreground" delayDuration={100}>
                        <ButtonLink
                            href={`/master/alat_kerja/add/${profesiId}?callback=${callbackUrl}`}
                            variant={"ghost"}
                            size={"icon"}
                            type="button"
                            icon={<SquarePlusIcon className="text-primary" />}
                            className="h-5 w-5">
                        </ButtonLink>
                    </TooltipBuilder>
                </div>
            </div>
        </>
    )
}

export default AlatKerjaCellForm;