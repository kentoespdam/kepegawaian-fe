"use client";

import type { PegawaiDetail } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { PlusCircleIcon } from "lucide-react";

const AddPengajuanCutiButton = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	const { setOpen, setDefaultValue } = usePengajuanCutiStore((state) => ({
		setOpen: state.setOpen,
		setDefaultValue: state.setDefaultValue,
	}));

	return (
		<TooltipBuilder text="Add Tunjangan" delayDuration={100}>
			<Button
				onClick={() => {
					setDefaultValue(pegawai);
					setOpen(true);
				}}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	);
};

export default AddPengajuanCutiButton;
