"use client";
import type { Pageable } from "@_types/index";
import type { Sanksi } from "@_types/master/sanksi";
import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";
import { useSanksiStore } from "@store/master/sanksi";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SanksiForm from "./form.index";

const SanksiFormDialog = () => {
	const { sanksiId, openSanksiForm, setOpenSanksiForm } = useSanksiStore(
		(state) => ({
			sanksiId: state.sanksiId,
			openSanksiForm: state.openSanksiForm,
			setOpenSanksiForm: state.setOpenSanksiForm,
		}),
	);

	const params = useSearchParams();
	const qc = useQueryClient();
	const data = qc.getQueryData<Pageable<Sanksi>>(["sanksi", params.toString()]);
	const sanksi = data?.content.find((sanksi) => sanksi.id === sanksiId);

	return (
		<Dialog open={openSanksiForm} onOpenChange={setOpenSanksiForm}>
			<DialogContent>
				<DialogTitle>Add Roles</DialogTitle>
				<SanksiForm
					qKey={["sanksi", params.toString()]}
					setOpenSanksiForm={setOpenSanksiForm}
					sanksi={sanksi}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default SanksiFormDialog;
