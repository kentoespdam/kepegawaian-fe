"use client";

import type { ProfilUpdate } from "@_types/profil/profil-update";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { memo } from "react";

// Constants
const TABLE_ROWS = [
	{ key: "jabatan", label: "Jabatan" },
	{ key: "dataDescription", label: "Jenis Perubahan" },
	{ key: "reqDate", label: "Tgl. Pengajuan" },
] as const;

interface TableProfilUpdateProps {
	data: ProfilUpdate;
}

const TableProfilUpdate = memo<TableProfilUpdateProps>(({data}) => {
	return (
		<Table className="border">
			<TableBody>
				{TABLE_ROWS.map((row) => (
					<TableRow key={row.key}>
						<TableCell className="flex justify-between">
							<span>{row.label}</span>
							<span>:</span>
						</TableCell>
						<TableCell>{data?.[row.key]}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

});

TableProfilUpdate.displayName = "TableProfilUpdate";

export default TableProfilUpdate;