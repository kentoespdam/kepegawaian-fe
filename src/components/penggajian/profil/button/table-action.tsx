import type { ProfilGaji } from "@_types/penggajian/profil";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useProfilGajiStore } from "@store/penggajian/profil";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
interface ProfilGajiTableActionProps {
    row: ProfilGaji
}
const ProfilGajiTableAction = ({ row }: ProfilGajiTableActionProps) => {
    const { setShowForm, setProfilGajiId, setOpenDelete } = useProfilGajiStore((state) => state);
    const editHandler = () => {
        setProfilGajiId(row.id)
        setShowForm(true)
    }

    const deleteHandler = () => {
        setProfilGajiId(row.id)
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

export default ProfilGajiTableAction;