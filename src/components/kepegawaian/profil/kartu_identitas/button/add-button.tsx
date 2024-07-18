"use client";
import type { Biodata } from "@_types/profil/biodata";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { getDataById } from "@helpers/action";
import { useKartuIdentitasStore } from "@store/kepegawaian/profil/kartu-identitas-store";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";

interface AddProfilKartuIdentitasButtonProps {
	nik: string;
}

const AddProfilKartuIdentitasButton = ({
	nik,
}: AddProfilKartuIdentitasButtonProps) => {
	const { setDefaultValues, setOpen } = useKartuIdentitasStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const query = useQuery({
		queryKey: ["biodata", nik],
		queryFn: () =>
			getDataById<Biodata>({
				path: "profil/biodata",
				id: nik,
				isRoot: true,
			}),
		enabled: !!nik,
	});

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
			text="Tambah Kartu Identitas"
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

export default AddProfilKartuIdentitasButton;
