"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { PlusCircleIcon } from "lucide-react";

const AddLampiranSkButton = () => {
	const { ref, refId, setOpenLampiranForm } =
		useLampiranSkStore((state) => ({
			ref: state.ref,
			refId: state.refId,
			setOpenLampiranForm: state.setOpenLampiranForm,
		}));

	const clickHandler = () => {
		if (refId === 0) {
			alert("Pilih data Terlebih Dahulu");
			return;
		}
		setOpenLampiranForm(true);
	};

	return (
		<TooltipBuilder
			text={`Tambah Lampiran ${ref}`}
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={clickHandler}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddLampiranSkButton;
