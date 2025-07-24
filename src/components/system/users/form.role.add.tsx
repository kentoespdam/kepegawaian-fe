import type { SystemRole } from "@_types/system/system_role";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { MultiSelect } from "@components/ui/multi-select";
import { useGlobalMutation } from "@store/query-store";
import type { QueryKey } from "@tanstack/react-query";
import { CheckIcon, XIcon } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { updateRoles } from "./action";

type SystemUserRoleAddFormProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	qKey: QueryKey;
	userId: string;
	currentRoles: string[];
	roleList: SystemRole[];
};
const SystemUserRoleAddForm = ({
	setOpen,
	qKey,
	userId,
	currentRoles,
	roleList,
}: SystemUserRoleAddFormProps) => {
	const [defaultValue, setDefaultValue] = useState<string[]>(currentRoles);
	const options = roleList.map((role) => ({
		value: role.id,
		label: role.id,
		disabled: role.id === "USER",
	}));

	const mutation = useGlobalMutation({
		mutationFunction: updateRoles,
		queryKeys: [qKey],
		actHandler: () => setOpen(false),
	});
	const saveHandler = () => {
		mutation.mutate({ id: userId, data: defaultValue });
	};
	return (
		<div className="flex gap-2 w-full items-center">
			<MultiSelect
				options={options}
				defaultValue={defaultValue}
				onValueChange={setDefaultValue}
				placeholder="Select Roles"
				// animation={2}
				maxCount={1}
			/>
			<TooltipBuilder
				text="Save"
				className="bg-primary text-primary-foreground"
			>
				<Button
					variant="outline"
					size="icon"
					className="text-primary border-primary size-5"
					onClick={saveHandler}
				>
					<CheckIcon className="size-4" />
				</Button>
			</TooltipBuilder>
			<TooltipBuilder
				text="Cancel"
				className="bg-destructive text-destructive-foreground"
			>
				<Button
					variant="outline"
					size="icon"
					className="text-destructive border-destructive size-5"
					onClick={() => setOpen(false)}
				>
					<XIcon className="size-4" />
				</Button>
			</TooltipBuilder>
		</div>
	);
};

export default SystemUserRoleAddForm;
