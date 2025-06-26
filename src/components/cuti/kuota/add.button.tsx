"use client";

import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useCutiKuotaStore } from "@store/cuti/kuota";
import { PlusCircleIcon } from "lucide-react";

const AddKuotaCutiButton = () => {
	const { setOpen } = useCutiKuotaStore((state) => ({
		setOpen: state.setOpen,
	}));

	return (
		<TooltipBuilder text="Add Tunjangan" delayDuration={100}>
			<Button
				onClick={() => {
					setOpen(true);
				}}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddKuotaCutiButton;
