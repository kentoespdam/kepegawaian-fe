"use client";
import type { Pegawai } from "@_types/pegawai";
import type { User } from "@_types/user";
import { useSessionStore } from "@store/session";
import { useEffect } from "react";

interface EmployeeStateComponentProps {
    userAccount: User;
    employee?: Pegawai | null;
}

const EmployeeStateComponent: React.FC<EmployeeStateComponentProps> = ({
    userAccount,
}) => {
    const setUser = useSessionStore((state) => state.setUser);

    useEffect(() => {
        setUser(userAccount);
    }, [userAccount, setUser]);

    return null;
};

export default EmployeeStateComponent;
