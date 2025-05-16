import type { Pageable } from "@_types/index";
import type { Pegawai } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { PlusIcon } from "lucide-react";
import React from "react";

interface MasaKerjaTableCellProps {
	tmtKerja: string | null;
}
const MasaKerjaTableCell = ({ tmtKerja }: MasaKerjaTableCellProps) => {
	const now = new Date();
	const tmt = new Date(tmtKerja ?? 0);
	const masaKerjaTahun = now.getFullYear() - tmt.getFullYear();
	const masaKerjaBulan = now.getMonth() - tmt.getMonth();

	return (
		<TableCell align="center" className="border-x text-nowrap">
			{masaKerjaTahun} thn {masaKerjaBulan} bln
		</TableCell>
	);
};

interface CalonPensiunTableBodyProps {
	data: Pageable<Pegawai>;
}
const CalonPensiunTableBody = ({ data }: CalonPensiunTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x text-nowrap" align="center">
						<TooltipBuilder text="Input Terminasi">
							<ButtonLink
								href={`/kepegawaian/terminasi/add?id=${row.id}`}
								size="icon"
								icon={<PlusIcon className="h-4 w-4" />}
								className="ml-auto h-6 w-6"
							/>
						</TooltipBuilder>
					</TableCell>
					<TableCell className="border-x text-nowrap">{row.tmtPensiun}</TableCell>
					<TableCell className="border-x text-nowrap">{row.nipam}</TableCell>
					<TableCell className="border-x text-nowrap">{row.biodata.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.organisasi.nama}</TableCell>
					<TableCell className="border-x text-nowrap">{row.jabatan.nama}</TableCell>
					<TableCell className="border-x text-nowrap">
						{row.golongan?.pangkat} - {row.golongan?.golongan}
					</TableCell>
					<MasaKerjaTableCell tmtKerja={row.tmtPegawai ?? row.tmtKerja} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default CalonPensiunTableBody;
