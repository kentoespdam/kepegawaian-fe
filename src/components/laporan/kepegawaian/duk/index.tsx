"use client";
import type { DUK } from "@_types/laporan/kepegawaian/duk";
import { Table } from "@components/ui/table";
import DukTableHeader from "./table.head";
import DukTableBody from "./table.body";

interface LapDukComponentProps {
	duk: DUK[];
}
const LapDukComponent = ({ duk }: LapDukComponentProps) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<DukTableHeader />
				<DukTableBody duk={duk} />
			</Table>
		</div>
	);
};

export default LapDukComponent;
