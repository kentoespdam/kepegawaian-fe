"use client";
import type { Biodata } from "@_types/profil/biodata";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { usePelatihanStore } from "@store/kepegawaian/profil/pelatihan-store";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";

interface AddProfilPelatihanButtonProps {
	nik: string;
}

const AddProfilPelatihanButton = ({ nik }: AddProfilPelatihanButtonProps) => {
	const { setDefaultValues, setOpen } = usePelatihanStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

	const query = useQuery({
		queryKey: ["biodata", nik],
		queryFn: () =>
			getDataByIdEnc<Biodata>({
				path: encodeString("profil/biodata"),
				id: encodeString(nik),
				isRoot: true,
				isString: true,
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
			text="Tambah Pelatihan"
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

export default AddProfilPelatihanButton;
