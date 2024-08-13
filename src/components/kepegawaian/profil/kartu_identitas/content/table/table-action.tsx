import type { Biodata } from "@_types/profil/biodata";
import type { KartuIdentitas } from "@_types/profil/kartu_identitas";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

interface KartuIdentitasTableActionProps {
	biodata: Biodata;
	data: KartuIdentitas;
}
const KartuIdentitasTableAction = (props: KartuIdentitasTableActionProps) => {
	const store = useKartuIdentitasStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setKartuIdentitasId(props.data.id);
		store.setOpenDelete(true);
	};

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
						onClick={deleteHadler}
					>
						<DeleteIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default KartuIdentitasTableAction;
