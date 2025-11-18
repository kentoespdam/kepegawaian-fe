import type { Biodata } from "@_types/profil/biodata";
import type { Keluarga } from "@_types/profil/keluarga";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useCallback } from "react";

interface KeluargaTableActionProps {
	biodata: Biodata;
	data: Keluarga;
}
const KeluargaTableAction = ({
	biodata,
	data,
}: KeluargaTableActionProps) => {
	const { setKeluargaId, setDefaultValues, setOpen, setOpenDelete } =
		useKeluargaStore((state) => ({
			setKeluargaId: state.setKeluargaId,
			setDefaultValues: state.setDefaultValues,
			setOpen: state.setOpen,
			setOpenDelete: state.setOpenDelete,
		}));

	const editHandler = useCallback(() => {
		if (data.changedStatus) {
			alert("Data masih menunggu persetujuan. Tidak dapat diedit.");
			return;
		}
		setKeluargaId(data.id);
		setDefaultValues(biodata, data);
		setOpen(true);
	}, [data, biodata, setKeluargaId, setDefaultValues, setOpen]);

	const deleteHadler = useCallback(() => {
		if (data.changedStatus) {
			alert("Data masih menunggu persetujuan. Tidak dapat diedit.");
			return;
		}
		setDefaultValues(biodata);
		setKeluargaId(data.id);
		setOpenDelete(true);
	}, [data, setDefaultValues, biodata, setKeluargaId, setOpenDelete]);

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

export default KeluargaTableAction;
