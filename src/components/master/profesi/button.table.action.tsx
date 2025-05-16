import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useProfesiStore } from "@store/master/profesi";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfesiTableActionProps {
    profesiId: number
}

const ProfesiTableAction = ({ profesiId }: ProfesiTableActionProps) => {
    const router = useRouter();
    const { setProfesiId, setOpenDelete } = useProfesiStore((state) => state)
    const editHandler = () => {
        router.push(`/master/profesi/edit/${profesiId}`);
    }

    const deleteHandler = () => {
        setProfesiId(profesiId)
        setOpenDelete(true)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="size-6">
                    <EllipsisIcon className="size-6"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-primary"
                        onClick={editHandler}
                    >
                        <PencilIcon className="mr-2 size-4 text-primary" />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="flex flex-row items-center cursor-pointer text-destructive"
                        onClick={deleteHandler}
                    >
                        <DeleteIcon className="mr-2 size-4 text-destructive" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfesiTableAction;