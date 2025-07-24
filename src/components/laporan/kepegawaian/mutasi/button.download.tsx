import type { FilterMutasiSchema } from "@_types/kepegawaian/mutasi";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { FileSpreadsheet, FileSpreadsheetIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { downloadMutasi } from "./action";
import { base64toBlob } from "@helpers/string";

type MutasiDownloadButtonProps = {
	form: UseFormReturn<FilterMutasiSchema>;
};
const MutasiDownloadButton = ({ form }: MutasiDownloadButtonProps) => {
	const downloadFile = useMutation({
		mutationFn: downloadMutasi,
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
		downloadFile.mutate(form.getValues());
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
				className="mt-2 bg-warning text-warning-foreground hover:bg-warning-foreground hover:text-warning"
			/>
		</TooltipBuilder>
	);
};

export default MutasiDownloadButton;
