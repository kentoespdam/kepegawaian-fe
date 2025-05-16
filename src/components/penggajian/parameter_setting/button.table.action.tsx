import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useParameterSettingStore } from "@store/penggajian/parameter_setting";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ParameterSettingTableActionButtonProps {
    parameterSettingId: number
}
const ParameterSettingTableActionButton = ({ parameterSettingId
}: ParameterSettingTableActionButtonProps) => {
    const router = useRouter();
    const { setParameterSettingId, setOpenDelete } = useParameterSettingStore((state) => state)
    const editHandler = () => {
        router.push(`/penggajian/parameter_setting/edit/${parameterSettingId}`)
    }

    const deleteHandler = () => {
        setParameterSettingId(parameterSettingId)
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

export default ParameterSettingTableActionButton;