import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusIcon } from "lucide-react";

const AddTerminasiButton = () => {
	return (
		<>
			<TooltipBuilder text="Input Terminasi">
				<ButtonLink
					href="/kepegawaian/terminasi/add"
					title="Input Terminasi"
                    size="sm"
					icon={<PlusIcon className="h-4 w-4" />}
					className="ml-auto"
				/>
			</TooltipBuilder>
		</>
	);
};

export default AddTerminasiButton;
