"use client";

import type { Biodata } from "@_types/profil/biodata";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { useBiodataQuery } from "@store/kepegawaian/biodata/biodata-store";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";
import { memo } from "react";

const AddButtonCompoent = memo(({data}:{data:Biodata}) => {
	const { setDefaultValues, setOpen } = usePendidikanStore((state) => ({
		setDefaultValues: state.setDefaultValues,
		setOpen: state.setOpen,
	}));

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
					if (data) {
						setDefaultValues(data);
						setOpen(true);
					}
				}}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);})

AddButtonCompoent.displayName = "AddButtonCompoent";

interface AddProfilPendidikanButtonProps {
	nik: string;
}
const AddProfilPendidikanButton = memo(
	({ nik }: AddProfilPendidikanButtonProps) => {
		

		const query = useBiodataQuery<Biodata>(nik);

		const showLoading=query.isFetching || query.isLoading;
		const isEmptyData=!query.isError && query.data===undefined;

		return isEmptyData ? null : showLoading ? (
			<LoadingButtonClient
				pending={showLoading}
				variant={"ghost"}
				size={"icon"}
				icon={<LoaderCircle />}
			/>
		) : (
			<AddButtonCompoent data={query.data as Biodata} />
		);
	},
);

AddProfilPendidikanButton.displayName = "AddProfilPendidikanButton";

export default AddProfilPendidikanButton;
