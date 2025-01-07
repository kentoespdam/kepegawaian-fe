import { useRefPotonganTkkStore } from "@store/penggajian/ref_potongan_tkk";
import { useRouter, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

interface RefPotonganTkkTableActionProps {
    refPotonganTkkId: number
}
const RefPotonganTkkTableAction = ({ refPotonganTkkId }: RefPotonganTkkTableActionProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const search = new URLSearchParams(params)
    const callbackUrl = btoa(search.toString()) ?? ""
    const { setRefPotonganTkkId, setOpenDelete } = useRefPotonganTkkStore((state) => ({
        setRefPotonganTkkId: state.setRefPotonganTkkId,
        setOpenDelete: state.setOpenDelete
    }))

    const editHandler = () => {
        router.push(`/penggajian/potongan_tkk/edit/${refPotonganTkkId}?callback=${callbackUrl}`)
    }

    const deleteHandler = () => {
        setRefPotonganTkkId(refPotonganTkkId)
        setOpenDelete(true)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="h-6 w-6">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-primary"
                        onClick={editHandler}
                    >
                        <PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-destructive"
                        onClick={deleteHandler}
                    >
                        <DeleteIcon className="mr-2 h-[1rem] w-[1rem]" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default RefPotonganTkkTableAction;