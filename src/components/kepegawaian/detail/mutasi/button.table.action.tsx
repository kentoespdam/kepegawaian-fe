import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { encodeId } from "@helpers/number";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type RiwayatMutasiTableActionProps = {
	pegawaiId: number;
	data: RiwayatMutasi;
};
const RiwayatMutasiTableAction = ({
	pegawaiId,
	data,
}: RiwayatMutasiTableActionProps) => {
	const { setRiwayatMutasiId, setOpenDelete } = useRiwayatMutasiStore(
		(state) => ({
			setRiwayatMutasiId: state.setRiwayatMutasiId,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const router = useRouter();

	const editHandler = () => {
		router.push(
			`/kepegawaian/mutasi/${encodeId(pegawaiId)}/edit/${encodeId(data.id)}`,
		);
	};

	const deleteHandler = () => {
		setRiwayatMutasiId(data.id);
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

export default RiwayatMutasiTableAction;
