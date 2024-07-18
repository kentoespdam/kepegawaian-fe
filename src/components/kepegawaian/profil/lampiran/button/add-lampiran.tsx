"use client";
import { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useLampiranProfilStore } from "@store/kepegawaian/profil/lampiran-profil-store";
import { PlusCircleIcon } from "lucide-react";

interface AddLampiranProfilButtonProps {
	jenis: JenisLampiranProfil;
}
const AddLampiranProfilButton = (props: AddLampiranProfilButtonProps) => {
	const { refId, setRef, setOpenLampiranForm } = useLampiranProfilStore(
		(state) => ({
			refId: state.refId,
			setRef: state.setRef,
			setOpenLampiranForm: state.setOpenLampiranForm,
		}),
	);

	const teks = () => {
		switch (props.jenis) {
			case JenisLampiranProfil.Values.PROFIL_PENGALAMAN_KERJA:
				return "Profil Pengalaman Kerja";
			case JenisLampiranProfil.Values.PROFIL_KEAHLIAN:
				return "Profil Keahlian";
			default:
				return "Profil Pendidikan";
		}
	};

	const clickHandler = () => {
		if (refId === 0) {
			alert(`Pilih ${teks()} Terlebih Dahulu`);
			return;
		}
		setRef(props.jenis);
		setOpenLampiranForm(true);
	};

	return (
		<TooltipBuilder
			text={`Tambah Lampiran ${teks()}`}
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

export default AddLampiranProfilButton;
