import { OFFICE_TYPE } from "@_types/index";
import type { LampiranSk } from "@_types/kepegawaian/lampiran_sk";
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
import { base64toBlob } from "@helpers/string";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
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
import { acceptLampiranSk, getFile } from "./action";
import { useShallow } from "zustand/shallow";

type LampiranSkTableActionProps = {
	data: LampiranSk;
	rootKey: string;
};
const LampiranSkTableAction = ({
	data,
	rootKey,
}: LampiranSkTableActionProps) => {
	const { id, ref, refId, fileName, mimeType } = data;
	const path = usePathname();
	const callbackUrl = btoa(path);

	const { setLampiranId, setRefId, setOpenDeleteLampiranForm } =
		useLampiranSkStore(
			useShallow((state) => ({
				setLampiranId: state.setLampiranId,
				setRefId: state.setRefId,
				setOpenDeleteLampiranForm: state.setOpenDeleteLampiranForm,
			})),
		);

	const acceptMutation = useGlobalMutation({
		mutationFunction: acceptLampiranSk,
		queryKeys: [[rootKey, ref, refId]],
	});

	const acceptHandler = () => {
		const c = confirm("Apakah anda yakin ingin menyetujui data ini?");
		if (!c) return;

		acceptMutation.mutate({
			id: id,
			ref: ref,
			refId: refId,
		});
	};

	const deleteHandler = () => {
		setLampiranId(id);
		setRefId(refId);
		setOpenDeleteLampiranForm(true);
	};

	const downloadFile = useMutation({
		mutationFn: () => getFile(ref, id),
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
			<TooltipBuilder
				text={OFFICE_TYPE.includes(mimeType) ? "Download" : "Lihat"}
				className={
					OFFICE_TYPE.includes(mimeType)
						? "bg-warning"
						: "bg-info text-info-foreground"
				}
			>
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
						href={`/kepegawaian/lampiran/${ref}/${id}?path=${callbackUrl}`}
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

export default LampiranSkTableAction;
