import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
	ChevronDownIcon,
	DownloadIcon,
	FolderSyncIcon,
	UploadCloudIcon,
} from "lucide-react";
import { useState } from "react";
import VerifPhase2UploadDialog from "./dialog.upload";
import TooltipBuilder from "@components/builder/tooltip";

interface VerifPhase2DownloadButtonProps {
	rootBatchId: string;
	downloadHandler: () => void;
	rollbackHandler: () => void;
}
const VerifPhase2DownloadButton = ({
	rootBatchId,
	downloadHandler,
	rollbackHandler,
}: VerifPhase2DownloadButtonProps) => {
	const [openForm, setOpenForm] = useState(false);
	const uploadHandler = () => {
		setOpenForm(true);
	};
	return (
		<>
			<DropdownMenu>
				<TooltipBuilder
					text="Komponen Gaji"
					delayDuration={10}
					className="bg-warning text-warning-foreground"
					key="download"
				>
					<DropdownMenuTrigger asChild>
						<Button
							variant="default"
							className="flex gap-2 mt-2 bg-warning text-warning-foreground hover:bg-warning/80 hover:text-warning-foreground/80"
						>
							<ChevronDownIcon />
							<span>Komponen Gaji</span>
						</Button>
					</DropdownMenuTrigger>
				</TooltipBuilder>
				<DropdownMenuContent className="w-auto">
					<DropdownMenuGroup>
						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer text-primary"
							onClick={downloadHandler}
						>
							<DownloadIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Download Template</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer text-info"
							onClick={uploadHandler}
						>
							<UploadCloudIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Upload Potongan Gaji</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer text-destructive"
							onClick={rollbackHandler}
						>
							<FolderSyncIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Batalkan Perubahan</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<VerifPhase2UploadDialog
				rootBatchId={rootBatchId}
				openForm={openForm}
				setOpenForm={setOpenForm}
			/>
		</>
	);
};

export default VerifPhase2DownloadButton;
