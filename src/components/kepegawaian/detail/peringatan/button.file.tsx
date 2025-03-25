import { OFFICE_TYPE } from "@_types/index";
import type { RiwayatSp } from "@_types/kepegawaian/riwayat-sp";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { ButtonLink } from "@components/ui/link";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, EyeIcon } from "lucide-react";
import { getFile } from "./action";
import { base64toBlob } from "@helpers/string";

interface RiwayatSpLampiranFileButtonProps {
	data: RiwayatSp;
}
const RiwayatSpLampiranFileButton = ({
	data,
}: RiwayatSpLampiranFileButtonProps) => {
	const { id, pegawaiId, fileName, mimeType } = data;
	const downloadFile = useMutation({
		mutationFn: () => getFile(id),
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
					href={`/kepegawaian/peringatan/${pegawaiId}/file/${id}`}
					size="icon"
					className="h-6 w-6"
					variant="ghost"
					icon={<EyeIcon className="text-info" />}
				/>
			)}
		</TooltipBuilder>
	);
};

export default RiwayatSpLampiranFileButton;
