"use client";
import type { Pegawai } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type AddMutasiButtonProps = {
	pegawaiId: number;
};
const AddMutasiButton = ({ pegawaiId }: AddMutasiButtonProps) => {
	const { setDefaultValues, setOpen } = useRiwayatMutasiStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const router = useRouter();

	const qc = useQueryClient();

	const handleClick = () => {
		// const pegawai = qc.getQueryData<Pegawai>(["pegawai", pegawaiId]);
		// setDefaultValues(pegawai);
		// setOpen(true);
		router.push(`/kepegawaian/mutasi/add/${pegawaiId}`);
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

export default AddMutasiButton;
