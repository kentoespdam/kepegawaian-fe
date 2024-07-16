"use client";

import type { Biodata } from "@_types/profil/biodata";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { usePengalamanKerjaStore } from "@store/kepegawaian/biodata/pengalaman-store";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";

const AddProfilPengalamanKerjaButton = ({ nik }: { nik: string }) => {
	const qc = useQueryClient();
	const biodata = qc.getQueryData<Biodata>(["biodata", nik]);

	const { setDefaultValues, setOpen } = usePengalamanKerjaStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	if (!biodata) return null;

	return (
		<TooltipBuilder
			text="Tambah Pengalaman Kerja"
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

export default AddProfilPengalamanKerjaButton;
