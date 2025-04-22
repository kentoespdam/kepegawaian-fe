import type { Prefs } from "@_types/user";
import type { CustomColumnDef } from "..";
import { z } from "zod";

export interface User {
	id: number;
	nipam: string;
	nama: string;
	prefs: Prefs;
	isActive: boolean;
}

export const ChangePasswordSchema = z
	.object({
		id: z.string().min(1, "id is required"),
		newPassword: z.string().min(8, "Password minimal 8 karakter"),
		confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
	})
	.superRefine(({ confirmPassword, newPassword }, ctx) => {
		if (confirmPassword !== newPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Password tidak sama",
				path: ["confirmPassword"],
			});
		}
	});

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

export const userTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "prefs", label: "Roles" },
	{ id: "isActive", label: "Status" },
];
