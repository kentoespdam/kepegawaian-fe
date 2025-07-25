import type { RiwayatKontrak } from "@_types/kepegawaian/riwayat_kontrak";
import type { PegawaiDetail } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { encodeId } from "@helpers/number";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type RiwayatKontrakTableActionProps = {
	pegawai: PegawaiDetail;
	data: RiwayatKontrak;
};
const RiwayatKontrakTableAction = ({
	pegawai,
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
		setDefaultValues(pegawai, data);
		router.push(
			`/kepegawaian/kontrak/edit/${encodeId(pegawai.id)}/${encodeId(data.id)}`,
		);
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
