import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useKodePajakStore } from "@store/penggajian/kode_pajak";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PendapatanNonPajakTableActionButton = ({ kodePajakId }: { kodePajakId: number }) => {
    const router = useRouter();
    const { setKodePajakId, setOpenDelete } = useKodePajakStore((state) => state)
    const editHandler = () => {
        router.push(`/penggajian/kode_pajak/edit/${kodePajakId}`);
    }

    const deleteHandler = () => {
        setKodePajakId(kodePajakId)
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

export default PendapatanNonPajakTableActionButton;