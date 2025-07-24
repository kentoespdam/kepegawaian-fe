import type { CutiKuota } from "@_types/cuti/kuota";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useCutiKuotaStore } from "@store/cuti/kuota";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

const CutiKuotaTableAction = ({ data }: { data: CutiKuota }) => {
	const { setSelectedDataId, setOpen, setOpenDelete } = useCutiKuotaStore(
		(state) => ({
			setSelectedDataId: state.setSelectedDataId,
			setOpen: state.setOpen,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const deleteHandler = () => {
		setSelectedDataId(data.id);
		setOpenDelete(true);
	};

	const editHandler = () => {
		setSelectedDataId(data.id);
		setOpen(true);
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

export default CutiKuotaTableAction;
