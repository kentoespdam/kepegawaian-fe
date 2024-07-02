import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";

interface KepegawaianTableActionProps extends React.HTMLAttributes<HTMLLinkElement> {
    nik?: string
}
const KepegawaianTableAction = (props: KepegawaianTableActionProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon"><EllipsisIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <Link href={`/kepegawaian/data_pegawai/edit/${props.nik}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem> */}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default KepegawaianTableAction;