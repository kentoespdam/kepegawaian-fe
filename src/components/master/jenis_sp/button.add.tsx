"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useJenisSpStore } from "@store/master/jenis_sp.store";
import { PlusCircleIcon } from "lucide-react";

const JenisSpAddButton = () => {
	const { setOpenJenisSpForm } = useJenisSpStore((state) => ({
		setOpenJenisSpForm: state.setOpenJenisSpForm,
	}));

	return (
		<TooltipBuilder text={"Add Roles"} className="bg-primary">
			<Button variant={"ghost"} onClick={() => setOpenJenisSpForm(true)}>
				<PlusCircleIcon className="h-6 w-6 text-primary" />
			</Button>
		</TooltipBuilder>
	);
};

export default JenisSpAddButton;
