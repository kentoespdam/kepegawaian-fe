"use client";
import type { Pegawai } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type AddKontrakButtonProps = {
	pegawai: Pegawai;
};
const AddKontrakButton = ({ pegawai }: AddKontrakButtonProps) => {
	const { id, statusPegawai } = pegawai;
	const setDefaultValues = useRiwayatKontrakStore(
		(state) => state.setDefaultValues,
	);
	const router = useRouter();
	const handleClick = () => {
		if (statusPegawai !== "KONTRAK") {
			return alert("Pegawai ini bukan kontrak");
		}
		setDefaultValues(pegawai);
		router.push(`/kepegawaian/kontrak/add/${id}`);
	};

	return (
		<TooltipBuilder
			text="Tambah Mutasi Pegawai"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={handleClick}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddKontrakButton;
