"use client";

import type { Biodata } from "@_types/profil/biodata";
import {
	pendidikanTableColumns,
	type Pendidikan,
} from "@_types/profil/pendidikan";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import { Dialog } from "@components/ui/dialog";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { usePendidikanStore } from "@store/kepegawaian/biodata/pendidikan-store";
import { useQueries } from "@tanstack/react-query";
import ProfilPendidikanTableBody from "./body";
import ProfilPendidikanForm from "./form";
import DeletePendidikanDialog from "./delete-dialog";

interface PendukungPendidikanContentComponentProps {
	biodata: Biodata;
	nik?: string;
}

const PendukungPendidikanContentComponent = (
	props: PendukungPendidikanContentComponentProps,
) => {
	const { open, setOpen } = usePendidikanStore((state) => ({
		open: state.open,
		setOpen: state.setOpen,
	}));

	const queries = useQueries({
		queries: [
			{
				queryKey: ["profil-pendidikan", props.biodata.nik],
				queryFn: () =>
					getPageData<Pendidikan>({
						path: `profil/pendidikan/${props.biodata.nik}/biodata`,
						isRoot: true,
					}),
			},
		],
	});

	return (
		<div className="grid overflow-auto p-2 min-h-96 gap-0">
			<SearchBuilder columns={pendidikanTableColumns} />
			<div className="min-h-96">
				<Table>
					<TableHeadBuilder columns={pendidikanTableColumns} />
					{queries[0].data ? (
						<ProfilPendidikanTableBody
							data={queries[0].data}
							biodata={props.biodata}
						/>
					) : null}
				</Table>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<ProfilPendidikanForm />
			</Dialog>
			<DeletePendidikanDialog />
		</div>
	);
};

export default PendukungPendidikanContentComponent;
