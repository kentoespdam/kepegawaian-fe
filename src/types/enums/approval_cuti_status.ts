import { z } from "zod";

export const APPROVAL_CUTI_STATUS = [
	"PENDING",
	"APPROVED",
	"CONFIRMED",
	"REJECTED",
	"CANCELED",
	"RETURNED",
] as const;

export const ApprovalCutiStatus = z.enum(APPROVAL_CUTI_STATUS);
export type ApprovalCutiStatus = z.infer<typeof ApprovalCutiStatus>;

export const getApprovalCutiStatusLabel = (
	approvalCutiStatus: string,
): string => {
	switch (approvalCutiStatus) {
		case "PENDING":
			return "Menunggu Persetujuan";
		case "APPROVED":
			return "Disetujui";
		case "CONFIRMED":
			return "Dikonfirmasi";
		case "REJECTED":
			return "Ditolak";
		case "CANCELED":
			return "Dibatalkan";
		case "RETURNED":
			return "Dikembalikan";
		default:
			return "Status Cuti Tidak Dikenal";
	}
};
