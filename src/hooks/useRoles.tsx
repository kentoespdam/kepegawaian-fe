"use client";

// ponytail: re-export kompat — useRoles/RolesProvider kini tinggal di useAuth.tsx.
// File ini tetap agar call site lama (badge-manager, pendukung/*, riwayat/cuti) tak perlu diubah.
export { AuthProvider as RolesProvider, useRoles } from "./useAuth";
