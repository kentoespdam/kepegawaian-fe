"use client"

import TooltipBuilder from "@components/builder/tooltip"
import { Button } from "@components/ui/button"
import { useCutiKuotaStore } from "@store/cuti/kuota"
import { PlusCircleIcon } from "lucide-react"
import { useCallback } from "react"

const AddKuotaCutiButton = () => {
	const setOpen = useCutiKuotaStore((state) => state.setOpen)

	const addKuotaHandler = useCallback(() => setOpen(true), [setOpen])

	return (
		<TooltipBuilder text="Tambah Kuota Cuti" delayDuration={100}>
			<Button
				onClick={addKuotaHandler}
				variant={"ghost"}
				className="text-primary hover:opacity-75"
				size={"icon"}
			>
				<PlusCircleIcon className=" h-5 w-5" />
			</Button>
		</TooltipBuilder>
	)
}

export default AddKuotaCutiButton
