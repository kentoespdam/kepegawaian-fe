import type { JenisSp } from "@_types/master/jenis_sp";
import { TableCell } from "@components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useJenisSpStore } from "@store/master/jenis_sp.store";
import { useSanksiStore } from "@store/master/sanksi";

interface JenisSpTableActionProps {
	row: JenisSp;
}
const JenisSpTableAction = ({ row }: JenisSpTableActionProps) => {
	const { setJenisSp, setOpenJenisSpForm, setOpenDelete } = useJenisSpStore(
		(state) => ({
			setJenisSp: state.setJenisSp,
			setOpenJenisSpForm: state.setOpenJenisSpForm,
			setOpenDelete: state.setOpenDelete,
		}),
	);

	const editHandler = () => {
		setJenisSp(row);
		setOpenJenisSpForm(true);
	};

	const deleteHandler = () => {
		setJenisSp(row);
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

export default JenisSpTableAction;
