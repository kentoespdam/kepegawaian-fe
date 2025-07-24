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
	id: z.number(),
	csrfToken: z.string(),
	cutiId: z.number().min(1, "Cuti tidak boleh Kosong!"),
	nipam: z.string(),
	nama: z.string(),
	pangkatGolongan: z.string(),
	organisasi: z.string(),
	jabatan: z.string(),
	jenisCutiNama: z.string(),
	subJenisCutiNama: z.string(),
	tanggalMulai: z.string().min(10, "Tanggal Awal tidak boleh Kosong!"),
	tanggalSelesai: z.string().min(10, "Tanggal Akhir tidak boleh Kosong!"),
	jumlahHariKerja: z.number().min(1, "Jumlah Hari Kerja tidak boleh Kosong!"),
	alasan: z.string().min(3, "Alasan tidak boleh Kosong!"),
	approverId: z.number().min(1, "Approver tidak boleh Kosong!"),
	approvalLevel: z.number().min(1, "Approval Level tidak boleh Kosong!"),
	approvalStatus: z.string().min(1, "Approval Status tidak boleh Kosong!"),
	notes: z.string().min(2, "Notes tidak boleh Kosong!"),
});

export type CutiApprovalSchema = z.infer<typeof CutiApprovalSchema>;

export const cutiApprovalColumns: CustomColumnDef[] = [
	{ id: "id", label: "No" },
	{ id: "createdAt", label: "Tanggal" },
	{ id: "approver.nipam", label: "NIK" },
	{ id: "approver.nama", label: "Nama" },
	{ id: "jabatan.nama", label: "Jabatan" },
	{ id: "approvalStatus", label: "Status" },
	{ id: "notes", label: "Notes" },
];
