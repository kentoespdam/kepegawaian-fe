"use client";
import type { Pegawai } from "@_types/pegawai";
import type { User } from "@_types/user";
import { useSessionStore } from "@store/session";
import { useEffect } from "react";

interface EmployeeStateComponentProps {
	userAccount: User;
	pegawai?: Pegawai;
}

const EmployeeStateComponent: React.FC<EmployeeStateComponentProps> = ({
	userAccount,
	pegawai,
}) => {
	const { setUser, setPegawai } = useSessionStore((state) => ({
		setUser: state.setUser,
		setPegawai: state.setPegawai,
	}));

	useEffect(() => {
		setUser(userAccount);
		setPegawai(pegawai);
	}, [userAccount, setUser, setPegawai, pegawai]);

	return null;
};

export default EmployeeStateComponent;
