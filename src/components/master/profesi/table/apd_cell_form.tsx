import type { Apd } from "@_types/master/apd";
import TooltipBuilder from "@components/builder/tooltip";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { useApdStore } from "@store/master/apd";
import { CircleXIcon, PlusIcon, SquarePlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ApdBadge = ({ apd }: { apd: Apd }) => {
    const { setApdId, setOpenDelete } = useApdStore((state) => state)

    const deleteHandler = () => {
        setApdId(apd.id)
        setOpenDelete(true)
    }

    return (
        <Badge key={apd.id} className="w-full flex justify-between bg-transparent text-primary border border-primary hover:text-primary-foreground">
            <div>
                {apd.nama}
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
                        className="h-5 w-5 text-destructive hover:bg-transparent">
                        <CircleXIcon className="h-4 w-4" />
                    </Button>
                </TooltipBuilder>
            </div>
        </Badge>
    )
}

interface ApdCellFormProps {
    profesiId: number
    rows: Apd[] | null
}

const ApdCellForm = ({ profesiId, rows }: ApdCellFormProps) => {
    const param = useSearchParams()
    const search = new URLSearchParams(param)
    const callbackUrl = btoa(`/master/profesi?${search.toString()}`)

    return (
        <>
            <div className="grid gap-2">
                {rows?.map((row) => (
                    <ApdBadge key={row.id} apd={row} />
                ))}
                <div className="w-full text-center">
                    <TooltipBuilder text="Add APD" className="bg-primary text-primary-foreground">
                        <ButtonLink
                            href={`/master/apd/add/${profesiId}?callback=${callbackUrl}`}
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

export default ApdCellForm;