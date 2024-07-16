import type { Biodata } from "@_types/profil/biodata";
import type { PengalamanKerja } from "@_types/profil/pengalaman_kerja";
import { acceptPengalamanKerja } from "@app/kepegawaian/pendukung/pengalaman_kerja/action";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePengalamanKerjaStore } from "@store/kepegawaian/biodata/pengalaman-store";
import { useGlobalMutation } from "@store/query-store";
import {
	CheckCircleIcon,
	DeleteIcon,
	EllipsisIcon,
	PencilIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ProfilPengalamanActionProps {
	biodata: Biodata;
	data: PengalamanKerja;
}
const ProfilPengalamanAction = (props: ProfilPengalamanActionProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const store = usePengalamanKerjaStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setPengalamanId(props.data.id);
		store.setOpenDelete(true);
	};

	const accMutation = useGlobalMutation({
		mutationFunction: acceptPengalamanKerja,
		queryKeys: [["pengalaman-kerja", props.biodata.nik, search.toString()]],
	});

	const acceptHandler = () => {
		const konfirmasi = confirm(
			"Apakah anda yakin ingin menyetujui pengalaman kerja ini?",
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

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-info"
						onClick={acceptHandler}
					>
						<CheckCircleIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Setujui Data</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfilPengalamanAction;
