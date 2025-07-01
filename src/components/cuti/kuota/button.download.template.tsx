"use client";

import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { base64toBlob } from "@helpers/string";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { downloadCutiKuotaTemplate } from "./action";

const DownloadTemplateKuotaCutiButton = () => {
	const downloadFile = useMutation({
		mutationFn: downloadCutiKuotaTemplate,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type);
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${data.filename}`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	return (
		<TooltipBuilder text="Download Template Kuota Cuti" delayDuration={100} className="bg-info text-info-foreground">
			<Button
				onClick={() => downloadFile.mutate()}
				variant={"ghost"}
				className="text-info hover:opacity-75"
				size={"icon"}
			>
				<DownloadIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default DownloadTemplateKuotaCutiButton;
