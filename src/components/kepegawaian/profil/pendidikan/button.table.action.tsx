import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { acceptPendidikan } from "@app/kepegawaian/pendukung/pendidikan/action";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { useGlobalMutation } from "@store/query-store";
import { CheckIcon, DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ProfilPendidikanActionProps {
	biodata: Biodata;
	data: Pendidikan;
}

const ProfilPendidikanAction = (props: ProfilPendidikanActionProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const store = usePendidikanStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setPendidikanId(props.data.id);
		store.setOpenDelete(true);
	};

	const accMutation = useGlobalMutation({
		mutationFunction: acceptPendidikan,
		queryKeys: [["pendidikan", props.biodata.nik, search.toString()]],
	});

	const acceptHandler = () => {
		const konfirmasi = confirm(
			"Apakah anda yakin ingin menyetujui pendidikan ini?",
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

export default ProfilPendidikanAction;
