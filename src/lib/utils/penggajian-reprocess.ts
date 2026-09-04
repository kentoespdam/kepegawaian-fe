import type { StatusBatch } from "@/types/penggajian/batch";

/**
 * Menghitung parameter `phase` untuk endpoint reprocess:
 * "phase = status sekarang - 1. kecuali jika saat status sekarang = WAIT_VERIFICATION_PHASE_1 maka phase = PENDING"
 */
export function getReprocessPhase(currentStatus: StatusBatch | undefined): StatusBatch {
	switch (currentStatus) {
		case "WAIT_APPROVAL":
			return "WAIT_VERIFICATION_PHASE_2";
		case "WAIT_VERIFICATION_PHASE_2":
			return "WAIT_VERIFICATION_PHASE_1";
		case "WAIT_VERIFICATION_PHASE_1":
		case "PROSES":
		case "PENDING":
		case "FAILED":
		default:
			return "PENDING";
	}
}
