import type { Biodata } from "@_types/profil/biodata";
import type { Pelatihan } from "@_types/profil/pelatihan";
import { acceptPelatihan } from "@app/kepegawaian/pendukung/pelatihan/action";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useGlobalMutation } from "@store/query-store";
import { CheckIcon, DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PelatihanTableActionProps {
	biodata: Biodata;
	data: Pelatihan;
}
const PelatihanTableAction = (props: PelatihanTableActionProps) => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const store = usePelatihanStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setPelatihanId(props.data.id);
		store.setOpenDelete(true);
	};

	const accMutation = useGlobalMutation({
		mutationFunction: acceptPelatihan,
		queryKeys: [["profil-pelatihan", props.biodata.nik, search.toString()]],
	});

	const acceptHandler = () => {
		const konfirmasi = confirm(
			"Apakah anda yakin ingin menyetujui pelatihan ini?",
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

export default PelatihanTableAction;
