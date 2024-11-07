"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { PlusCircleIcon } from "lucide-react";

type AddSkButtonProps = {
	pegawaiId: number;
};
const AddSkButton = (props: AddSkButtonProps) => {
	const { setDefaultValues, setOpen } = useRiwayatSkStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const handleClick = () => {
		setDefaultValues(props.pegawaiId);
		setOpen(true);
	};

	return (
		<TooltipBuilder
			text="Tambah Mutasi Pegawai"
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
