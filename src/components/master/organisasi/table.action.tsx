import type { Organisasi } from "@_types/master/organisasi";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { useOrganisasiStore } from "@store/master/organisasi";
import { DeleteIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface OrganisasiTableActionProps {
    data: Organisasi
}
const OrganisasiTableAction = (props: OrganisasiTableActionProps) => {
    const params = useSearchParams()
    const callbackUrl = btoa(params.toString() ?? '')

    const { setOrganisasiId, setDeleteOpen } = useOrganisasiStore(state => ({
        setOrganisasiId: state.setOrganisasiId,
        setDeleteOpen: state.setOpenDelete
    }))

    const deleteHandler = () => {
        setOrganisasiId(props.data.id)
        setDeleteOpen(true)
    }

    return (
        <div className="w-full flex gap-2 justify-center items-center">
            <TooltipBuilder text="Delete Organisasi" className="bg-destructive text-destructive-foreground">
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
            <TooltipBuilder text="Edit Organisasi" className="bg-warning text-warning-foreground">
                <ButtonLink
                    variant="ghost"
                    size="icon"
                    href={`/master/organisasi/edit/${props.data.id}?callback=${callbackUrl}`}
                    icon={<PencilIcon className="h-5 w-5 text-warning" />}
                />
            </TooltipBuilder>
        </div>
    );
}

export default OrganisasiTableAction;