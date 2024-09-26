"use client";
import type { Pegawai } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useRiwayatKontrakStore } from "@store/kepegawaian/detail/riwayat_kontrak";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type AddKontrakButtonProps = {
	pegawaiId: number;
};
const AddKontrakButton = ({ pegawaiId }: AddKontrakButtonProps) => {
	const setDefaultValues = useRiwayatKontrakStore(
		(state) => state.setDefaultValues,
	);
	const qc = useQueryClient();
	const router = useRouter();
	const handleClick = () => {
		const pegawai = qc.getQueryData<Pegawai>(["pegawai", pegawaiId]);
		setDefaultValues(pegawai);
		router.push(`/kepegawaian/kontrak/add/${pegawaiId}`);
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
