import type { Jabatan } from "@_types/master/jabatan";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { useJabatanStore } from "@store/master/jabatan";
import { DeleteIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface JabatanTableActionProps {
    data: Jabatan
}
const JabatanTableAction = ({data}: JabatanTableActionProps) => {
    const params = useSearchParams()
    const callbackUrl = btoa(params.toString() ?? '')

    const { setJabatanId, setDeleteOpen } = useJabatanStore(state => ({
        setJabatanId: state.setJabatanId,
        setDeleteOpen: state.setOpenDelete
    }))

    const deleteHandler = () => {
        setJabatanId(data.id)
        setDeleteOpen(true)
    }

    return (
        <div className="w-full flex gap-2 justify-center items-center">
            <TooltipBuilder text="Delete Jabatan" className="bg-destructive text-destructive-foreground">
                <Button
                    type="button"
                    variant="ghost"
                    size={"icon"}
                    onClick={deleteHandler}
                >
                    <DeleteIcon
                        className="h-5 w-5 text-destructive"
                        aria-hidden="true"
                    />
                </Button>
            </TooltipBuilder>
            <TooltipBuilder text="Edit Jabatan" className="bg-warning text-warning-foreground">
                <ButtonLink
                    variant="ghost"
                    size="icon"
                    href={`/master/jabatan/edit/${data.id}?callback=${callbackUrl}`}
                    icon={<PencilIcon className="h-5 w-5 text-warning" />}
                />
            </TooltipBuilder>
        </div>
    );}

export default JabatanTableAction;