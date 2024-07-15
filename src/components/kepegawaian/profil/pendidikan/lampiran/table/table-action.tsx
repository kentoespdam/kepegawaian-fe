import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
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
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";
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

const LampiranPendidikanAction = (props: { data: LampiranProfil }) => {
	const { id, refId, fileName, mimeType } = props.data;
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

	const downloadFile = useMutation({
		mutationFn: () => getFile(JenisLampiranProfil.Values.PROFIL_PENDIDIKAN, id),
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
						href={`/kepegawaian/profil/lampiran/${JenisLampiranProfil.Values.PROFIL_PENDIDIKAN}/${id}?path=${path}`}
						size="icon"
						className="h-6 w-6"
						variant="ghost"
						icon={<EyeIcon className="text-info" />}
					/>
				)}
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
