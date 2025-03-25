import { OFFICE_TYPE } from "@_types/index";
import type { LampiranSk } from "@_types/kepegawaian/lampiran_sk";
import { getFile } from "@app/kepegawaian/profil/lampiran/action";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { TableCell } from "@components/ui/table";
import { base64toBlob } from "@helpers/string";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, EyeIcon } from "lucide-react";

const LampiranTerminasiColumn = ({ row }: { row?: LampiranSk }) => {
	const id = row ? +row.id : 0;
	const downloadFile = useMutation({
		mutationFn: () => getFile("SK_PENSIUN", id),
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${row?.fileName}`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});
	if (!row) return <TableCell align="center" className="border-x text-nowrap">-</TableCell>;
	return (
		<TableCell align="center" className="border-x text-nowrap">
			<TooltipBuilder text="Lihat" className="bg-info text-info-foreground">
				{OFFICE_TYPE.includes(row.mimeType) ? (
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
						href={`/kepegawaian/terminasi/lampiran/${id}`}
						size="icon"
						className="h-6 w-6"
						variant="ghost"
						icon={<EyeIcon className="text-info" />}
					/>
				)}
			</TooltipBuilder>
		</TableCell>
	);
};

export default LampiranTerminasiColumn;
