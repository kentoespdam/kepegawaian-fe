"use client";
import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useLampiranProfilStore } from "@store/kepegawaian/biodata/lampiran-profil-store";
import { PlusCircleIcon } from "lucide-react";

const AddLampiranPenddidikanButton = () => {
	const { refId, setRef, setOpenLampiranForm } = useLampiranProfilStore(
		(state) => ({
			refId: state.refId,
			setRef: state.setRef,
			setOpenLampiranForm: state.setOpenLampiranForm,
		}),
	);

	const clickHandler = () => {
		if (refId === 0) {
			alert("Pilih Pendidikan Terlebih Dahulu");
			return;
		}
		setRef(JenisLampiranProfil.Values.PROFIL_PENDIDIKAN);
		setOpenLampiranForm(true);
	};

	return (
		<TooltipBuilder
			text="Tambah Lampiran Pendidikan"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={clickHandler}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddLampiranPenddidikanButton;
