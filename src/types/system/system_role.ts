import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface SystemRole {
	id: string;
}

export const SystemRoleSchema = z
	.object({
		id: z.string().min(3, "Role wajib diisi"),
	})
	.refine((data) => {
		data.id = data.id.toUpperCase();
		return true;
	});

export type SystemRoleSchema = z.infer<typeof SystemRoleSchema>;

export const systemRoleTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "id", label: "Nama Role", search: true, searchType: "text" },
];
