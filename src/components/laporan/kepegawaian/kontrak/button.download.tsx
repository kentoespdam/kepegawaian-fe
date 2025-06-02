import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { base64toBlob } from "@helpers/string";
import { useMutation } from "@tanstack/react-query";
import { FileSpreadsheetIcon } from "lucide-react";
import { downloadLapKontrak } from "./action";

const LapKontrakDownloadButton = ({ filter }: { filter: string }) => {
	const downloadFile = useMutation({
		mutationFn: downloadLapKontrak,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", data.filename ?? "duk.xlsx");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	const handleDownload = () => {
		downloadFile.mutate(filter);
	};
	return (
		<TooltipBuilder
			text="Download File Excel"
			delayDuration={10}
			className="bg-warning text-warning-foreground"
		>
			<LoadingButtonClient
				pending={downloadFile.isPending}
				onClick={handleDownload}
				icon={<FileSpreadsheetIcon />}
				title="Download"
                className="bg-warning text-warning-foreground hover:bg-warning-foreground hover:text-warning"
			/>
		</TooltipBuilder>
	);
};

export default LapKontrakDownloadButton;
