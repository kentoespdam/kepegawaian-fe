import type { Pageable } from "@_types/index";
import type { User } from "@_types/system/user";
import { Badge } from "@components/ui/badge";
import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { getUrut } from "@helpers/number";
import type { QueryKey } from "@tanstack/react-query";
import UserTableAction from "./table.action";
import SystemUserRolesTableCell from "./table.roles.cell";
import type { SystemRole } from "@_types/system/system_role";

const IsActiveCell = ({ isActive }: { isActive: boolean }) => {
	return (
		<TableCell
			className="border-x whitespace-nowrap"
			align="center"
			width={120}
		>
			{isActive ? (
				<Badge variant="default">Aktif</Badge>
			) : (
				<Badge variant="destructive">Tidak Aktif</Badge>
			)}
		</TableCell>
	);
};

interface UserTableBodyProps {
	qKey: QueryKey;
	data: Pageable<User>;
	roleList: SystemRole[];
}
const UserTableBody = ({ qKey, data, roleList }: UserTableBodyProps) => {
	let urut = getUrut(data);
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell
						className="border-x whitespace-nowrap"
						align="center"
						width={80}
					>
						<UserTableAction row={row} />
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nipam}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap">
						{row.nama}
					</TableCell>
					<TableCell className="border-x whitespace-nowrap" width={450}>
						<SystemUserRolesTableCell
							userId={String(row.id)}
							prefs={row.prefs}
							qKey={qKey}
							roleList={roleList}
						/>
					</TableCell>
					<IsActiveCell isActive={row.isActive} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default UserTableBody;
