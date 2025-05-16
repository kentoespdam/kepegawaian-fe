import type { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import { OFFICE_TYPE } from "@_types/index";
import type { LampiranProfil } from "@_types/profil/lampiran";
import { getFile } from "@app/kepegawaian/profil/lampiran/action";
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
import { base64toBlob } from "@helpers/string";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { useGlobalMutation } from "@store/query-store";
import { useMutation } from "@tanstack/react-query";
import {
	CheckIcon,
	DeleteIcon,
	DownloadIcon,
	EllipsisIcon,
	EyeIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";

interface LampiranProfilTableActionProps {
	data: LampiranProfil;
	jenis: JenisLampiranProfil;
	rootKey: string;
}
const LampiranProfilTableAction = (props: LampiranProfilTableActionProps) => {
	const { id, refId, fileName, mimeType } = props.data;
	const path = usePathname();
	const { setLampiranId, setRefId, setOpenDeleteDialog } =
		useLampiranProfilStore(
			useShallow((state) => ({
				setLampiranId: state.setLampiranId,
				setRefId: state.setRefId,
				setOpenDeleteDialog: state.setOpenDeleteDialog,
			})),
		);
	const acceptMutation = useGlobalMutation({
		mutationFunction: acceptLampiranProfilData,
		queryKeys: [[props.rootKey, refId]],
	});

	const deleteHandler = () => {
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
				ref: props.jenis,
				refId: refId,
			},
		});
	};

	const downloadFile = useMutation({
		mutationFn: () => getFile(props.jenis, id),
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${fileName}`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	return (
		<div className="flex justify-between gap-2">
			<TooltipBuilder text="Lihat" className="bg-info text-info-foreground">
				{OFFICE_TYPE.includes(mimeType) ? (
					<Button
						variant="ghost"
						size="icon"
						className="h-6 w-6 text-warning"
						onClick={() => downloadFile.mutate()}
					>
						<DownloadIcon />
					</Button>
				) : (
					<ButtonLink
						href={`/kepegawaian/profil/lampiran/${props.jenis}/${id}?path=${path}`}
						size="icon"
						className="h-6 w-6"
						variant="ghost"
						icon={<EyeIcon className="text-info" />}
					/>
				)}
			</TooltipBuilder>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="default" size="icon" className="size-6">
						<EllipsisIcon className="size-6"/>
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
							onClick={deleteHandler}
						>
							<DeleteIcon className="mr-2 size-4 text-destructive" />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default LampiranProfilTableAction;
