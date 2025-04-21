import type { Pageable } from "@_types/index";
import type { SystemRole } from "@_types/system/system_role";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";

interface RoleTableBodyProps {
	data: Pageable<SystemRole>;
}
const RoleTableBody = ({ data }: RoleTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">{row.id}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default RoleTableBody;
