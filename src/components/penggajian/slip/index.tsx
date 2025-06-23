import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CircleXIcon, PrinterIcon } from "lucide-react";
import SlipGajiContentComponent from "./content";

type SlipGajiProps = {
	gajiId: number;
	open: boolean;
	setOpen: (val: boolean) => void;
};
const SlipGajiComponent = ({ gajiId, open, setOpen }: SlipGajiProps) => {
	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ["slip-gaji", gajiId],
		queryFn: () =>
			getDataByIdEnc<GajiBatchMaster>({
				path: encodeString("penggajian/batch/master"),
				id: encodeId(gajiId),
				isRoot: true,
			}),
		enabled: !!gajiId,
	});

	const doCetak = async () => {
		const srcDiv = document.getElementById("target-gaji-content");
		if (!srcDiv) return;
		const targetDiv = document.getElementById("clone-gaji-content");
		if (!targetDiv) return;
		targetDiv.innerHTML = srcDiv.innerHTML;

		const pdf = new jsPDF();
		const canvas = await html2canvas(targetDiv);
		const imgData = canvas.toDataURL("image/png");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save(`slip-gaji-${data?.nipam}-${data?.periode}.pdf`);
		targetDiv.innerHTML = "";
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogContent className="grid gap-2 min-w-[80%] h-full p-0 pb-2">
				<DialogHeader className="p-4 border-b">
					<DialogTitle>Slip Gaji</DialogTitle>
				</DialogHeader>
				<div className={cn("max-h-[80vh] p-4 overflow-auto")}>
					{isLoading || isFetching || isError || !data ? (
						<div>Loading</div>
					) : (
						<SlipGajiContentComponent gaji={data} />
					)}
				</div>
				<DialogFooter className="border-t p-2">
					<Button className="flex gap-1" size={"sm"} onClick={doCetak}>
						<PrinterIcon className="size-4" />
						<span>Print</span>
					</Button>
					<DialogClose asChild>
						<Button variant="destructive" className="flex gap-1" size={"sm"}>
							<CircleXIcon className="size-4" />
							<span>Cancel</span>
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SlipGajiComponent;
