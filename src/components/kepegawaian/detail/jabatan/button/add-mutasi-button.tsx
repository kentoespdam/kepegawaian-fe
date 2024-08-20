import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { PlusCircleIcon } from "lucide-react";

type AddMutasiButtonProps = {
	pegawaiId: number;
};
const AddMutasiButton = (props: AddMutasiButtonProps) => {
	return (
		<TooltipBuilder
			text="Tambah Mutasi Pegawai"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				// onClick={() => {
				// 	setDefaultValues(query.data);
				// 	setOpen(true);
				// }}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddMutasiButton;
