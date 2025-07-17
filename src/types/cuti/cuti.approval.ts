import type { JabatanMini } from "@_types/master/jabatan";
import type { PegawaiMini } from "@_types/pegawai";
import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface CutiApprovalMini {
	id: number;
	approver: PegawaiMini;
	jabatan: JabatanMini;
	approvalLevel: number;
	approvalStatus: string;
	notes: string;
	createdAt: string;
}

export const CutiApprovalSchema = z.object({
	csrfToken: z.string(),
	cutiId: z.number().min(1, "Cuti tidak boleh Kosong!"),
	approverId: z.number().min(1, "Approver tidak boleh Kosong!"),
	approvalLevel: z.number().min(1, "Approval Level tidak boleh Kosong!"),
	approvalStatus: z.string().min(1, "Approval Status tidak boleh Kosong!"),
	notes: z.string().min(3, "Notes tidak boleh Kosong!"),
});

export type CutiApprovalSchema = z.infer<typeof CutiApprovalSchema>;

export const cutiApprovalColumns: CustomColumnDef[] = [
	{id:"id", label:"No"},
	{id:"createdAt", label:"Tanggal"},
	{id:"approver.nipam", label:"NIK"},
	{id:"approver.nama", label:"Nama"},
	{id:"jabatan.nama", label:"Jabatan"},
	{id:"approvalStatus", label:"Status"},
	{id:"notes", label:"Notes"},
]