"use client"
import { logout } from "@app/auth/action";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logout();
    };
    return (
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Logout</span>
        </DropdownMenuItem>
    );
};

export default LogoutButton;
