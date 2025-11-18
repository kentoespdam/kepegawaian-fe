import TooltipBuilder from "@components/builder/tooltip";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { PencilIcon } from "lucide-react";
import { memo } from "react";

const EditProfilPendidikanButton = memo(() => {
	const { open, setOpen } = usePendidikanStore((state) => ({
		open: state.open,
		setOpen: state.setOpen,
	}));
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<TooltipBuilder
				text="Tambah Pendidikan"
				className="bg-primary text-primary-foreground"
			>
				<DialogTrigger className="flex gap-0 items-center text-primary hover:opacity-75">
					<PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
					<span>Edit</span>
				</DialogTrigger>
			</TooltipBuilder>
		</Dialog>
	);
});
EditProfilPendidikanButton.displayName = "EditProfilPendidikanButton";

export default EditProfilPendidikanButton;
