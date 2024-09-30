"use client";
import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type AddMutasiButtonProps = {
	pegawaiId: number;
};
const AddMutasiButton = ({ pegawaiId }: AddMutasiButtonProps) => {
	const setDefaultValues = useRiwayatMutasiStore(
		(state) => state.setDefaultValues,
	);
	const router = useRouter();
	return (
		<TooltipBuilder
			text="Tambah Mutasi Pegawai"
			className="bg-primary text-primary-foreground"
		>
			<ButtonLink
				href={`/kepegawaian/mutasi/${pegawaiId}/add`}
				icon={<PlusCircleIcon className=" h-5 w-5" />}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			/>
		</TooltipBuilder>
	);
};

export default AddMutasiButton;
