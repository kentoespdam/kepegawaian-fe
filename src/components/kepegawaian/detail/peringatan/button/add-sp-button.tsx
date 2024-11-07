"use client";

import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";

type AddRiwayatSpButtonProps = {
	pegawaiId: number;
};

const AddRiwayatSpButton = ({ pegawaiId }: AddRiwayatSpButtonProps) => {
	return (
		<TooltipBuilder
			text="Tambah Surat Peringatan"
			className="bg-primary text-primary-foreground"
		>
			<ButtonLink
				href={`/kepegawaian/peringatan/${pegawaiId}/add`}
				icon={<PlusCircleIcon className=" h-5 w-5" />}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			/>
		</TooltipBuilder>
	);
};

export default AddRiwayatSpButton;
