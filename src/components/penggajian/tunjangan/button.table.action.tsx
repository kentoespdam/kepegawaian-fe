import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useTunjanganStore } from "@store/penggajian/tunjangan";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface TunjanganTableActionProps {
    tunjanganId: number
}
const TunjanganTableAction = ({ tunjanganId }: TunjanganTableActionProps) => {
    const params = useSearchParams()
    const jenisTunjangan = params.get("jenisTunjangan")
    const search=new URLSearchParams(params)
    const callbackUrl= btoa(`/penggajian/tunjangan?${search.toString()}`)??""
    search.set("callback",callbackUrl)

    const router = useRouter();
    const { setTunjanganId, setOpenDelete } = useTunjanganStore((state) => state)
    const editHandler = () => {
        router.push(`/penggajian/tunjangan/${jenisTunjangan}/edit/${tunjanganId}?${search.toString()}`);
    }

    const deleteHandler = () => {
        console.log(tunjanganId)
        setTunjanganId(tunjanganId)
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

export default TunjanganTableAction;