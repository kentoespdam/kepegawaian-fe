import type { User } from "@_types/system/user";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { cn } from "@lib/utils";
import { useUserStore } from "@store/system/users.store";
import { EditIcon, EllipsisIcon, LockIcon, LockOpenIcon } from "lucide-react";

interface UserTableActionProps {
	row: User;
}

const UserTableAction = ({ row }: UserTableActionProps) => {
	const { setUserId, setOpenChangePassword } = useUserStore((state) => ({
		setUserId: state.setUserId,
		setOpenChangePassword: state.setOpenChangePassword,
	}));

	const changePasswordHandler = () => {
		setUserId(row.id.toString());
		setOpenChangePassword(true);
	};


	const editHandler = () => {
		if (row.isActive) {
			const tanya = confirm("Yakin akan non-aktifkan user ini?");
			if (tanya) alert(`/system/users/non-aktifkan/${row.id}`);
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default" size="icon" className="h-6 w-6">
					<EllipsisIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-primary"
						onClick={changePasswordHandler}
					>
						<EditIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Change Password</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className={cn("flex flex-row items-center cursor-pointer", {
							"text-destructive": row.isActive,
							"text-primary": !row.isActive,
						})}
						onClick={editHandler}
					>
						{row.isActive ? (
							<>
								<LockIcon className="mr-2 h-[1rem] w-[1rem]" />
								<span>Disable User</span>
							</>
						) : (
							<>
								<LockOpenIcon className="mr-2 h-[1rem] w-[1rem]" />
								<span>Enable User</span>
							</>
						)}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserTableAction;
