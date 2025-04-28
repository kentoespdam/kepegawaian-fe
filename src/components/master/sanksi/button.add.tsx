"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { PlusCircleIcon } from "lucide-react";
const AddSanksiButton = () => {
	return (
		<TooltipBuilder text={"Add Roles"} className="bg-primary">
			<Button variant={"ghost"}>
				<PlusCircleIcon className="h-6 w-6 text-primary" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddSanksiButton;
