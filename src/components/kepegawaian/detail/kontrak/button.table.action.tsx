import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import type { Pegawai } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type RiwayatKontrakTableActionProps = {
	pegawaiId: number;
	data: RiwayatKontrak;
};
const RiwayatKontrakTableAction = ({
	pegawaiId,
	data,
}: RiwayatKontrakTableActionProps) => {
	const { setDefaultValues, setRiwayatKontrakId, setOpenDelete } =
		useRiwayatKontrakStore((state) => ({
			setDefaultValues: state.setDefaultValues,
			setRiwayatKontrakId: state.setRiwayatKontrakId,
			setOpenDelete: state.setOpenDelete,
		}));
	const qc = useQueryClient();
	const router = useRouter();

	const editHandler = () => {
		const pegawai = qc.getQueryData<Pegawai>(["pegawai", pegawaiId]);
		setDefaultValues(pegawai, data);
		router.push(`/kepegawaian/kontrak/edit/${pegawaiId}/${data.id}`);
	};

	const deleteHandler = () => {
		setRiwayatKontrakId(data.id);
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

export default RiwayatKontrakTableAction;
