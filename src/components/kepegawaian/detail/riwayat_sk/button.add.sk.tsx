"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk";
import { PlusCircleIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

type AddSkButtonProps = {
	pegawaiId: number;
};
const AddSkButton = (props: AddSkButtonProps) => {
	const { setDefaultValues, setOpen } = useRiwayatSkStore(
		useShallow((state) => ({
			setDefaultValues: state.setDefaultValues,
			setOpen: state.setOpen,
		})),
	);

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
				className="rounded-full text-primary hover:bg-primary hover:text-primary-foreground size-6 "
				size={"icon"}
				onClick={handleClick}
			>
				<PlusCircleIcon className="size-6" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddSkButton;
