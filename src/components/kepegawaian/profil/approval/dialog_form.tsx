"use client";

import type {
	InferDataType,
	ProfileUpdateDetail,
	ProfilUpdate,
	TableName,
} from "@_types/profil/profil-update";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useProfilUpdateStore } from "@store/kepegawaian/profil/profil-update-store";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import DetailPerubahan from "./detail/detail_perubahan";
import TableProfilUpdate from "./detail/profil_update";
import ApprovalFormComponent from "./form_component";

interface FormComponentProps {
	profilUpdate: ProfilUpdate;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const FormComponentContent = memo<FormComponentProps>(
	({ profilUpdate, open, setOpen }) => {
		const tableName = profilUpdate.tableName as TableName;
		const { data } = useQuery({
			queryKey: ["profil-update-detail", profilUpdate?.id],
			queryFn: () =>
				globalGetDataEnc<ProfileUpdateDetail<InferDataType<typeof tableName>>>({
					path: encodeString(`profil/profil-update/${profilUpdate?.id}`),
					isRoot: true,
				}),
			enabled: !!profilUpdate?.id && open,
		});

		if (!profilUpdate || !data) return null;

		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="min-w-fit max-h-[90vh] overflow-auto p-4">
					<DialogHeader>
						<DialogTitle>Review Perubahan Data</DialogTitle>
					</DialogHeader>
					<Separator />
					<div className="grid gap-0 font-bold text-center">
						<span>REVIEW PENGAJUAN PERUBAHAN DATA PROFIL PEGAWAI</span>
						<span>
							{profilUpdate.nama}/ NIP {profilUpdate.nipam}
						</span>
					</div>
					<TableProfilUpdate data={profilUpdate} />
					<DetailPerubahan tableName={profilUpdate.tableName} data={data} />
					<ApprovalFormComponent />
				</DialogContent>
			</Dialog>
		);
	},
);

FormComponentContent.displayName = "FormComponentContent";

const FormComponent = memo(() => {
	const { profilUpdate, open, setOpen } = useProfilUpdateStore((state) => ({
		profilUpdate: state.profilUpdate,
		open: state.open,
		setOpen: state.setOpen,
	}));

	if (!open || !profilUpdate) return null;

	return (
		<FormComponentContent
			profilUpdate={profilUpdate}
			open={open}
			setOpen={setOpen}
		/>
	);
});

FormComponent.displayName = "FormComponent";

const ApprovalProfilFormDialog = () => {
	const open = useProfilUpdateStore().open;
	return open ? <FormComponent /> : null;
};

export default ApprovalProfilFormDialog;