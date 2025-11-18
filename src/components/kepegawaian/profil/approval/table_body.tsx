import type { Pageable } from "@_types/index";
import type { ProfilUpdate } from "@_types/profil/profil-update";
import ProfilUpdateTableAction from "@components/kepegawaian/profil/approval/table_action";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import { useMemo } from "react";

const ProfilUpdateTableBody = ({
	data,
	pegawaiId,
}: {
	data: Pageable<ProfilUpdate>;
	pegawaiId: number;
}) => {
	const rows = useMemo(() => {
		const urut = getUrut(data);
		return data.content.map((item, index) => {
			return {
				...item,
				urut: urut + index,
			};
		});
	}, [data]);
	return (
		<TableBody>
			{rows.map((row) => (
				<TableRow key={row.id}>
					<TableCell className={"border"} width={40} align={"right"}>
						{row.urut}
					</TableCell>
					<TableCell className={"border"} width={40} align={"center"}>
						<ProfilUpdateTableAction
							data={row}
							pegawaiId={pegawaiId}
						/>
					</TableCell>
					<TableCell className={"border"}>{row.nipam}</TableCell>
					<TableCell className={"border"}>{row.nama}</TableCell>
					<TableCell className={"border"}>{row.jabatan}</TableCell>
					<TableCell className={"border"}>{row.actionType}</TableCell>
					<TableCell className={"border"}>{row.dataDescription}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfilUpdateTableBody;
