"use client";

import type { Biodata } from "@_types/profil/biodata";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { usePendidikanStore } from "@store/kepegawaian/biodata/pendidikan-store";
import { PlusCircleIcon } from "lucide-react";

interface AddProfilPendidikanButtonProps {
	biodata: Biodata;
}
const AddProfilPendidikanButton = ({
	biodata,
}: AddProfilPendidikanButtonProps) => {
	const { setDefaultValues, setOpen } = usePendidikanStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	return (
		<TooltipBuilder
			text="Tambah Pendidikan"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={() => {
					setDefaultValues(biodata);
					setOpen(true);
				}}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddProfilPendidikanButton;
