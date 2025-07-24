"use client";

import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useCutiKuotaStore } from "@store/cuti/kuota";
import { UploadIcon } from "lucide-react";

const AddKuotaCutiBatchButton = () => {
	const { setOpenBatch } = useCutiKuotaStore((state) => ({
		setOpenBatch: state.setOpenBatch,
	}));

	return (
		<TooltipBuilder text="Tambah Batch Kuota Cuti" delayDuration={100} className="bg-warning text-warning-foreground">
			<Button
				onClick={() => {
					setOpenBatch(true);
				}}
				variant={"ghost"}
				className="text-warning hover:opacity-75"
				size={"icon"}
			>
				<UploadIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddKuotaCutiBatchButton;
