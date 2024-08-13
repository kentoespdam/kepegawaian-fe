import type { Biodata } from "@_types/profil/biodata";
import type { Keluarga } from "@_types/profil/keluarga";
import { acceptKeluarga } from "@app/kepegawaian/pendukung/keluarga/action";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useKeluargaStore } from "@store/kepegawaian/profil/keluarga-store";
import { useGlobalMutation } from "@store/query-store";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface KeluargaTableActionProps {
	biodata: Biodata;
	data: Keluarga;
}
const KeluargaTableAction = (props: KeluargaTableActionProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const store = useKeluargaStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setKeluargaId(props.data.id);
		store.setOpenDelete(true);
	};

	const accMutation = useGlobalMutation({
		mutationFunction: acceptKeluarga,
		queryKeys: [["profil-keluarga", props.biodata.nik, search.toString()]],
	});

	const acceptHandler = () => {
		const konfirmasi = confirm(
			"Apakah anda yakin ingin menyetujui keluarga ini?",
		);
		if (!konfirmasi) return;

		accMutation.mutate({
			id: props.data.id,
			nik: props.biodata.nik,
		});
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

export default KeluargaTableAction;
