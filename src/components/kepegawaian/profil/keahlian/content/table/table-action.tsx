import type { Biodata } from "@_types/profil/biodata";
import type { Keahlian } from "@_types/profil/keahlian";
import { acceptKeahlian } from "@app/kepegawaian/pendukung/keahlian/action";
import { acceptPendidikan } from "@app/kepegawaian/pendukung/pendidikan/action";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useKeahlianStore } from "@store/kepegawaian/profil/keahlian-store";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { useGlobalMutation } from "@store/query-store";
import { CheckIcon, DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface KeahlianTableActionProps {
	biodata: Biodata;
	data: Keahlian;
}
const KeahlianTableAction = (props: KeahlianTableActionProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const store = useKeahlianStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setKeahlianId(props.data.id);
		store.setOpenDelete(true);
	};

	const accMutation = useGlobalMutation({
		mutationFunction: acceptKeahlian,
		queryKeys: [["profil-keahlian", props.biodata.nik, search.toString()]],
	});

	const acceptHandler = () => {
		const konfirmasi = confirm(
			"Apakah anda yakin ingin menyetujui keahlian ini?",
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
						<CheckIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Setujui Data</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default KeahlianTableAction;
