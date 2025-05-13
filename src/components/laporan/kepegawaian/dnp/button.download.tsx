"use client";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { base64toBlob } from "@helpers/string";
import { useMutation } from "@tanstack/react-query";
import { FileSpreadsheetIcon } from "lucide-react";
import { downloadDnp } from "./action";
const DnpDownloadButton = () => {
	const downloadFile = useMutation({
		mutationFn: downloadDnp,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", data.filename ?? "dnp.xlsx");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	const handleDownload = () => {
		downloadFile.mutate();
	};
	return (
		<TooltipBuilder
			text="Download File Excel"
			delayDuration={10}
			className="bg-primary text-primary-foreground"
		>
			<LoadingButtonClient
				pending={downloadFile.isPending}
				onClick={handleDownload}
				icon={<FileSpreadsheetIcon />}
				title="Download"
			/>
		</TooltipBuilder>
	);
};

export default DnpDownloadButton;
