import type { RiwayatSk } from "@_types/kepegawaian/riwayat_sk";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

type RiwayatSkActionButtonProps = {
	pegawaiId: number;
	data: RiwayatSk;
};
const RiwayatSkActionButton = ({
	pegawaiId,
	data,
}: RiwayatSkActionButtonProps) => {
	const { setRiwayatSkId, setDefaultValues, setOpen, setOpenDelete } =
		useRiwayatSkStore(
			useShallow((state) => ({
				setRiwayatSkId: state.setRiwayatSkId,
				setDefaultValues: state.setDefaultValues,
				setOpen: state.setOpen,
				setOpenDelete: state.setOpenDelete,
			})),
		);
	const editHandler = () => {
		setDefaultValues(pegawaiId, data);
		setOpen(true);
	};

	const deleteHadler = () => {
		setRiwayatSkId(data.id);
		setOpenDelete(true);
	};

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
						onClick={deleteHadler}
					>
						<DeleteIcon className="mr-2 size-4 text-destructive" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default RiwayatSkActionButton;
