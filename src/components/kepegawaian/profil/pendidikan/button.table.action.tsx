import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import type { QueryKey } from "@tanstack/react-query";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

interface ProfilPendidikanActionProps {
	biodata: Biodata;
	data: Pendidikan;
	qKey: QueryKey;
}

const ProfilPendidikanAction = (props: ProfilPendidikanActionProps) => {
	const store = usePendidikanStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setPendidikanId(props.data.id);
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

export default ProfilPendidikanAction;
