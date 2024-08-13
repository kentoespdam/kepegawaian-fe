import type { Biodata } from "@_types/profil/biodata";
import { TableCell } from "@components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { EllipsisIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

type NonPegawaiTableActionProps = {
	biodata: Biodata;
};
export const NonPegawaiTableAction = ({ biodata }: NonPegawaiTableActionProps) => {
	return (
		<TableCell className="whitespace-nowrap">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="default" size="icon" className="h-7 w-7">
						<EllipsisIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-auto">
					<DropdownMenuGroup>
						<Link href={`/kepegawaian/profil/biodata/edit/${biodata.nik}`}>
							<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
								<PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
								<span>Edit</span>
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
};
