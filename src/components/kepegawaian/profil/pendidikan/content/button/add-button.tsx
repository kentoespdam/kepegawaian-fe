"use client";

import type { Biodata } from "@_types/profil/biodata";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useBiodataQuery } from "@store/kepegawaian/biodata/biodata-store";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";

interface AddProfilPendidikanButtonProps {
	nik: string;
}
const AddProfilPendidikanButton = ({ nik }: AddProfilPendidikanButtonProps) => {
	const { setDefaultValues, setOpen } = usePendidikanStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const query = useBiodataQuery<Biodata>(nik);

	if (query.isFetching || query.isLoading)
		return (
			<LoadingButtonClient
				pending={query.isLoading || query.isFetching}
				variant={"ghost"}
				size={"icon"}
				icon={<LoaderCircle />}
			/>
		);

	if (query.isError) return null;
	if (!query.data) return null;

	return (
		<TooltipBuilder
			text="Tambah Pendidikan"
			className="bg-primary text-primary-foreground"
		>
			<Button
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
				onClick={() => {
					setDefaultValues(query.data);
					setOpen(true);
				}}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddProfilPendidikanButton;
