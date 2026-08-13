"use client";

import { createContext, useContext } from "react";

interface AuthState {
	roles: string[];
	permissions: string[];
}

const AuthContext = createContext<AuthState>({ roles: [], permissions: [] });

export function AuthProvider({ roles, permissions, children }: AuthState & { children: React.ReactNode }) {
	return <AuthContext.Provider value={{ roles, permissions }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
	return useContext(AuthContext);
}

// ponytail: shim — call site lama (sanksi-manager) tetap jalan tanpa perubahan
export function useRoles(): string[] {
	return useContext(AuthContext).roles;
}
