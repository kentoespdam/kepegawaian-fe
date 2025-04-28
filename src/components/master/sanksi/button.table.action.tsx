import type { Sanksi } from "@_types/master/sanksi";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useSanksiStore } from "@store/master/sanksi";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

interface SanksiTableActionProps {
	row: Sanksi;
}
const SanksiTableAction = ({ row }: SanksiTableActionProps) => {
	const { setSanksiId, setJenisSpId, setOpenSanksiForm, setOpenDelete } =
		useSanksiStore((state) => ({
			setSanksiId: state.setSanksiId,
			setJenisSpId: state.setJenisSpId,
			setOpenSanksiForm: state.setOpenSanksiForm,
			setOpenDelete: state.setOpenDelete,
		}));

	const editHandler = () => {
		setJenisSpId(0);
		setSanksiId(row.id);
		setOpenSanksiForm(true);
	};

	const deleteHandler = () => {
		setSanksiId(row.id);
		setOpenDelete(true);
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
						onClick={deleteHandler}
					>
						<DeleteIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SanksiTableAction;
