import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ButtonLink } from "@components/ui/link";
import { acceptLampiranProfilData } from "@helpers/action";
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";
import { useGlobalMutation } from "@store/query-store";
import { CheckIcon, DeleteIcon, EllipsisIcon, EyeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const LampiranPendidikanAction = ({
	id,
	refId,
}: { id: number; refId: number }) => {
	const path = usePathname();
	const { setLampiranId, setRefId, setOpenDeleteDialog, setOpenLampiran } =
		useLampiranProfilStore((state) => ({
			setLampiranId: state.setLampiranId,
			setRefId: state.setRefId,
			setOpenDeleteDialog: state.setOpenDeleteDialog,
			setOpenLampiran: state.setOpenLampiran,
		}));
	const acceptMutation = useGlobalMutation(acceptLampiranProfilData, [
		"lampiranPendidikan",
		refId,
	]);

	const deleteHadler = () => {
		setLampiranId(id);
		setRefId(refId);
		setOpenDeleteDialog(true);
	};

	const acceptHandler = () => {
		const c = confirm("Apakah anda yakin ingin menyetujui data ini?");
		if (!c) return;

		acceptMutation.mutate({
			path: "profil/lampiran/accept",
			data: {
				id: id,
				ref: JenisLampiranProfil.Values.PROFIL_PENDIDIKAN,
				refId: refId,
			},
		});
	};

	return (
		<div className="flex justify-between">
			<TooltipBuilder text="Lihat" className="bg-info text-info-foreground">
				<ButtonLink
					href={`/kepegawaian/profil/lampiran/${JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}/${id}?path=${path}`}
					size="icon"
					className="h-6 w-6"
					variant="ghost"
					icon={<EyeIcon className="text-info" />}
				/>
			</TooltipBuilder>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="default" size="icon" className="h-6 w-6">
						<EllipsisIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-auto">
					<DropdownMenuGroup>
						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer text-info"
							onClick={acceptHandler}
						>
							<CheckIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Setujui Data</span>
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
		</div>
	);
};

export default LampiranPendidikanAction;
