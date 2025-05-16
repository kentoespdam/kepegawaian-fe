"use client";

import type { Biodata } from "@_types/profil/biodata";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useBiodataQuery } from "@store/kepegawaian/biodata/biodata-store";
import { usePengalamanKerjaStore } from "@store/kepegawaian/profil/pengalaman-store";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";

const AddProfilPengalamanKerjaButton = ({ nik }: { nik: string }) => {
	const { setDefaultValues, setOpen } = usePengalamanKerjaStore(
		useShallow((state) => ({
			setDefaultValues: state.setDefaultValues,
			setOpen: state.setOpen,
		})),
	);

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
			text="Tambah Pengalaman Kerja"
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
				<PlusCircleIcon className="size-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddProfilPengalamanKerjaButton;
