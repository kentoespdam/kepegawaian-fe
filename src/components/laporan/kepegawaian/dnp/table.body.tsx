import type { DnpResponse } from "@_types/laporan/kepegawaian/dnp";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import React from "react";
import DnpTableBodySub from "./table.body.sub";

interface DnpTableBodyProps {
	dnpResponse: DnpResponse;
}
const DnpTableBody = ({ dnpResponse }: DnpTableBodyProps) => {
	const { data, organisasi } = dnpResponse;
	let globalCounter = 1;

	return (
		<TableBody>
			{organisasi.map((organization) => {
				const filteredDnpList = data.filter((dnp) =>
					organization.kode === "1"
						? dnp.kode_organisasi === organization.kode
						: dnp.kode_organisasi.startsWith(organization.kode),
				);

				const localCounter = globalCounter + filteredDnpList.length;
				globalCounter = localCounter;

				return (
					<React.Fragment key={`org-${organization.kode}`}>
						<TableRow>
							<TableCell className="border" />
							<TableCell className="border" />
							<TableCell className="border font-bold" colSpan={14}>
								{organization.nama}
							</TableCell>
						</TableRow>
						<DnpTableBodySub
							maxUrut={localCounter}
							dnpList={filteredDnpList}
							key={`sub-${organization.kode}`}
						/>
					</React.Fragment>
				);
			})}
		</TableBody>
	);
};

export default DnpTableBody;
