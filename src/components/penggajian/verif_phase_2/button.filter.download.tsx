import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, DeleteIcon, DownloadIcon, EllipsisIcon, FolderSyncIcon, PencilIcon, UploadCloudIcon } from "lucide-react";

const VerifPhase2DownloadButton = () => {
	const downloadTemplate = () => {};

	const uploadKomponen = () => {};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="default"
					className="flex gap-2 mt-2 bg-warning text-warning-foreground hover:bg-warning/80 hover:text-warning-foreground/80"
				>
					<ChevronDownIcon /> 
                    <span>Komponen Gaji</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-primary"
						onClick={downloadTemplate}
					>
						<DownloadIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Download Template</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-info"
						onClick={uploadKomponen}
					>
						<UploadCloudIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Upload Potongan Gaji</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-destructive"
						onClick={uploadKomponen}
					>
						<FolderSyncIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Batalkan Perubahan</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default VerifPhase2DownloadButton;
