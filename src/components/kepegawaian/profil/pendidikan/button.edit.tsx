import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import TooltipBuilder from "@components/builder/tooltip";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { PencilIcon } from "lucide-react";

interface EditProfilPendidikanButtonProps {
	biodata: Biodata;
	pendidikan: Pendidikan;
}
const EditProfilPendidikanButton = (props: EditProfilPendidikanButtonProps) => {
	const store = usePendidikanStore();
	return (
		<Dialog open={store.open} onOpenChange={store.setOpen}>
			<TooltipBuilder
				text="Tambah Pendidikan"
				className="bg-primary text-primary-foreground"
			>
				<DialogTrigger className="flex gap-0 items-center text-primary hover:opacity-75">
					<PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
					<span>Edit</span>
				</DialogTrigger>
			</TooltipBuilder>
			{/* <ProfilPendidikanForm biodata={props.biodata} /> */}
		</Dialog>
	);
};

export default EditProfilPendidikanButton;
