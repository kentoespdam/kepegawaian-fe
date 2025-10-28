import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import React, { useCallback, useState } from "react"
import VerifPhase2UploadDialog from "./dialog.upload"
import { Button } from "@components/ui/button"
import TooltipBuilder from "@components/builder/tooltip"
import {
	ChevronDownIcon,
	DownloadIcon,
	FolderSyncIcon,
	UploadCloudIcon,
} from "lucide-react"

interface VerifPhase2DownloadButtonProps {
	rootBatchId: string
	downloadHandler: () => void
	rollbackHandler: () => void
}
const VerifPhase2DownloadButton = ({
	rootBatchId,
	downloadHandler,
	rollbackHandler,
}: VerifPhase2DownloadButtonProps) => {
	const [openForm, setOpenForm] = useState(false)
	const uploadHandler = useCallback(() => {
		setOpenForm(true)
	}, [])

	const isDisabledUpload = rootBatchId === undefined || rootBatchId === ""
	return (
		<>
			<DropdownMenu>
				<TooltipBuilder
					text="Komponen Gaji"
					className="bg-warning text-warning-foreground"
					delayDuration={100}
				>
					<DropdownMenuTrigger asChild>
						<Button className="mt-2 flex gap-2 bg-warning text-warning-foreground hover:bg-warning/80 hover:text-warning-foreground">
							<ChevronDownIcon className="size-4" />
							Komponen Gaji
						</Button>
					</DropdownMenuTrigger>
				</TooltipBuilder>
				<DropdownMenuContent className="w-auto">
					<DropdownMenuGroup>
						<DropdownMenuItem
							className="flex cursor-pointer flex-row items-center text-primary"
							onClick={downloadHandler}
						>
							<DownloadIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Download Template</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="flex cursor-pointer flex-row items-center text-info"
							onClick={uploadHandler}
							disabled={isDisabledUpload}
						>
							<UploadCloudIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Upload Potongan Gaji</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="flex cursor-pointer flex-row items-center text-destructive"
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
	)
}

export default VerifPhase2DownloadButton
