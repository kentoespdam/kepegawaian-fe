import type { SystemRole } from "@_types/system/system_role";
import type { Prefs } from "@_types/user";
import TooltipBuilder from "@components/builder/tooltip";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import type { QueryKey } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import SystemUserRoleAddForm from "./form.role.add";

const SystemUserRolesTableCell = ({
	userId,
	prefs,
	qKey,
	roleList,
}: {
	userId: string;
	prefs: Prefs;
	qKey: QueryKey;
	roleList: SystemRole[];
}) => {
	const { roles } = prefs;
	const [open, setOpen] = useState(false);

	return open ? (
		<SystemUserRoleAddForm
			userId={userId}
			qKey={qKey}
			setOpen={setOpen}
			currentRoles={roles}
			roleList={roleList}
		/>
	) : (
		<div className="flex gap-1 justify-center">
			{roles.map((item) => (
				<Badge
					variant="outline"
					key={item}
					className="px-1 flex gap-1.5 border-info"
				>
					{item}
				</Badge>
			))}
			<TooltipBuilder text="Add/Remove Roles">
				<Button
					variant="outline"
					size="icon"
					className="ml-2 size-5 text-primary border-primary"
					onClick={() => setOpen(true)}
				>
					<PlusIcon className="size-4" />
				</Button>
			</TooltipBuilder>
		</div>
	);
};

export default SystemUserRolesTableCell;
