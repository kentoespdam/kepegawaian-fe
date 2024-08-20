"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";

type AddSkButtonProps = {
	pegawaiId: number;
};
const AddSkButton = (props: AddSkButtonProps) => {
	const { setDefaultValues, setOpen } = useRiwayatSkStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const { ref, refId } = useLampiranSkStore((state) => ({
		ref: state.ref,
		refId: state.refId,
	}));

	const handleClick = () => {
		if (ref === "" || refId === 0) {
			alert("Pilih data terlebih dahulu");
			return;
		}
		setDefaultValues(props.pegawaiId);
		setOpen(true);
	};

	return (
		<TooltipBuilder
			text="Tambah SK"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={handleClick}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddSkButton;
