"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useSanksiStore } from "@store/master/sanksi";
import { PlusCircleIcon } from "lucide-react";
const AddSanksiButton = () => {
	const setOpenSanksiForm = useSanksiStore().setOpenSanksiForm;
	return (
		<TooltipBuilder text={"Add Roles"} className="bg-primary">
			<Button variant={"ghost"} onClick={() => setOpenSanksiForm(true)}>
				<PlusCircleIcon className="h-6 w-6 text-primary" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddSanksiButton;
