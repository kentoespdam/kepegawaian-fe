import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useRiwayatSpStore } from "@store/kepegawaian/detail/riwayat_sp";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface RiwayatSpTableActionProps {
	pegawaiId: number;
	data: RiwayatSp;
}

const RiwayatSpTableAction = ({
	pegawaiId,
	data,
}: RiwayatSpTableActionProps) => {
	const { setRiwayatSpId, setOpenDelete } = useRiwayatSpStore((state) => ({
		setRiwayatSpId: state.setRiwayatSpId,
		setOpenDelete: state.setOpenDelete,
	}));
	const { push } = useRouter();
	const editHandler = () =>
		push(`/kepegawaian/peringatan/${pegawaiId}/edit/${data.id}`);
	const deleteHandler = () => {
		setRiwayatSpId(data.id);
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

export default RiwayatSpTableAction;
